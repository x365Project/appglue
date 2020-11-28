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
        // check required
        // call rules
        // call plugged in providers

        // call validation provider if it exists for additional validation
        let valBreaks = this.runtimeValidationProvider?.getRuntimeValidationIssues();
        if (valBreaks){
            breaks.push(...valBreaks);
        }

        return [];
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
            // call validation provider if it exists for additional validation
            let valBreaks = this.designValidationProvider?.getDesignValidationIssues(c);
            if (valBreaks){
                breaks.push(...valBreaks);
            }
        }


        return breaks;
    }

    getDesignValidationIssuesForControl(control: XBaseControl):  ValidationIssue[] {
        let results = control.getDesignValidationIssues();
        let breaks : ValidationIssue[] = [];

        if (results) {
            breaks.push(...results);
        }

        let valBreaks = this.designValidationProvider?.getDesignValidationIssues(control);
        if (valBreaks){
            breaks.push(...valBreaks);
        }

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