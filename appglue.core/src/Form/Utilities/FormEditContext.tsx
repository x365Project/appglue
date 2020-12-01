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
import { XBaseControl } from "../Controls/XBaseControl";

export class FormRuntimeContext {
    form: XFormConfiguration;
    runtimeValidationProvider?: IRuntimeValidationProvider;
    data: UserFormData = new UserFormData();

    public onFormDataChange?: (data: UserFormData) => void;
    public onFormButtonClick? : (buttonName: string, data: UserFormData) => void ;
    public onFormCancelButton? : () => void ;
    public onFormClose? : (data: UserFormData) => void ;


    constructor(form: XFormConfiguration) {
        this.form = form;
    }

    refreshUserForm() : void {
        // todo: refresh user form
    }

    getRuntimeValidationIssues(): ValidationIssue[] {
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

        return breaks;
    }

    getRuntimeValidationIssuesForControls() : ControlValidationMapping {
        let validations = new ControlValidationMapping();

        validations.allIssues = this.getRuntimeValidationIssues();

        let controls = this.form.getAllControls();

        for (let issue of validations.allIssues) {
            if (issue.elementId) {
                if (!validations[issue.elementId])
                    validations[issue.elementId] = [];

                validations[issue.elementId].push(issue);

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
                    if (!validations[controlId])
                        validations[controlId] = [];

                    validations[controlId].push(issue);
                }
            }
        }

        return validations;
    }

    // todo: change this.  its not optimized.
    getRuntimeValidationIssuesForControl(control: XBaseControl):  ValidationIssue[] {
        let allIssues = this.getRuntimeValidationIssues().filter((issue: ValidationIssue) => {
            if (issue.elementId === control.id)
                return true;

            let valueName = Reflect.get(control, 'valueName');

            if (valueName && issue.dataName === valueName)
                return true;

            return false;
        });

        return allIssues;
    }

    setFormDataValue(fieldName: string, value: any): void {
        if (!this.data)
            return;

        this.data[fieldName] = value;

        this.refreshUserForm();

        if (this.onFormDataChange) {
            this.onFormDataChange(this.data);
        }
    }

    getFormDataValue(fieldName: string): any {
        if (!this.data)
            return;

        return this.data[fieldName];
    }

    setFormData(data: UserFormData): void {
        this.data = data;
    }

    getFormData(): UserFormData | undefined | null {
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

    getDesignValidationIssues(): ValidationIssue[] {
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

        
        return breaks;
    }

    getDesignValidationIssuesForControls() : ControlValidationMapping {
        let validations = new ControlValidationMapping();

        validations.allIssues = this.getDesignValidationIssues();
        
        let controls = this.form.getAllControls();

        for (let issue of validations.allIssues) {
            if (issue.elementId) {
                if (!validations[issue.elementId])
                    validations[issue.elementId] = [];
                
                validations[issue.elementId].push(issue);
                
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
                    if (!validations[controlId])
                        validations[controlId] = [];
                
                    validations[controlId].push(issue);
                }
            }
        }

        return validations;
    }

    // todo: change this.  its not optimized.
    getDesignValidationIssuesForControl(control: XBaseControl):  ValidationIssue[] {
        let allIssues = this.getDesignValidationIssues().filter((issue: ValidationIssue) => {
            if (issue.elementId === control.id)
                return true;

            let valueName = Reflect.get(control, 'valueName');

            if (valueName && issue.dataName === valueName)
                return true;

            return false;
        });

        return allIssues;
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

export class ControlValidationMapping {
    [controlid:string] : ValidationIssue[]

    allIssues: ValidationIssue[] = [];
}