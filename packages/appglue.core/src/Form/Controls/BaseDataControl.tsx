import {XBaseControl} from "./XBaseControl";
import {ValidationIssue} from "../../Common/IDesignValidationProvider";
import {validateVariableName} from "../../Common/DataValidationUtilities";
import React from "react";
import {PropertyEditorText} from "../../CommonUI/PropertyEditing/PropertyEditorText";
import {PropertyEditorBoolean} from "../../CommonUI/PropertyEditing/PropertyEditorBoolean";
import {Collapse} from "@material-ui/core";

export abstract class BaseDataControl extends XBaseControl {
    label: string = 'Configure Label';
    valueName?: string;
    requiredOnAllOutcomes: boolean = true;
    requiredMessage: string= 'value is required';

    getDesignValidationIssues(): ValidationIssue[] {
        let issues: ValidationIssue[] = [];

        if (!this.valueName) {
            issues.push(new ValidationIssue('Value name is required', undefined, this.id));
        } else {
            let varIssue = validateVariableName(this.valueName);

            if (varIssue) {
                varIssue.dataName = this.valueName;
                varIssue.elementId = this.id;
                issues.push(varIssue);
            }
        }

        return issues;
    }

    getRuntimeValidationIssues() : ValidationIssue[] {
        let issues: ValidationIssue[] = [];

        if (this.requiredOnAllOutcomes && this.valueName && !this.getFormContext()?.getFormDataValue(this.valueName)) {
            issues.push(new ValidationIssue(this.requiredMessage, this.valueName, this.id));
        }

        return issues;
    }


    // produces part of the editor for label and name
    renderBaseDataControlEditor() {
        return(
            <>
                <PropertyEditorText editObject={this} label={'Label'} propertyName={'label'} updateCallback={this.controlUpdate}/>
                <PropertyEditorText editObject={this} label={'Value Name'} propertyName={'valueName'} updateCallback={this.controlUpdate}/>
                <PropertyEditorBoolean editObject={this} label={'Required On All Outcomes'} propertyName={'requiredOnAllOutcomes'} updateCallback={this.controlUpdate}/>
                <Collapse in={this.requiredOnAllOutcomes}>
                    <PropertyEditorText editObject={this} label={'Required Message'} propertyName={'requiredMessage'} updateCallback={this.controlUpdate}/>
                </Collapse>
            </>
        );

    }
}

