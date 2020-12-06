import React from "react";
import {TextControlSize, TextControlStyle} from "../FormDesignConstants";
import {PropertyEditorBoolean} from "../../CommonUI/PropertyEditing/PropertyEditorBoolean";
import {Collapse} from "@material-ui/core";
import {
    PropertyEditorTextSizeSelection,
    PropertyEditorTextStyleSelection
} from "../../CommonUI/PropertyEditing/TextSelectionButtonGroups";
import {PropertyEditorText} from "../../CommonUI/PropertyEditing/PropertyEditorText";
import {BaseDataControl} from "./BaseDataControl";
import {PropertyEditorInteger} from "../../CommonUI/PropertyEditing/PropertyEditorInteger";

export abstract class BaseTextEntryControl extends BaseDataControl {
    hintText?: string;
    placeholderText?: string;

    overrideStyle : boolean = false;
    style? : TextControlStyle;
    size? : TextControlSize;

    fullWidth: boolean = true;
    // only show if not full width
    width?: number;


    renderTextStyleSelectionEditor() {
        return (
            <>
                <PropertyEditorBoolean
                    editObject={this}
                    label="Override Text Style"
                    propertyName="overrideStyle"
                    updateCallback={this.controlUpdate}
                />
                <Collapse in={this.overrideStyle}>
                    <PropertyEditorTextStyleSelection updateCallback={this.controlUpdate} propertyName={'style'} editObject={this} parentDefaultValue={this.getFormContext()?.form.defaultTextStyle}/>
                    <PropertyEditorTextSizeSelection updateCallback={this.controlUpdate} propertyName={'size'} editObject={this} parentDefaultValue={this.getFormContext()?.form.defaultTextSize}/>
                </Collapse>

            </>
        ); 

    } 

    renderTextControlBasePropertyEditor() {
        return (
            <>
                <PropertyEditorText label={'Hint Text'} updateCallback={this.controlUpdate} propertyName={'hintText'} editObject={this}/>
                <PropertyEditorText label={'Placeholder Text'} updateCallback={this.controlUpdate} propertyName={'placeholderText'} editObject={this}/>
                <PropertyEditorBoolean label={'Full Width'} updateCallback={this.controlUpdate} propertyName={'fullWidth'} editObject={this}/>
                <Collapse in={!this.fullWidth}>
                    <PropertyEditorInteger label={'Width'} updateCallback={this.controlUpdate} propertyName={'width'} editObject={this}/>
                </Collapse>
            </>
        );

    }

}

