import React from "react";
import {XBaseControl} from "../Controls/XBaseControl";
import {IFormDataAccessor} from "../Utilities/IFormDataAccessor";
import {BorderStyle, FormDesignConstants} from "../FormDesignConstants";
import { PropertyEditorInteger } from "../../CommonUI/PropertyEditing/PropertyEditorInteger";
import { PropertyEditorSelect } from "../../CommonUI/PropertyEditing/PropertyEditorSelect";
import { Collapse } from "@material-ui/core";
import { PropertyEditorColor } from "../../CommonUI/PropertyEditing/PropertyEditorColor";
import {ValidationIssue} from "../../Common/IDesignValidationProvider";
import { DefaultOnOff } from "../Utilities/DefaultOnOff";
import { PropertyEditorOptionWithButtonGroup } from "../../CommonUI/PropertyEditing/PropertyEditorOptionWithButtonGroup";
import { EmptyContainer, ControlDiv } from "../Components/EmptyContainer";
import {FormContext} from "../Utilities/FormContext";
import { MovingIcon } from "../../CommonUI/Icon/MovingIcon";
import { ChildFullWidthDiv } from "../Controls/XCommonStyled";


export abstract class XBaseContainer
    extends XBaseControl
    implements IFormDataAccessor {

    overrideFormBorderSettings: DefaultOnOff = DefaultOnOff.DEFAULT;
    showContainerBorder? : boolean;
    containerBorderType?: string;
    containerBorderRadius?: number;
    containerBorderWidth?: number;
    containerBorderStyle?: BorderStyle;

    containerBorderColor? : string;
    containerBackgroundColor? : string;


    // to implement
    abstract remove(control: XBaseControl): void;
    abstract find(id: string): XBaseControl | null  ;
    abstract setOrder(id: string, order: number): void ;
    abstract add(control: XBaseControl, index?: number): void;
    abstract getControls() : XBaseControl[];

    getDesignValidationIssues(): ValidationIssue[] {
        return [];
    }

    getRuntimeValidationIssues(): ValidationIssue[] {
        return [];
    }

    renderEmptyControlDiv(colGap?: number, message?: string) {
        return <EmptyContainer colGap={colGap}>
            <span>
                {`${message || 'Drag controls from toolbox.'}`}
            </span>
            <ControlDiv>
                Control <MovingIcon />
            </ControlDiv>
        </EmptyContainer>
    }


    renderBorderConfigUI(): JSX.Element | null {
        return (
            <ChildFullWidthDiv>
                <PropertyEditorOptionWithButtonGroup
                    editObject={this}
                    label="Override Border Settings"
                    propertyName="overrideFormBorderSettings"
                    updateCallback={this.controlUpdate}
                />
      
                <Collapse in={this.overrideFormBorderSettings === DefaultOnOff.On}>
                    <ChildFullWidthDiv>

                        <PropertyEditorInteger
                            editObject={this}
                            label="Border Width"
                            propertyName="containerBorderWidth"
                            updateCallback={this.controlUpdate}
                            parentDefaultValue={this.getFormContext()?.form.defaultContainerBorderWidth}
                        />
                        <PropertyEditorInteger
                            editObject={this}
                            label="Border Radius"
                            propertyName="containerBorderRadius"
                            updateCallback={this.controlUpdate}
                            parentDefaultValue={this.getFormContext()?.form?.defaultContainerBorderRadius}
                        />
                        
                        <PropertyEditorColor
                            editObject={this}
                            label="Border Color"
                            propertyName="containerBorderColor"
                            updateCallback={this.controlUpdate}
                            parentDefaultValue={this.getFormContext()?.form?.defaultContainerBorderColor}
                        />
                        <PropertyEditorSelect
                            editObject={this}
                            label="Border Style"
                            propertyName="containerBorderStyle"
                            updateCallback={this.controlUpdate}
                            options={FormDesignConstants.BORDER_STYLES}
                            parentDefaultValue={this.getFormContext()?.form?.defaultContainerBorderStyle}
                        />
                    </ChildFullWidthDiv>
                </Collapse>
            </ChildFullWidthDiv>
        )
    }

    hasOwnBorder(): boolean | undefined {
        return this.overrideFormBorderSettings === DefaultOnOff.On
    }

    hasBorder(): boolean | undefined {
        return this.hasOwnBorder() || (this.overrideFormBorderSettings === DefaultOnOff.DEFAULT && this.getFormContext()?.form?.defaultShowContainerBorder)
    }

    borderColor(): string | undefined {
        return (this.hasOwnBorder() && this.containerBorderColor) || this.getFormContext()?.form?.defaultContainerBorderColor
    }

    borderStyle(): BorderStyle | undefined {
        return (this.hasOwnBorder() && this.containerBorderStyle) || this.getFormContext()?.form?.defaultContainerBorderStyle
    }

    borderWidth(): number | undefined {
        return (this.hasOwnBorder() && this.containerBorderWidth) || this.getFormContext()?.form?.defaultContainerBorderWidth
    }

    borderRadius(): number | undefined {
        return (this.hasOwnBorder() && this.containerBorderRadius) || this.getFormContext()?.form?.defaultContainerBorderRadius
    }

    backgroundColor(): string | undefined | null {
        return this.containerBackgroundColor || this.getFormContext()?.form?.defaultContainerBackgroundColor
    }

    // ----- Overrides to set contexts ----

    setFormContext(value: FormContext | undefined) : void {
        if (!value)
            return;

        super.setFormContext(value);

        let controls = this.getControls();
        if (controls) {
            for (let control of controls) {
                // set edit context first
                control.setFormContext( value) ;
            }
        }
    }
}

