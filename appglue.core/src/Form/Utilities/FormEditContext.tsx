import {XFormConfiguration} from "../XFormConfiguration";
import {FormMode, IDesignPanelConfig} from "../FormDesignConstants";
import {
    IDesignValidationProvider,
    IRuntimeValidationProvider,
    ValidationIssue,
    ValidationLevel
} from "../../Common/IDesignValidationProvider";
import {XFormDesigner} from "../XFormDesigner";
import {AutoBind} from "../../Common/AutoBind";
import {UserFormData} from "../UserFormData";
import {ISampleDataProvider} from "../../Common/ISampleDataProvider";
import {IAction} from "../../CommonUI/IAction";
import {XBaseControl} from "../Controls/XBaseControl";

export class FormRuntimeContext {
    form: XFormConfiguration;
    runtimeValidationProvider?: IRuntimeValidationProvider;
    data: UserFormData = new UserFormData();
    runtimeIssues: FormContextStore = new FormContextStore();

    public onFormDataChange?: (data: UserFormData) => void;
    public onFormButtonClick? : (buttonName: string, data: UserFormData) => void ;
    public onFormCancelButton? : () => void ;


    formTitle? : string;
    public onFormClose? : (data: UserFormData) => void ;


    constructor(form: XFormConfiguration) {
        this.form = form;
    }

    refreshUserForm() : void {
        // todo: refresh user form
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

        this.runtimeIssues.updateValidationIssues(breaks, this.form.getAllControls());

        return breaks;
    }


    getRuntimeControlContext(control: XBaseControl):  ControlRenderContext {
        return this.runtimeIssues.getControlRenderContext(control);
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
}

export class FormEditContext extends FormRuntimeContext {
    designer? : XFormDesigner;

    designIssues: FormContextStore = new FormContextStore();


    formName?: string;

    showControlBorders : boolean = true;
    expandedConfigPanel: boolean = true;
    isMovingConfigPanel: boolean = false;

    // this should ONLY be in designer.  Not here.
    mode: FormMode | string = FormMode.FormDesign;

    designValidationProvider?: IDesignValidationProvider;
    onFormClose?: () => void;
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

        this.designIssues.updateValidationIssues(breaks, this.form.getAllControls());
        
        return breaks;
    }

    // todo: change this.  its not optimized.
    getDesignControlContext(control: XBaseControl):  ControlRenderContext {
        return this.designIssues.getControlRenderContext(control);
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
    }

    selectedId : string | null = null;

    @AutoBind
    unSelectControl() {
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
    controlRenderContexts : {[controlId: string] : ControlRenderContext }  = {}
    otherIssues : ValidationIssue[] = [];

    getAllIssues(): ValidationIssue[] {
        // add up all issues from all controls
        let issues : ValidationIssue[] = [];
        issues.push(...this.otherIssues);

        for (let issueList of Object.values(this.controlRenderContexts)) {
            issues.push(...issueList.issues)
        }

        return issues;
    };

    getControlRenderContext(control: XBaseControl) : ControlRenderContext {
        let retVal = this.controlRenderContexts[control.id];

        if (!retVal) {
            retVal = new ControlRenderContext(control);
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
                retVal = new ControlRenderContext(control);
                this.controlRenderContexts[controlId] = retVal;
            } else {
                throw 'could not find control';
            }
        }

        return retVal;
    }


    updateValidationIssues(validations: ValidationIssue[], controls: XBaseControl[]) : void {
        // clear other issues
        this.otherIssues.length = 0;

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
            this.otherIssues.push(issue);
        }

        // map to and ensure not over updating

        for (let control of controls) {
            let issueStore = this.getControlRenderContext(control);

            let issues = controlIssues[issueStore.control.id];

            if (!issues && issueStore.issues.length !== 0) {
                // clear the array
                issueStore.issues.length = 0;
            }

            if (issues) {
                // todo: we might want to update
                issueStore.issues = issues;
            }
        }

    }

}

// todo: assume this is a sub store
export class ControlRenderContext {
    issues : ValidationIssue[] = [];
    control: XBaseControl;

    constructor(control: XBaseControl) {
        this.control = control;
    }

    getIssueText() : string | null {

        let issueText: string | null = null;

        if (this.issues && this.issues.length !== 0) {
            if (this.issues.length === 1) {
                issueText = this.issues[0].issue;
            } else {
                issueText = 'Issues (' + this.issues.length + ')';
            }
        }

        return issueText;
    }

    getIssueData() : IssueData | null{
        if (this.issues.length === 0)
            return null;

        let highestLevel = ValidationLevel.WARNING;

        for (let issue of this.issues) {
            if (issue.level === ValidationLevel.ERROR) {
                highestLevel = ValidationLevel.ERROR;
                break;
            }
        }

        return {text : this.getIssueText(), highestLevel: highestLevel, issues: this.issues};
    }
}

export class IssueData {
    text: string | null = null;
    highestLevel: ValidationLevel = ValidationLevel.ERROR;
    issues?: ValidationIssue[];
}

