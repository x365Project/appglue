import styled from "styled-components";
import React from "react";
import {Droppable, DroppableProvided, DroppableStateSnapshot} from "react-beautiful-dnd";
import {ControlType, RegisterUIControl} from "../Utilities/RegisterUIControl";
import {XDesignWrapper} from "../Utilities/XDesignWrapper";
import {XBaseStackContainer} from "./XBaseStackContainer";
import {FormMode, BorderStyle, FormDesignConstants} from "../FormDesignConstants";
import { PropertyEditorInteger } from "../../CommonUI/PropertyEditing/PropertyEditorInteger";
import { PropertyEditorColor } from "../../CommonUI/PropertyEditing/PropertyEditorColor";
import { StackIcon } from "../../CommonUI/Icon/StackIcon";

export const StackContainerDiv = styled("div")<{
    padding?: number; 
    hasBorder?: boolean;
    borderColor?: string;
    borderWidth?: number;
    borderRadius?: number;
    borderStyle?: BorderStyle;
    backgroundColor?: string | null;
}>`
   min-height: ${props => (props.padding || 0) + 75}px;
   width: 100%;
   display: flex;
   flex-direction: column; 
   padding: ${props => props.padding || 0}px;
   border: ${props => (
        props.hasBorder 
        ? `${(props.borderStyle || FormDesignConstants.CONTAINER_BORDER_STYLE).toLowerCase()} ${props.borderWidth || FormDesignConstants.CONTAINER_BORDER_COLOR}px ${props.borderColor || FormDesignConstants.CONTAINER_BORDER_COLOR}`
        : 'none'
    )};
    border-radius: ${props => props.borderRadius || FormDesignConstants.CONTAINER_BORDER_RADIOUS}px;
    overflow: hidden;
    background-color: ${props => props.backgroundColor || FormDesignConstants.CONTAINER_BACKGROUND_COLOR};
    position: relative;
`;

export const StackContainerColumn = styled("div")<{
    colGap?: number;
    padding?: number; 
}>`
    margin-top: ${props => props.colGap || 0}px;
    padding: ${props => props.padding || 0}px;
    &:first-child {
        margin-top: 0px;
    }
`


@RegisterUIControl('Material Controls', 'Stack Container', ControlType.Container, <StackIcon />)
export class XStackContainer
    extends XBaseStackContainer {

    render() {
        let mode = this.getFormContext()?.mode ?? FormMode.Runtime;

        if (mode === FormMode.FormDesign) {
            return (
                <Droppable droppableId={this.id} key={this.id}>
                    {(provided: DroppableProvided, snapshot: DroppableStateSnapshot) => {


                        return (
                            <StackContainerDiv
                                padding={this.getInnerMargin()}
                                hasBorder={snapshot.isDraggingOver || this.hasBorder()}
                                borderColor={(snapshot.isDraggingOver && FormDesignConstants.DROPPABLE_BORDER_COLOR) || this.borderColor()}
                                borderStyle={(snapshot.isDraggingOver && FormDesignConstants.DROPPABLE_BORDER_STYLE) || this.borderStyle()}
                                borderWidth={(snapshot.isDraggingOver && FormDesignConstants.DROPPABLE_BORDER_WIDTH) || this.borderWidth()}
                                borderRadius={(snapshot.isDraggingOver && FormDesignConstants.DROPPABLE_BORDER_RADIUS) || this.borderRadius()}
                                backgroundColor={this.backgroundColor()}
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                            >
                                {

                                    this.controls.map((control, index) => {
                                        return (
                                            <StackContainerColumn
                                                colGap={this.interControlSpacing || this.getFormContext()?.form?.defaultInterControlSpacing}
                                                key={index}
                                                id={control.id}
                                            >
                                                <XDesignWrapper key={control.id} id={control.id} index={index} innerComponent={control} editContext={this.getFormContext()!}>
                                                    { control.render() }
                                                </XDesignWrapper>
                                            </StackContainerColumn>
                                        );
                                    }
                                )}
                                {provided.placeholder}
                                {
                                    this.controls.length === 0 && this.renderEmptyControlDiv(this.getInnerMargin())
                                }
                            </StackContainerDiv>
                        );


                    }}
                </Droppable>
            );
        } else {
            return (
                <StackContainerDiv
                    padding={this.getInnerMargin()}
                    hasBorder={this.hasBorder()}
                    borderColor={this.borderColor()}
                    borderStyle={this.borderStyle()}
                    borderWidth={this.borderWidth()}
                    borderRadius={this.borderRadius()}
                    backgroundColor={this.backgroundColor()}
                >
                    {
                        this.controls.map((control, index) => {
                            return (
                                <StackContainerColumn colGap={this.interControlSpacing || this.getFormContext()?.form?.defaultInterControlSpacing} key={index} id={control.id}>
                                    {control.render()}
                                </StackContainerColumn>
                            );
                        })
                    }
                    {
                        this.controls.length === 0 && mode !== FormMode.Runtime && this.renderEmptyControlDiv(this.getInnerMargin(), 'Add controls in the form design tab')
                    }
                </StackContainerDiv>
            )
        }
    }

    renderEditUI(): JSX.Element | null {
        return (
            <>
                <PropertyEditorInteger
                    editObject={this}
                    label={"Control Gap"}
                    propertyName={"interControlSpacing"}
                    updateCallback={this.controlUpdate}
                    parentDefaultValue={this.getFormContext()?.form?.defaultInterControlSpacing}>
                </PropertyEditorInteger>
                <PropertyEditorInteger
                    editObject={this}
                    label="Inner Margin"
                    propertyName={"innerMargin"}
                    updateCallback={this.controlUpdate}
                    parentDefaultValue={this.getFormContext()?.form?.defaultInnerContainerMargin}
                >
                </PropertyEditorInteger>
                <PropertyEditorColor
                    editObject={this}
                    label="Container Color"
                    propertyName="containerBackgroundColor"
                    updateCallback={this.controlUpdate}
                    parentDefaultValue={this.getFormContext()?.form?.defaultContainerBackgroundColor}
                />
                {
                    this.renderBorderConfigUI()
                }
            </>
        );
    }
}