import React from "react";
import {XBaseControl} from "../Controls/XBaseControl";
import styled from "styled-components";
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
import {FormRuntimeContext, FormEditContext} from "../Utilities/FormEditContext";
import { MovingIcon } from "../../CommonUI/Icon/MovingIcon";

const ChildFullWidthDiv = styled.div`
    display: flex;
    width: 100%;
    flex-wrap: wrap;

    >* {
        width: 100%; 
        margin-bottom: 10px !important;
    }
`;


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
    abstract getControls() : XBaseControl[] ;

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
                    updateCallback={this.designerUpdate}
                />
      
                <Collapse in={this.overrideFormBorderSettings === DefaultOnOff.On}>
                    <ChildFullWidthDiv>

                        <PropertyEditorInteger
                            editObject={this}
                            label="Border Width"
                            propertyName="containerBorderWidth"
                            updateCallback={this.designerUpdate}
                            parentDefaultValue={this.getFormRuntimeContext()?.form.defaultContainerBorderWidth}
                        />
                        <PropertyEditorInteger
                            editObject={this}
                            label="Border Radius"
                            propertyName="containerBorderRadius"
                            updateCallback={this.designerUpdate}
                            parentDefaultValue={this.getFormRuntimeContext()?.form?.defaultContainerBorderRadius}
                        />
                        
                        <PropertyEditorColor
                            editObject={this}
                            label="Border Color"
                            propertyName="containerBorderColor"
                            updateCallback={this.designerUpdate}
                            parentDefaultValue={this.getFormRuntimeContext()?.form?.defaultContainerBorderColor}
                        />
                        <PropertyEditorSelect
                            editObject={this}
                            label="Border Style"
                            propertyName="containerBorderStyle"
                            updateCallback={this.designerUpdate}
                            options={FormDesignConstants.BORDER_STYLES}
                            parentDefaultValue={this.getFormRuntimeContext()?.form?.defaultContainerBorderStyle}
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
        return this.hasOwnBorder() || (this.overrideFormBorderSettings === DefaultOnOff.DEFAULT && this.getFormRuntimeContext()?.form?.defaultShowContainerBorder)
    }

    borderColor(): string | undefined {
        return (this.hasOwnBorder() && this.containerBorderColor) || this.getFormRuntimeContext()?.form?.defaultContainerBorderColor
    }

    borderStyle(): BorderStyle | undefined {
        return (this.hasOwnBorder() && this.containerBorderStyle) || this.getFormRuntimeContext()?.form?.defaultContainerBorderStyle
    }

    borderWidth(): number | undefined {
        return (this.hasOwnBorder() && this.containerBorderWidth) || this.getFormRuntimeContext()?.form?.defaultContainerBorderWidth
    }

    borderRadius(): number | undefined {
        return (this.hasOwnBorder() && this.containerBorderRadius) || this.getFormRuntimeContext()?.form?.defaultContainerBorderRadius
    }

    backgroundColor(): string | undefined | null {
        return this.containerBackgroundColor || this.getFormRuntimeContext()?.form?.defaultContainerBackgroundColor
    }

    // ----- Overrides to set contexts ----
    setFormRuntimeContext(value: FormRuntimeContext | undefined) : void {
        if (!value)
            return;
        
        super.setFormRuntimeContext(value);

        let controls = this.getControls();
        if (controls) {
            for (let control of controls) {
                control.setFormRuntimeContext( this.getFormRuntimeContext() );
            }
        }
    }

    setFormEditContext(value: FormEditContext | undefined) : void {
        if (!value)
            return;

        super.setFormEditContext(value);

        let controls = this.getControls();
        if (controls) {
            for (let control of controls) {
                // set edit context first
                control.setFormEditContext( value) ;
            }
        }
    }
}

