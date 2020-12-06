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
import {CONFIG_FORM_KEY} from "./XFormAndLayoutDesignPanel";
import {ControlRenderContext} from "./ControlRenderContext";

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
        this.controlContexts = new FormContextStore()
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

    designValidationProvider?: IDesignValidationProvider;
    onFormSave?: (data: any) => void;
    sampleDataProvider? : ISampleDataProvider ;
    designConfig?: IDesignPanelConfig;
    onCopy?: () => void;
    onCut?: () => void;
    onDelete?: () => void;
    onPaste?: () => void;

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
        if (this.selectedId) {
            this.expandedConfigPanel = true;
        }

        this.designer?.forceUpdate();

        if (this.onDesignerUpdate) {
            this.onDesignerUpdate();
        }

        this.computeDesignValidationIssues();
    }

    getEditUI(): JSX.Element | undefined | null {
        if (!this.selectedId)
            return;

        if (this.selectedId === CONFIG_FORM_KEY) {
            return this.form.renderEditUI();
        }

        let control = this.form.find(this.selectedId);

        if (control)
            return control.renderEditUI();


    }

    selectedId : string | null = null;

    getSelectedId() : string | null {
        return this.selectedId;
    }

    @AutoBind
    selectControl(selectedId: string) {
        this.selectedId = selectedId;

        if (selectedId !== CONFIG_FORM_KEY && this.form.find(selectedId)) {
            let cc = this.controlContexts.getControlRenderContextById(selectedId, this.form.getAllControls());
            cc.setSelected(true);
        }

        this.refreshDesigner();
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
        this.refreshDesigner();
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
    editContext? : FormContext;
    controlRenderContexts : {[controlId: string] : ControlRenderContext }  = {}
    otherRuntimeIssues : ValidationIssue[] = [];
    otherDesignIssues : ValidationIssue[] = [];

    constructor(editContext?: FormContext) {
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

