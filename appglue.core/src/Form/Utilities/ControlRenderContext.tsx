// todo: assume this is a sub store
import {ValidationIssue, ValidationLevel} from "../../Common/IDesignValidationProvider";
import {XBaseControl} from "../Controls/XBaseControl";
import {FormMode} from "../FormDesignConstants";
import {FormContext} from "./FormContext";
import {StateManager} from "../../CommonUI/StateManagement/StateManager";

export class ControlRenderContext {
    editContext: FormContext;
    runtimeIssues: ValidationIssue[] = [];
    designIssues: ValidationIssue[] = [];
    control: XBaseControl;

    constructor(control: XBaseControl, editContext: FormContext) {
        this.control = control;
        this.editContext = editContext;
    }

    getRuntimeIssueText(): string | null {

        let issueText: string | null = null;

        if (this.runtimeIssues && this.runtimeIssues.length !== 0) {
            if (this.runtimeIssues.length === 1) {
                issueText = this.runtimeIssues[0].issue;
            } else {
                issueText = 'Issues (' + this.runtimeIssues.length + ')';
            }
        }

        return issueText;
    }

    getDesignIssueText(): string | null {

        let issueText: string | null = null;

        if (this.designIssues && this.designIssues.length !== 0) {
            if (this.designIssues.length === 1) {
                issueText = this.designIssues[0].issue;
            } else {
                issueText = 'Issues (' + this.designIssues.length + ')';
            }
        }

        return issueText;
    }


    getRuntimeIssueData(): IssueData | null {
        if (this.editContext.mode !== FormMode.Runtime)
            return null;

        if (this.runtimeIssues.length === 0)
            return null;

        // do not return if we are not in runtime mode
        if (this.editContext && this.editContext.mode !== FormMode.Runtime)
            return null;

        let highestLevel = ValidationLevel.WARNING;

        for (let issue of this.runtimeIssues) {
            if (issue.level === ValidationLevel.ERROR) {
                highestLevel = ValidationLevel.ERROR;
                break;
            }
        }

        return {text: this.getRuntimeIssueText(), highestLevel: highestLevel, issues: this.runtimeIssues};
    }

    getDesignIssueData(): IssueData | null {
        if (this.designIssues.length === 0)
            return null;

        let highestLevel = ValidationLevel.WARNING;

        for (let issue of this.designIssues) {
            if (issue.level === ValidationLevel.ERROR) {
                highestLevel = ValidationLevel.ERROR;
                break;
            }
        }

        return {text: this.getDesignIssueText(), highestLevel: highestLevel, issues: this.designIssues};
    }

    selected: boolean = false;

    setSelected(selected: boolean) {
        this.selected = selected;
        StateManager.changed(this);
    }
}

export class IssueData {
    text: string | null = null;
    highestLevel: ValidationLevel = ValidationLevel.ERROR;
    issues?: ValidationIssue[];
}

