import React from "react";
import styled from "styled-components";
import {Collapse} from "@material-ui/core";
import {ControlType, RegisterUIControl} from "../Utilities/RegisterUIControl";
import {XBaseContainer} from "./XBaseContainer";
import {XBaseControl} from "../Controls/XBaseControl";
import {Droppable, DroppableProvided, DroppableStateSnapshot} from "react-beautiful-dnd";
import {XDesignWrapper} from "../Utilities/XDesignWrapper";
import {DataUtilities} from "../../Common/DataUtilities";
import {StackContainerColumn, StackContainerDiv} from "./XStackContainer";
import {BorderStyle, FormDesignConstants, FormMode, WidthUnitInterface} from "../FormDesignConstants";
import {XBaseStackContainer} from "./XBaseStackContainer";
import {PropertyEditorInteger} from "../../CommonUI/PropertyEditing/PropertyEditorInteger";
import {PropertyEditorBoolean} from "../../CommonUI/PropertyEditing/PropertyEditorBoolean";
import {PropertyEditorList} from "../../CommonUI/PropertyEditing/PropertyEditorList";
import {PropertyEditorColor} from "../../CommonUI/PropertyEditing/PropertyEditorColor";
import {PropertyEditorSelect} from "../../CommonUI/PropertyEditing/PropertyEditorSelect";
import {DefaultOnOff} from "../Utilities/DefaultOnOff";
import {PropertyEditorOptionWithButtonGroup} from "../../CommonUI/PropertyEditing/PropertyEditorOptionWithButtonGroup";
import { ColumnIcon } from "../../CommonUI/Icon/ColumnIcon";
import { ChildFullWidthDiv } from "../Controls/XCommonStyled";


const ContainerDiv = styled("div")<{
    padding?: number, 
    hasBorder?: boolean;
    borderColor?: string;
    borderWidth?: number;
    borderRadius?: number;
    borderStyle?: BorderStyle;
    backgroundColor?: string | null;
    minHeight?: number;
}>`
    width: 100%;
    padding: ${props => props.padding || 0}px;
    min-height: ${props => (props.padding || 0) * 2 + (props.minHeight || 75)}px;
    border: ${props => (
        props.hasBorder 
        ? `${(props.borderStyle || FormDesignConstants.CONTAINER_BORDER_STYLE).toLowerCase()} ${props.borderWidth || FormDesignConstants.CONTAINER_BORDER_WIDTH}px ${props.borderColor || FormDesignConstants.CONTAINER_BORDER_COLOR}`
        : 'none'
    )};
    border-radius: ${props => props.borderRadius || FormDesignConstants.CONTAINER_BORDER_RADIOUS}px;
    overflow: hidden;
    background-color: ${props => props.backgroundColor || FormDesignConstants.CONTAINER_BACKGROUND_COLOR};
    position: relative;
`;


const RowDiv = styled("div")<{
    colGap: number;
    lineBetweenColumns: boolean;
}>`
    margin: ${props => -1 * (props.colGap || (props.lineBetweenColumns ? 1 : 0))}px;
    flex-wrap: wrap;
    display: flex;
`;

const ColumnDiv = styled("div")<{
    padding?: number; 
    colGap: number;
    hasBorder?: boolean;
    borderColor?: string;
    borderWidth?: number;
    borderRadius?: number;
    borderStyle?: BorderStyle;
    backgroundColor?: string | null;
    width: number;
    widthUnit?: WidthUnitInterface;
    minWidth?: number;
    maxWidth?: number;
    minHeight?: number;
    lineBetweenColumns: boolean;
}>`
    min-height: ${props => (props.padding || 0) + (props.minHeight || 75)}px;
    padding: ${props => props.padding || 0}px;
    margin: ${props => (props.colGap || (props.lineBetweenColumns ? 1 : 0))}px;
    flex: ${props => props.width}${props => props.widthUnit === WidthUnitInterface.PIXEL ? 'px' : ''};
    min-width: ${props => props.minWidth ? `${props.minWidth}px` : '0px'};
    max-width: ${props => props.maxWidth ? `${props.maxWidth}px` : 'none'};
    border: ${props => (
        props.hasBorder 
        ? `${(props.borderStyle || FormDesignConstants.CONTAINER_BORDER_STYLE).toLowerCase()} ${props.borderWidth || FormDesignConstants.CONTAINER_BORDER_COLOR}px ${props.borderColor || FormDesignConstants.CONTAINER_BORDER_COLOR}`
        : 'none'
    )};
    border-radius: ${props => props.borderRadius || FormDesignConstants.CONTAINER_BORDER_RADIOUS}px;
    overflow: hidden;
    position: relative;
    background-color: ${props => props.backgroundColor ? props.backgroundColor : 'transparent'};
`;

enum Orientation {
    Vertical = 'veritical',
    Horizontal = 'horizontal'
}

const ColumnDivider = styled("div")<{
    lineColorBetweenColumns: string;
    lineWidthBetweenColumns: number;
    colGap: number;
    orientation: Orientation 
}>`
    background-color: ${props => props.lineColorBetweenColumns};
    display: flex;
    margin: ${props => (props.colGap)}px 0px;
    width: ${props => props.orientation === Orientation.Vertical ? `${props.lineWidthBetweenColumns}px` : '100%'} ;
    height: ${props => props.orientation === Orientation.Horizontal ? `${props.lineWidthBetweenColumns}px` : 'auto'};
`;


export class XColumnContainerColumn extends XBaseStackContainer {
    minSizePx? : number;
    maxSizePx? : number;
    targetWidth: number = 100;
    widthUnit?: WidthUnitInterface;
    spacerColumn: boolean = false;

    // NOT SURE WHAT THESE ARE FOR.  Seems next two settings are the ones that are important.
    padding?: number;

    interControlSpacing?: number ;
    controlInnerMarginFromColumnEdge?: number; // comes from col container def, then form (gap to container).  should be null if same as col container or if that is null the form.

    showColumnBorder? : boolean;
    columnBorderColor?: string = 'lightGray';
    columnBorderRadius?: number = 10;
    columnBorderWidth?: number = 2;
    columnBorderStyle?: BorderStyle;

    columnBackgroundColor?: string;


    render() {
        throw 'cannot render this container.  internal only'
        return undefined;
    }

    // avoiding refresh on this as it is never added
    setFormDataValue(fieldName: string, value: any): void {
        this.getFormContext()?.setFormDataValue(fieldName, value);
    }

    renderEditUI(): JSX.Element | null {
        return null;
    }

    hasOwnBorder(): boolean | undefined {
        return this.overrideFormBorderSettings === DefaultOnOff.On
    }

    borderColor(): string | undefined {
        return (this.hasOwnBorder() && this.columnBorderColor) || undefined
    }

    borderStyle(): BorderStyle | undefined {
        return (this.hasOwnBorder() && this.columnBorderStyle) || undefined
    }

    borderWidth(): number | undefined {
        return (this.hasOwnBorder() && this.columnBorderWidth) || undefined
    }

    borderRadius(): number | undefined {
        return (this.hasOwnBorder() && this.columnBorderRadius) || undefined
    }

    backgroundColor(): string | undefined {
        return this.columnBackgroundColor
    }

    getInnerMargin(): number | undefined {
        return this.innerMargin
    }
}

@RegisterUIControl('Material Controls', 'Columns', ControlType.Container, <ColumnIcon alt="Columns Container" />)
export class XColumnContainer
    extends XBaseContainer {

    columns: XColumnContainerColumn[] = [];

    paddingBetweenContainerAndColumns?: number;  // should come from ui constant default and be null if is default

    interControlSpacing?: number;  // comes from form.  should be null if same as form.
    controlInnerMarginFromColumnEdge?: number; // comes from form (gap to container).  should be null if same as form.

    defaultShowColumnBorder?: boolean = false;
    defaultColumnBorderColor?: string = 'lightGray';
    defaultColumnBorderRadius?: 10;
    defaultColumnBorderWidth?: 2;
    defaultColumnBorderStyle?: BorderStyle;

    defaultColumnBackgroundColor?: string | null = null;

    defaultInnerColumnMargin?: number;

    gapBetweenColumns: number = FormDesignConstants.GAP_BETWEEN_COLUMNS;
    lineBetweenColumns: boolean = false;
    lineWidthBetweenColumns: number = FormDesignConstants.LINE_WIDTH_BETWEEN_COLUMNS;
    lineColorBetweenColumns: string = FormDesignConstants.LINE_COLOR_BETWEEN_COLUMNS;


    addColumn(col: XColumnContainerColumn) {
        this.add(col);
    }

    add(control: XBaseControl, index?: number) {

        // if we are adding this way, we add a default column configuration for this.

        if (control instanceof XColumnContainerColumn) {

            let container = control as XColumnContainerColumn;
            if (!index) {
                this.columns.push(container);
            } else {
                this.columns.splice(index, 0, container)
            }
        } else {
            throw new Error('Must be a stack container, cannot add other types of controls here');
        }

        if (this.getFormContext())
            control.setFormContext(this.getFormContext()) ;

    }

    remove(control: XBaseControl): void {
        for (let col of this.columns) {
            const index = col.getControls().indexOf(control, 0);
            if (index > -1) {
                col.getControls().splice(index, 1);
            }
        }
    }

    find(id: string): XBaseControl | null {
        for (let col of this.columns) {
            if (col.id === id)
                return col;

            for (let c of col.getControls()) {
                if (c.id === id) {
                    return c;
                }

                if (c instanceof XBaseContainer) {
                    let found = (c as XBaseContainer).find(id);

                    if (found)
                        return found;
                }
            }
        }

        return null;
    }

    getInnerMargin(): number | undefined {
        return this.paddingBetweenContainerAndColumns || this.getFormContext()?.form?.defaultInnerContainerMargin
    }

    getFormWidth(): number | undefined {
        return (this.getFormContext() ?? this.getFormContext())?.form.getContentWidth();
    }

    render() {
        const formWidth = this.getFormWidth();
        let sumMinWidth = 0;

        if (this.columns.length === 0) {
            // no cols, lets add some
            // add 2 cols by default
            this.add(new XColumnContainerColumn());
            this.add(new XColumnContainerColumn());
        }

        let mode: FormMode | string = FormMode.Runtime;
        let editContext = this.getFormContext();
        if (editContext)
            mode = editContext.mode;

        if (mode === FormMode.FormDesign) {
            return (
                <ContainerDiv
                    key={'column' + this.columns[0].id} 
                    padding={this.getInnerMargin()}
                    hasBorder={this.hasBorder()}
                    borderColor={this.borderColor()}
                    borderStyle={this.borderStyle()}
                    borderWidth={this.borderWidth()}
                    borderRadius={this.borderRadius()}
                    backgroundColor={this.backgroundColor()}
                    minHeight={this.columns.length > 0 ? 1 : 75}
                >
                    <RowDiv 
                        colGap={this.gapBetweenColumns / 2}
                        lineBetweenColumns={this.lineBetweenColumns}
                    >
                    {
                        this.columns.map((col, index) => {
                            sumMinWidth += col.minSizePx || 0;
                            let isNextLine = false;

                            if (index > 0) {
                                isNextLine = !!formWidth && sumMinWidth > formWidth;
                            }

                            if (isNextLine) sumMinWidth = col.minSizePx || 0;

                            return (
                                <React.Fragment key={col.id}>
                                    {
                                        this.lineBetweenColumns && index > 0 && (
                                            <ColumnDivider
                                                data-testid="line-between-columns"
                                                lineColorBetweenColumns={this.lineColorBetweenColumns}
                                                lineWidthBetweenColumns={this.lineWidthBetweenColumns}
                                                colGap={this.gapBetweenColumns / 2}
                                                orientation={isNextLine ? Orientation.Horizontal : Orientation.Vertical}
                                            />
                                        )
                                    }
                                    <ColumnDiv
                                        key={col.id}
                                        width={col.targetWidth}
                                        widthUnit={col.widthUnit}
                                        minWidth={col.minSizePx}
                                        maxWidth={col.maxSizePx}
                                        colGap={this.gapBetweenColumns / 2}
                                        minHeight={col.getControls().length > 0 ? 1 : 75}
                                        padding={col.getInnerMargin() || this.defaultInnerColumnMargin || this.getFormContext()?.form?.defaultInnerColumnMargin}
                                        hasBorder={
                                            col.hasOwnBorder()
                                            || (col.overrideFormBorderSettings === DefaultOnOff.DEFAULT && this.defaultShowColumnBorder)
                                        }
                                        backgroundColor={col.backgroundColor() || this.defaultColumnBackgroundColor || this.getFormContext()?.form?.defaultContainerBackgroundColor}
                                        borderColor={col.borderColor() || this.defaultColumnBorderColor || this.getFormContext()?.form?.defaultContainerBorderColor}
                                        borderStyle={col.borderStyle()  || this.defaultColumnBorderStyle || this.getFormContext()?.form?.defaultContainerBorderStyle}
                                        borderWidth={col.borderWidth() || this.defaultColumnBorderWidth || this.getFormContext()?.form?.defaultContainerBorderWidth || this.getFormContext()?.form?.defaultContainerBorderWidth}
                                        borderRadius={col.borderRadius() || this.defaultColumnBorderRadius || this.getFormContext()?.form?.defaultContainerBorderRadius}
                                        lineBetweenColumns={this.lineBetweenColumns}
                                    >
                                        <Droppable droppableId={col.id}>
                                            {(provided: DroppableProvided, snapShot: DroppableStateSnapshot) => {
                                                return (
                                                    <StackContainerDiv
                                                        ref={provided.innerRef}
                                                        {...provided.droppableProps}
                                                        style={{
                                                            border: snapShot.isDraggingOver ? `${FormDesignConstants.DROPPABLE_BORDER_STYLE} ${FormDesignConstants.DROPPABLE_BORDER_WIDTH}px ${FormDesignConstants.DROPPABLE_BORDER_COLOR}`: 'none',
                                                            borderRadius: snapShot.isDraggingOver ? FormDesignConstants.DROPPABLE_BORDER_RADIUS : 0
                                                        }}
                                                    >
                                                        {col.getControls().map((control, index ) => {
                                                            return (
                                                                <StackContainerColumn
                                                                    colGap={col.interControlSpacing || this.interControlSpacing || this.getFormContext()?.form?.defaultInterControlSpacing}
                                                                    key={index}
                                                                >
                                                                    <XDesignWrapper key={control.id} id={control.id} index={index}
                                                                                    innerComponent={control} editContext={this.getFormContext()!}>
                                                                        {control.render()}
                                                                    </XDesignWrapper>
                                                                </StackContainerColumn>
                                                            );
                                                        })}
                                                        {provided.placeholder}
                                                    </StackContainerDiv>
                                                );
                                            }}
                                        </Droppable>
                                        {col.getControls().length === 0 && this.renderEmptyControlDiv(this.gapBetweenColumns)}
                                    </ColumnDiv>
                                </React.Fragment>
                            );
                        })
                    }
                    </RowDiv>
                </ContainerDiv>
            );
        } else {
            return (
                <ContainerDiv
                    padding={this.getInnerMargin()}
                    hasBorder={this.hasBorder()}
                    borderColor={this.borderColor()}
                    borderStyle={this.borderStyle()}
                    borderWidth={this.borderWidth()}
                    borderRadius={this.borderRadius()}
                    backgroundColor={this.backgroundColor()}
                    minHeight={this.columns.length > 0 ? 1 : 75}
                    key={'column' + this.columns[0].id}
                >
                    <RowDiv
                        colGap={this.gapBetweenColumns / 2}
                        lineBetweenColumns={this.lineBetweenColumns}
                    >
                    {
                        this.columns.map((col, index) => {
                            sumMinWidth += col.minSizePx || 0;
                            let isNextLine = false;

                            if (index > 0) {
                                isNextLine = !!formWidth && sumMinWidth > formWidth;
                            }

                            if (isNextLine) sumMinWidth = col.minSizePx || 0;

                            return (
                                <React.Fragment key={col.id}>
                                    {
                                        this.lineBetweenColumns && index > 0 && (
                                            <ColumnDivider
                                                data-testid="line-between-columns"
                                                lineColorBetweenColumns={this.lineColorBetweenColumns}
                                                lineWidthBetweenColumns={this.lineWidthBetweenColumns}
                                                colGap={this.gapBetweenColumns / 2}
                                                orientation={isNextLine ? Orientation.Horizontal : Orientation.Vertical}
                                            />
                                        )
                                    }
                                    <ColumnDiv
                                        key={col.id}
                                        width={col.targetWidth}
                                        widthUnit={col.widthUnit}
                                        minWidth={col.minSizePx}
                                        maxWidth={col.maxSizePx}
                                        colGap={this.gapBetweenColumns / 2}
                                        minHeight={col.getControls().length > 0 ? 1 : 75}
                                        padding={col.getInnerMargin() || this.defaultInnerColumnMargin || this.getFormContext()?.form?.defaultInnerColumnMargin}
                                        backgroundColor={col.backgroundColor() || this.defaultColumnBackgroundColor || this.getFormContext()?.form?.defaultContainerBackgroundColor}
                                        hasBorder={
                                            col.hasOwnBorder()
                                            || (col.overrideFormBorderSettings === DefaultOnOff.DEFAULT && this.defaultShowColumnBorder)
                                        }
                                        borderColor={col.borderColor() || this.defaultColumnBorderColor || this.getFormContext()?.form?.defaultContainerBorderColor}
                                        borderStyle={col.borderStyle()  || this.defaultColumnBorderStyle || this.getFormContext()?.form?.defaultContainerBorderStyle}
                                        borderWidth={col.borderWidth() || this.defaultColumnBorderWidth || this.getFormContext()?.form?.defaultContainerBorderWidth}
                                        borderRadius={col.borderRadius() || this.defaultColumnBorderRadius || this.getFormContext()?.form?.defaultContainerBorderRadius || this.getFormContext()?.form?.defaultContainerBorderRadius}
                                        lineBetweenColumns={this.lineBetweenColumns}
                                    >
                                        <StackContainerDiv>
                                            {col.getControls().map((control, index ) => {
                                                return (
                                                    <StackContainerColumn
                                                        colGap={col.interControlSpacing || this.interControlSpacing || this.getFormContext()?.form?.defaultInterControlSpacing}
                                                        key={index}
                                                    >
                                                        {control.render()}
                                                    </StackContainerColumn>
                                                );
                                            })}
                                        </StackContainerDiv>
                                        {col.getControls().length === 0 && mode !== FormMode.Runtime && this.renderEmptyControlDiv(this.gapBetweenColumns, 'Add controls in the form design tab')}
                                    </ColumnDiv>
                                </React.Fragment>
                            );
                        })
                    }
                    </RowDiv>
                </ContainerDiv>
            );
        }

    }


    getStorageData(): object {
        let retData = DataUtilities.cloneWithoutReact(this, ['columns', 'form', 'container', '_formContext']);

        let colData : object[] = [];
        this.columns.map(c => {
            colData.push(c.getStorageData());
            return c;
        });

        Reflect.set(retData, '__columns', colData);

        return retData;
    }

    setStorageData(data: object): void {
        DataUtilities.spreadData(this, data, ['__columns']);

        let containerArray = Reflect.get(data, '__columns');
        if (containerArray && containerArray instanceof Array && containerArray.length !== 0) {
            for (let container of containerArray) {
                let val = new XColumnContainerColumn();
                let control = val as XColumnContainerColumn;

                control.setFormContext(this.getFormContext()) ;

                control.setStorageData(container);
                this.columns.push(control);

            }
        }

    }

    setOrder(id: string, order: number): void {
    }

    getControls(): XBaseControl[] {
        let controls : XBaseControl[] = [];
        for (let col of this.columns) {
            controls.push(...col.getControls());
        }
        return controls;
    }

    renderEditUI(): JSX.Element {
        return (
            <ChildFullWidthDiv>
                <PropertyEditorBoolean
                    editObject={this}
                    label={"Line Between Columns"}
                    propertyName="lineBetweenColumns"
                    updateCallback={this.controlUpdate}
                />
                <Collapse in={this.lineBetweenColumns}>
                    <PropertyEditorColor
                        editObject={this}
                        label={"Line Color Between Columns"}
                        propertyName="lineColorBetweenColumns"
                        updateCallback={this.controlUpdate}
                        parentDefaultValue={FormDesignConstants.LINE_COLOR_BETWEEN_COLUMNS}
                    />
                    <PropertyEditorInteger
                        editObject={this}
                        label={"Line Width Between Columns"}
                        propertyName="lineWidthBetweenColumns"
                        updateCallback={this.controlUpdate}
                        parentDefaultValue={FormDesignConstants.LINE_WIDTH_BETWEEN_COLUMNS}
                    />
                </Collapse>
                
                <PropertyEditorInteger
                    editObject={this}
                    label={"Gap Between Columns"}
                    propertyName="gapBetweenColumns"
                    updateCallback={this.controlUpdate}
                    parentDefaultValue={FormDesignConstants.GAP_BETWEEN_COLUMNS}
                />
                <PropertyEditorInteger
                    editObject={this}
                    label={"Gap Between Controls"}
                    propertyName="interControlSpacing"
                    updateCallback={this.controlUpdate}
                    parentDefaultValue={this.getFormContext()?.form?.defaultInterControlSpacing}
                />
                <PropertyEditorInteger
                    editObject={this}
                    label="Inner Margin"
                    propertyName={"paddingBetweenContainerAndColumns"}
                    updateCallback={this.controlUpdate}
                    parentDefaultValue={this.getFormContext()?.form?.defaultInnerContainerMargin}
                />

                <PropertyEditorColor
                    editObject={this}
                    label="Container Color"
                    propertyName="containerBackgroundColor"
                    updateCallback={this.controlUpdate}
                    parentDefaultValue={this.getFormContext()?.form?.defaultContainerBackgroundColor}
                />

                <PropertyEditorInteger
                    editObject={this}
                    label="(Default) Inner Column Margin"
                    propertyName="defaultInnerColumnMargin"
                    updateCallback={this.controlUpdate}
                    parentDefaultValue={this.getFormContext()?.form?.defaultInnerColumnMargin}
                />

                <PropertyEditorColor
                    editObject={this}
                    label="(Default) Column Color"
                    propertyName="defaultColumnBackgroundColor"
                    updateCallback={this.controlUpdate}
                />

                {
                    this.renderBorderConfigUI()
                }

                <PropertyEditorBoolean
                    editObject={this}
                    label="Show Columns Border"
                    propertyName="defaultShowColumnBorder"
                    updateCallback={this.controlUpdate}
                />

                <Collapse in={this.defaultShowColumnBorder}>
                    <ChildFullWidthDiv>
                        <PropertyEditorInteger
                            editObject={this}
                            label="Columns Border Width"
                            propertyName="defaultColumnBorderWidth"
                            updateCallback={this.controlUpdate}
                            parentDefaultValue={this.getFormContext()?.form?.defaultContainerBorderWidth}
                        />
                        <PropertyEditorInteger
                            editObject={this}
                            label="Columns Border Radius"
                            propertyName="defaultColumnBorderRadius"
                            updateCallback={this.controlUpdate}
                            parentDefaultValue={this.getFormContext()?.form?.defaultContainerBorderRadius}
                        />
                        <PropertyEditorColor
                            editObject={this}
                            label="Columns Border Color"
                            propertyName="defaultColumnBorderColor"
                            updateCallback={this.controlUpdate}
                            parentDefaultValue={this.getFormContext()?.form?.defaultContainerBorderColor}
                        />
                        <PropertyEditorSelect
                            editObject={this}
                            label="Columns Border Style"
                            propertyName="defaultColumnBorderStyle"
                            updateCallback={this.controlUpdate}
                            options={FormDesignConstants.BORDER_STYLES}
                            parentDefaultValue={this.getFormContext()?.form?.defaultContainerBorderStyle}
                        />
                    </ChildFullWidthDiv>
                    
                </Collapse>


                <PropertyEditorList
                    label="Columns"
                    list={this.columns.map((col, idx) => ({name: `Columns ${idx + 1}`, item: col}))}
                    showDialogCancel={false}
                    itemUI={(item: {index: number, content?: XColumnContainerColumn | null}) => ({
                      onComplete : (item: {index: number, content: XColumnContainerColumn | null}) => {
                        if (item.content) {
                            Reflect.set(this.columns, item.index, item.content);
                        } else {
                            this.columns.splice(item.index, 1);
                        }
                        this.controlUpdate();
                      },
                      onCancel: () => {
                        delete item.content;
                        // this.designerUpdate();
                      },
                      ui: (
                          <ChildFullWidthDiv>
                              {
                                  item.content && <>
                                    <PropertyEditorInteger
                                        editObject={item.content}
                                        label="Min Width Pixels"
                                        propertyName="minSizePx"
                                        updateCallback={this.controlUpdate}
                                    />
                                    <PropertyEditorInteger
                                        editObject={item.content}
                                        label="Max Width Pixels"
                                        propertyName="maxSizePx"
                                        updateCallback={this.controlUpdate}
                                    />
                                    <PropertyEditorInteger
                                        editObject={item.content}
                                        label="Width"
                                        propertyName="targetWidth"
                                        updateCallback={this.controlUpdate}
                                    />
                                    <PropertyEditorSelect
                                        editObject={item.content}
                                        label="Width Unit"
                                        propertyName="widthUnit"
                                        options={[WidthUnitInterface.PERCENTAGE, WidthUnitInterface.PIXEL]}
                                        updateCallback={this.controlUpdate}
                                    />
                                    <PropertyEditorInteger
                                        editObject={item.content}
                                        label="Inner Column Margin"
                                        propertyName="innerMargin"
                                        updateCallback={this.controlUpdate}
                                    />

                                    <PropertyEditorInteger
                                        editObject={item.content}
                                        label="Gap Between Controls"
                                        propertyName="interControlSpacing"
                                        updateCallback={this.controlUpdate}
                                        parentDefaultValue={this.getFormContext()?.form?.defaultInterControlSpacing}
                                    />

                                    <PropertyEditorOptionWithButtonGroup
                                        editObject={item.content}
                                        label="Override Border Settings"
                                        propertyName="overrideFormBorderSettings"
                                        updateCallback={this.controlUpdate}
                                    />

                                    <Collapse in={item.content.overrideFormBorderSettings === DefaultOnOff.On}>
                                        <ChildFullWidthDiv>
                                            <PropertyEditorInteger
                                                editObject={item.content}
                                                label="Border Width"
                                                propertyName="columnBorderWidth"
                                                updateCallback={this.controlUpdate}
                                                // parentDefaultValue={this.formContext?.form?.defaultContainerBorderWidth}
                                            />
                                            <PropertyEditorInteger
                                                editObject={item.content}
                                                label="Border Radius"
                                                propertyName="containerBorderRadius"
                                                updateCallback={this.controlUpdate}
                                                // parentDefaultValue={this.formContext?.form?.defaultContainerBorderRadius}
                                            />
                                            
                                            <PropertyEditorColor
                                                editObject={item.content}
                                                label="Border Color"
                                                propertyName="columnBorderColor"
                                                updateCallback={this.controlUpdate}
                                            />
                                            <PropertyEditorSelect
                                                editObject={item.content}
                                                label="Border Style"
                                                propertyName="columnBorderStyle"
                                                updateCallback={this.controlUpdate}
                                                options={FormDesignConstants.BORDER_STYLES}
                                            />
                                        </ChildFullWidthDiv>
                                    </Collapse>

                                    <PropertyEditorColor
                                        editObject={item.content}
                                        label="Column Background Color"
                                        propertyName="containerBackgroundColor"
                                        updateCallback={this.controlUpdate}
                                    />
                                  </>
                              }
                            
                          </ChildFullWidthDiv>
                      )
                    })}
                    prototype={() => new XColumnContainerColumn()}
                />
            </ChildFullWidthDiv>
        )
    }
}
