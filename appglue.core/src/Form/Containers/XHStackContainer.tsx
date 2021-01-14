import React from "react";
import styled from "styled-components";
import {Droppable, DroppableProvided, DroppableStateSnapshot} from "react-beautiful-dnd";
import {XDesignWrapper} from "../Utilities/XDesignWrapper";
import {ControlType, RegisterUIControl} from "../Utilities/RegisterUIControl";
import {XBaseStackContainer} from "./XBaseStackContainer";
import {FormMode, BorderStyle, FormDesignConstants} from "../FormDesignConstants";
import {PropertyEditorInteger} from "../../CommonUI/PropertyEditing/PropertyEditorInteger";
import {PropertyEditorSelect} from "../../CommonUI/PropertyEditing/PropertyEditorSelect";
import {PropertyEditorText} from "../../CommonUI/PropertyEditing/PropertyEditorText";
import { HStackIcon } from "../../CommonUI/Icon/HStackIcon";


export enum HStackAlignment {
    LEFT = 'Left',
    RIGHT = 'Right',
    CENTER = 'Center'
}

export enum HStackVerticalAlignment {
    TOP = 'Top',
    BOTTOM = 'Bottom',
    MIDDLE = 'Middle'
}


const HStackContainerDiv = styled("div")<{
    padding?: number, 
    hasBorder?: boolean,
    borderColor?: string,
    borderWidth?: number,
    borderRadius?: number,
    borderStyle?: BorderStyle,
    backgroundColor?: string | null;
    minHeight: number;
}>`
   padding: ${props => props.padding || 0}px;
   width: 100%;
   display: flex;
   flex-wrap: wrap;
   min-height: ${props => (props.padding || 0) + props.minHeight}px;

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

const HStackRowDiv = styled("div")<{
    colGap?: number;
    align: string;
    verticalAlign: string;
}>`
    margin: ${props => -1 * (props.colGap || 0) / 2 }px;
    flex-wrap: wrap;
    display: flex;
    justify-content: ${(props) => props.align};
    align-items: ${props => props.verticalAlign};
    width: 100%;
`;

const HStackColumn = styled("div")<{colGap?: number}>`
    margin: ${(props) => (props.colGap || 0) / 2}px;
`;


@RegisterUIControl('Material Controls', 'Horizontal Stack Container', ControlType.Container, <HStackIcon />)
export class XHStackContainer
    extends XBaseStackContainer {

    alignment : HStackAlignment = HStackAlignment.LEFT;
    verticalAlignment: HStackVerticalAlignment = HStackVerticalAlignment.TOP;

    render() {
        let alignment = 'flex-start';

        if (this.alignment === HStackAlignment.CENTER) alignment = 'center';
        else if (this.alignment === HStackAlignment.RIGHT) alignment = 'flex-end';

        let verticalAlign = 'flex-start';
        if (this.verticalAlignment === HStackVerticalAlignment.MIDDLE) verticalAlign = 'center';
        else if (this.verticalAlignment === HStackVerticalAlignment.BOTTOM) verticalAlign = 'flex-end';

        let mode = this.getFormContext()?.mode ?? FormMode.Runtime;


        if (mode === FormMode.FormDesign) {
            return (
                <Droppable
                    direction={"horizontal"}
                    droppableId={this.id}
                    key={this.id}
                >
                        {
                            (provided: DroppableProvided, snapshot: DroppableStateSnapshot) =>
                            {
                                return (
                                    <HStackContainerDiv
                                        padding={this.getInnerMargin()}
                                        hasBorder={snapshot.isDraggingOver || this.hasBorder()}
                                        borderColor={(snapshot.isDraggingOver && FormDesignConstants.DROPPABLE_BORDER_COLOR) || this.borderColor()}
                                        borderStyle={(snapshot.isDraggingOver && FormDesignConstants.DROPPABLE_BORDER_STYLE) || this.borderStyle()}
                                        borderWidth={(snapshot.isDraggingOver && FormDesignConstants.DROPPABLE_BORDER_WIDTH) ||this.borderWidth()}
                                        borderRadius={(snapshot.isDraggingOver && FormDesignConstants.DROPPABLE_BORDER_RADIUS) || this.borderRadius()}
                                        backgroundColor={this.backgroundColor()}
                                        minHeight={this.controls.length > 0 ? 0 : 75}
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}
                                    >
                                        <HStackRowDiv
                                            colGap={this.interControlSpacing || this.getFormContext()?.form?.defaultInterControlSpacing}
                                            align={alignment}
                                            verticalAlign={verticalAlign}    
                                        >
                                        {
                                            this.controls.map((control, index) =>
                                            {
                                                return (
                                                    <HStackColumn key={index} colGap={this.interControlSpacing || this.getFormContext()?.form?.defaultInterControlSpacing} >
                                                        <XDesignWrapper key={control.id} id={control.id} index={index} innerComponent={control} editContext={this.getFormContext()!}>
                                                            { control.render() }
                                                        </XDesignWrapper>                                                                                                                                                                                                                                                                                                   
                                                    </HStackColumn>
                                                    
                                                );
                                            })
                                        }
                                        {provided.placeholder}
                                        </HStackRowDiv>
                                        {
                                            this.controls.length === 0 && this.renderEmptyControlDiv(this.getInnerMargin())
                                        }
                                    </HStackContainerDiv>
                                );
                            }
                        }
                </Droppable>
            );
        } else {
            return (
                <HStackContainerDiv
                    minHeight={this.controls.length > 0 ? 0 : 75}
                    padding={this.getInnerMargin()}
                    hasBorder={this.hasBorder()}
                    borderColor={this.borderColor()}
                    borderStyle={this.borderStyle()}
                    borderWidth={this.borderWidth()}
                    borderRadius={this.borderRadius()}
                    backgroundColor={this.backgroundColor()}
                >
                    <HStackRowDiv
                        colGap={this.interControlSpacing || this.getFormContext()?.form?.defaultInterControlSpacing}
                        align={alignment}
                        verticalAlign={verticalAlign}
                    >
                    {this.controls.map((control, index) => {
                        return (
                            <HStackColumn colGap={this.interControlSpacing || this.getFormContext()?.form?.defaultInterControlSpacing} key={index}>
                                {control.render()}
                            </HStackColumn>
                        );
                    })}
                    </HStackRowDiv>
                    {
                        this.controls.length === 0 && mode !== FormMode.Runtime && this.renderEmptyControlDiv(this.getInnerMargin(), 'Add controls in the form design tab')
                    }
                </HStackContainerDiv>
            );
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
                    parentDefaultValue={this.getFormContext()?.form?.defaultInterControlSpacing}
                >
                </PropertyEditorInteger>
                <PropertyEditorInteger
                    editObject={this}
                    label="Inner Margin"
                    propertyName={"innerMargin"}
                    updateCallback={this.controlUpdate}
                    parentDefaultValue={this.getFormContext()?.form?.defaultInnerContainerMargin}
                >
                </PropertyEditorInteger>
                <PropertyEditorSelect
                    editObject={this}
                    label={'Alignment'}
                    propertyName={'alignment'}
                    options={['Left', 'Center', 'Right']}
                    updateCallback={this.controlUpdate}>
                </PropertyEditorSelect>
                <PropertyEditorSelect
                    editObject={this}
                    label={'Vertical Alignment'}
                    propertyName={'verticalAlignment'}
                    options={['Top', 'Bottom', 'Middle']}
                    updateCallback={this.controlUpdate}>
                </PropertyEditorSelect>

                <PropertyEditorText
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

