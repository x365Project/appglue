import {XFormConfiguration} from "../XFormConfiguration";
import {FormMode, IDesignPanelConfig} from "../FormDesignConstants";
import {
    IDesignValidationProvider,
    IRuntimeValidationProvider,
    ValidationIssue
} from "../../Common/IDesignValidationProvider";
import {XFormDesigner} from "../XFormDesigner";
import {AutoBind} from "../../Common/AutoBind";
import {UserFormData} from "../UserFormData";
import {ISampleDataProvider} from "../../Common/ISampleDataProvider";
import {IAction} from "../../CommonUI/IAction";
import {XBaseControl} from "../Controls/XBaseControl";
import { DataUtilities } from "../../Common/DataUtilities";
import { IContextForControl } from "../../Common/IContextForControl";
import { UIControlRegistration } from "./RegisterUIControl";
import {CONFIG_FORM_KEY} from "./XFormAndLayoutDesignPanel";
import {ControlRenderContext} from "./ControlRenderContext";
import {action, StateManager} from "../../CommonUI/StateManagement/StateManager";
import {ElementFactory} from "../../CommonUI/ElementFactory";
 
export class FormContext {
    form: XFormConfiguration;
    runtimeValidationProvider?: IRuntimeValidationProvider;
    data: UserFormData = new UserFormData();
    controlContexts: FormContextStore ;

    public onFormDataChange?: (data: UserFormData) => void;
    public onFormButtonClick? : (buttonName: string, data: UserFormData) => void ;
    public onFormCancelButton? : () => void ;


    formTitle? : string;
    public onFormClose? : (data: UserFormData) => void ;


    constructor(form: XFormConfiguration) {
        this.form = form;
        this.controlContexts = new FormContextStore(this);
        this.computeDesignValidationIssues();
    }

    computeRuntimeValidations(): ValidationIssue[] {

        let breaks : ValidationIssue[];
        breaks = [];

        for (let c of this.form.getAllControls()) {
            let results = c.getRuntimeValidationIssues();
            if (results) {
                breaks.push(...results);
            }
        }

        // call validation provider if it exists for additional validation
        let valBreaks = this.runtimeValidationProvider?.getRuntimeValidationIssues();
        if (valBreaks){
            breaks.push(...valBreaks);
        }

        // todo: call built in rules

        this.controlContexts.updateValidationIssues(breaks, this.form.getAllControls(), true);

        return breaks;
    }


    getControlContext(control: XBaseControl):  ControlRenderContext {
        return this.controlContexts.getControlRenderContext(control);
    }

    setFormDataValue(fieldName: string, value: any): void {
        if (!this.data)
            this.data = new UserFormData();

        this.data[fieldName] = value;

        this.refreshUserForm();

        if (this.onFormDataChange) {
            this.onFormDataChange(this.data);
        }

        this.computeRuntimeValidations();
    }

    getFormDataValue(fieldName: string): any {
        if (!this.data)
            return;

        return this.data[fieldName];
    }

    setFormData(data: UserFormData): void {
        this.data = data;
        this.computeRuntimeValidations();
    }

    getFormData(): UserFormData {
        return this.data;
    }

    @AutoBind
    outcomeTriggered(name: string) {
        if (this.onFormButtonClick)
            this.onFormButtonClick(name, this.data);
    }

    @AutoBind
    cancelOutcomeTriggered(name: string) {
        if (this.onFormCancelButton)
            this.onFormCancelButton();
    }

    // ------------------------------------------------
    // -- Designer Context ----------------------------
    // ------------------------------------------------


    designer? : XFormDesigner;

    formName?: string;

    showControlBorders : boolean = true;
    expandedConfigPanel: boolean = true;
    isMovingConfigPanel: boolean = false;

    // this should ONLY be in designer.  Not here.
    private _mode: FormMode | string = FormMode.FormDesign;

    selectedId : string | null = null;
    contextControl: IContextForControl | null = null;
    lastSelectedId: string | null = null;

    designValidationProvider?: IDesignValidationProvider;
    onFormSave?: (data: any) => void;
    sampleDataProvider? : ISampleDataProvider ;
    designConfig?: IDesignPanelConfig;

    clipboardControl: XBaseControl | null = null;
    deleteControl: XBaseControl | null = null;

    @AutoBind
    cloneControl(control: XBaseControl) : XBaseControl {
        let type = Reflect.get(control, '__type');
        let registeredControl = UIControlRegistration[type];
        let val = new registeredControl.prototype.constructor();

        return Object.assign(val, control);
    }

    @AutoBind
    onCopy(id?: string)  {
        let controlId = id ? id : this.lastSelectedId;
        if (!controlId) return;

        let control = this.form.find(controlId);
        if (!control) return;

        this.clipboardControl = this.cloneControl(control);

        if (id) this.unselectContextControl();

        StateManager.changed(this);
    }

    @AutoBind
    onCut(id?: string) {
        let controlId = id ? id : this.lastSelectedId;
        if (!controlId) return;

        let control = this.form.find(controlId);
        if (!control) return;

        this.clipboardControl = this.cloneControl(control);

        this.unSelectControl();
        this.form.remove(control);
        if (id) this.unselectContextControl();

        StateManager.changed(this);
    }

    @AutoBind
    onDelete(id?: string) {
        let controlId = id ? id : this.lastSelectedId;
        if (!controlId) return;

        let control = this.form.find(controlId);

        if (!control) return;
        this.deleteControl = control;
        if (id) this.unselectContextControl();
        StateManager.changed(this);
    };

    @AutoBind
    onPaste(id?: string) {
        let controlId = (id || this.lastSelectedId);
        if (this.clipboardControl && controlId) {
            this.clipboardControl.id = DataUtilities.generateUniqueId();
            let control = this.form.find(controlId);
            this.form.getContainers().forEach((c) => {
                let index = c.getControls().indexOf(control!);
                if (index >= 0) {
                    c.add(this.cloneControl(this.clipboardControl!), index + 1);
                }
            });
            if (id) this.unselectContextControl();

            StateManager.changed(this);
        }
    }

    // called when we force a designer update
    onDesignerUpdate?: () => void;

    topDesignerExtensions?: IAction[];
    bottomDesignerExtensions?: IAction[];

    private eventLog: ({} | string)[] = [];

    get mode(): FormMode | string {
        return this._mode;
    }

    set mode(value: FormMode | string) {
        this._mode = value;
        
        if (value === FormMode.Runtime)
            this.computeRuntimeValidations();
    }

    addToEventLog(event : {} | string) {
        this.eventLog.push(event);
        // make sure does not grow too big
        if (this.eventLog.length > 100)
            this.eventLog.shift();
    }

    getEventLog() : ({} | string)[] {
        return this.eventLog;
    }

    computeDesignValidationIssues(): ValidationIssue[] {
        let breaks : ValidationIssue[];
        breaks = [];
        // value name is filled in (call data class)
        // value name cannot have special characters or space
        // buttons have names (call button class)

        for (let c of this.form.getAllControls()) {
            let results = c.getDesignValidationIssues();
            if (results) {
                breaks.push(...results);
            }
        }

        // call validation provider if it exists for additional validation
        let valBreaks = this.designValidationProvider?.getDesignValidationIssues();
        if (valBreaks){
            breaks.push(...valBreaks);
        }

        this.controlContexts.updateValidationIssues(breaks, this.form.getAllControls(), false);
        return breaks;
    }

    @AutoBind
    refreshDesigner() : void {

        this.designer?.forceUpdate();

        if (this.onDesignerUpdate) {
            this.onDesignerUpdate();
        }

        this.computeDesignValidationIssues();
    }

    getEditUI(): ElementFactory<any> | undefined {
        if (!this.selectedId)
            return;

        if (this.selectedId === CONFIG_FORM_KEY) {
            return this.form.getEditor();
        }

        let control = this.form.find(this.selectedId);

        if (control)
            return control.getEditor();


    }

    getSelectedId() : string | null {
        return this.selectedId;
    }

    getLastSelectedId(): string | null {
        return this.lastSelectedId;
    }

    @AutoBind
    selectControl(selectedId: string) {
        this.unSelectControl();

        this.selectedId = selectedId;
        this.lastSelectedId = selectedId;

        if (selectedId !== CONFIG_FORM_KEY && this.form.find(selectedId)) {
            let cc = this.controlContexts.getControlRenderContextById(selectedId, this.form.getAllControls());
            cc.setSelected(true);
        }

        this.expandedConfigPanel = true;

        StateManager.changed(this);
    }

    @AutoBind
    unSelectControl() {
        if (this.selectedId) {
            if (this.selectedId !== CONFIG_FORM_KEY && this.form.find(this.selectedId)) {
                let cc = this.controlContexts.getControlRenderContextById(this.selectedId, this.form.getAllControls());
                cc.setSelected(false);
            }
        }

        this.selectedId = null;

        StateManager.changed(this);
    }

    @AutoBind
    selectContextControl(control: IContextForControl) {
        this.contextControl = control;
        StateManager.changed(this);
    }

    @AutoBind
    unselectContextControl () {
        this.contextControl = null;
        StateManager.changed(this);
    }

    @AutoBind
    refreshUserForm() : void {
        this.refreshDesigner();
        // todo: refresh user form
    }

}

// todo: make this a store
// todo: add other stuff here like data? hidden? disabled?
export class FormContextStore {
    editContext : FormContext;
    controlRenderContexts : {[controlId: string] : ControlRenderContext }  = {}
    otherRuntimeIssues : ValidationIssue[] = [];
    otherDesignIssues : ValidationIssue[] = [];

    constructor(editContext: FormContext) {
        this.editContext = editContext;
    }

    getAllRuntimeIssues(): ValidationIssue[] {
        // add up all issues from all controls
        let issues : ValidationIssue[] = [];
        issues.push(...this.otherRuntimeIssues);

        for (let issueList of Object.values(this.controlRenderContexts)) {
            issues.push(...issueList.runtimeIssues)
        }

        return issues;
    };

    getAllDesignIssues(): ValidationIssue[] {
        // add up all issues from all controls
        let issues : ValidationIssue[] = [];
        issues.push(...this.otherDesignIssues);

        for (let issueList of Object.values(this.controlRenderContexts)) {
            issues.push(...issueList.designIssues)
        }

        return issues;
    };

    getControlRenderContext(control: XBaseControl) : ControlRenderContext {
        let retVal = this.controlRenderContexts[control.id];

        if (!retVal) {
            retVal = new ControlRenderContext(control, this.editContext);
            this.controlRenderContexts[control.id] = retVal;
        }

        return retVal;
    }

    getControlRenderContextById(controlId: string, controls: XBaseControl[]) : ControlRenderContext {
        let retVal = this.controlRenderContexts[controlId];

        if (!retVal) {
            // find control based on id
            let control : XBaseControl | undefined;

            for (let c of controls) {
                if (c.id === controlId) {
                    control = c;
                    break;
                }
            }


            if (control) {
                retVal = new ControlRenderContext(control, this.editContext);
                this.controlRenderContexts[controlId] = retVal;
            } else {
                throw 'could not find control';
            }
        }

        return retVal;
    }


    updateValidationIssues(validations: ValidationIssue[], controls: XBaseControl[], isRuntimeIssues: boolean) : void {
        // clear other issues
        if (isRuntimeIssues) {
            this.otherRuntimeIssues.length = 0;
        } else {
            this.otherDesignIssues.length = 0;
        }

        let controlIssues : {[controlId: string] : ValidationIssue[]} = {}

        for (let issue of validations) {
            if (issue.elementId) {

                let issues : ValidationIssue[] = controlIssues[issue.elementId];

                if (!issues) {
                    issues = [];
                    controlIssues[issue.elementId] = issues;
                }

                issues.push(issue);

                continue;
            }

            // do data name checking
            if (issue.dataName) {
                let controlId : string | null = null;

                for (let control of controls) {
                    let dataName = Reflect.get(control, 'valueName');

                    if (dataName && dataName === issue.dataName) {
                        controlId = control.id;
                        break;
                    }
                }

                if (controlId) {
                    let issues : ValidationIssue[] = controlIssues[controlId];

                    if (!issues) {
                        issues = [];
                        controlIssues[controlId] = issues;
                    }

                    issues.push(issue);

                    continue;
                }
            }

            // not for a control
            if (isRuntimeIssues) {
                this.otherRuntimeIssues.push(issue);
            } else {
                this.otherDesignIssues.push(issue);
            }
        }

        // map to and ensure not over updating

        for (let control of controls) {
            let controlRenderContext = this.getControlRenderContext(control);

            let issues = controlIssues[controlRenderContext.control.id];

            if (isRuntimeIssues) {
                if (!issues && controlRenderContext.runtimeIssues.length !== 0) {
                    // clear the array
                    controlRenderContext.runtimeIssues.length = 0;
                }

                if (issues) {
                    // todo: we might want to update
                    controlRenderContext.runtimeIssues = issues;
                }
            } else {
                if (!issues && controlRenderContext.designIssues.length !== 0) {
                    // clear the array
                    controlRenderContext.designIssues.length = 0;
                }

                if (issues) {
                    // todo: we might want to update
                    controlRenderContext.designIssues = issues;
                }
            }
        }

    }

}

