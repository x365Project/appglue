import styled from "styled-components";
import React from "react";
import {ControlType, RegisterUIControl, UIControlRegistration} from "../Utilities/RegisterUIControl";
import {XBaseContainer} from "./XBaseContainer";
import {FormMode, BorderStyle, FormDesignConstants, TabOrientation} from "../FormDesignConstants";
import { PropertyEditorInteger } from "../../CommonUI/PropertyEditing/PropertyEditorInteger";
import { PropertyEditorColor } from "../../CommonUI/PropertyEditing/PropertyEditorColor";
import { XBaseControl } from "../Controls/XBaseControl";
import { ValidationIssue } from "../../Common/IDesignValidationProvider";
import Tab from "@material-ui/core/Tab";
import { Droppable, DroppableProvided, DroppableStateSnapshot } from "react-beautiful-dnd";
import { TabPanel, TabContext, TabList } from "@material-ui/lab";
import { FormContext } from "../Utilities/FormContext";
import { AutoBind } from "../../Common/AutoBind";
import { StateManager } from "../../CommonUI/StateManagement/StateManager";
import { TextIcon } from "../../CommonUI/TextIcon";
import { ObserveState } from "../../CommonUI/StateManagement/ObserveState";
import { DataUtilities } from "../../Common/DataUtilities";
import { XBaseStackContainer } from "./XBaseStackContainer";
import { StackContainerDiv, StackContainerColumn } from "./XStackContainer";
import { XDesignWrapper } from "../Utilities/XDesignWrapper";
import { PropertyEditorSelect } from "../../CommonUI/PropertyEditing/PropertyEditorSelect";
import { ChildFullWidthDiv } from "../Controls/XCommonStyled";
import { Collapse } from "@material-ui/core";
import { DefaultOnOff } from "../Utilities/DefaultOnOff";
import { PropertyEditorList } from "../../CommonUI/PropertyEditing/PropertyEditorList";
import { PropertyEditorBoolean } from "../../CommonUI/PropertyEditing/PropertyEditorBoolean";
import { PropertyEditorText } from "../../CommonUI/PropertyEditing/PropertyEditorText";

const StyledTab = styled(Tab)`
    && {
        padding: 0;
    }
`;

const TabContainerWrapper = styled("div")<{
    padding?: number, 
    hasBorder?: boolean;
    borderColor?: string;
    borderWidth?: number;
    borderRadius?: number;
    borderStyle?: BorderStyle;
    backgroundColor?: string | null;
	minHeight?: number;
	orientation: TabOrientation,
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
	
	${props => props.orientation === TabOrientation.Veritical && `
		display: flex;
	`}
`;

const TabHeaderWrapper = styled("div")<{
    padding?: number;
    hasBorder?: boolean;
    borderColor?: string;
    borderWidth?: number;
    borderRadius?: number;
    borderStyle?: BorderStyle;
    backgroundColor?: string | null;
}>`
    padding: ${props => props.padding || 0}px;
    border: ${props => (
        props.hasBorder 
        ? `${props.borderStyle!.toLowerCase()} ${props.borderWidth}px ${props.borderColor}`
        : 'none'
    )};
    border-radius: ${props => props.borderRadius || 0}px;
`;

const StyledTabPanel = styled(TabPanel)`
    && {
        padding: 0;
    }
`;

export class XTabContainerTabHeader {
    icon: JSX.Element | null = null;
    title: string = '';
    tab?: XTabContainerTab;

    getStorageData(): object {
        return DataUtilities.cloneWithoutReact(this, ['tab']);
    }

    setStorageData(data: object): void {
        DataUtilities.spreadData(this, data, []);
    }
    
}

export class XTabContainerTabContent extends XBaseStackContainer {

    tab?: XTabContainerTab;
    setFormContext(value: FormContext | undefined) : void {
        if (!value)
            throw 'cannot set edit context to null (base control)';

        super.setFormContext(value);
        for (let c of this.controls) {
            c.setFormContext(value);
        }
    }

    getFormMode(): FormMode | string {
        return this.getFormContext()!.mode || FormMode.Runtime;
	}
	
	getStorageData(): object {
        let retData = DataUtilities.cloneWithoutReact(this, ['container', 'form', 'controls', '_formContext', 'tab']);
        Reflect.set(retData, '__controls', this.controls.map(c => {
            return c.getStorageData()
        }));
        return retData;
	}
	
	getInnerControlSpacing(): number | undefined {
		return this.tab!.container!.interControlSpacing
	}


    render() {
        let mode = this.getFormContext()?.mode ?? FormMode.Runtime;

        if (mode === FormMode.FormDesign) {
            return (
                <Droppable
                    droppableId={this.id} key={this.id}>
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
                                                colGap={this.getInnerControlSpacing() || this.getFormContext()?.form?.defaultInterControlSpacing}
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
                                <StackContainerColumn colGap={this.getInnerControlSpacing() || this.getFormContext()?.form?.defaultInterControlSpacing} key={index} id={control.id}>
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
        throw new Error("Method not implemented.");
    }
}


export class XTabContainerTab extends XBaseControl {

    header?: XTabContainerTabHeader;
    content?: XTabContainerTabContent;
    container?: XTabContainer;

    value: string = '';

    getStorageData(): object {
        let resData = DataUtilities.cloneWithoutReact(this, ['_formContext', '_formRuntimeContext', 'header', 'content', 'container'])
        
        Reflect.set(resData, '__header', this.header!.getStorageData());
        Reflect.set(resData, '__content', this.content!.getStorageData());
        return resData;
    }

    setStorageData(data: object): void {
        DataUtilities.spreadData(this, data, ['__header', '__content']);

        let headerData = Reflect.get(data, '__header');

        let header = new XTabContainerTabHeader();
        header.setStorageData(headerData);
        this.setHeader(header);

        let contentData = Reflect.get(data, '__content');
        let content = new XTabContainerTabContent();
        content.setStorageData(contentData);
        this.setContent(content);
    }

    setContainer(container: XTabContainer) {
        this.container = container;
        if (container.getFormContext()) {
            this.setFormContext(container.getFormContext());
        }
    }

    setFormContext(value: FormContext | undefined) : void {
        if (!value)
            throw 'cannot set edit context to null (base control)';

        super.setFormContext(value);
        this.content!.setFormContext(value);
    }

    setContent(content: XTabContainerTabContent) {
        this.content = content;
        this.content.tab = this;

        if (this.getFormContext()) {
            content.setFormContext(this.getFormContext());
        }
    }

    setHeader(header: XTabContainerTabHeader) {
        this.header = header;
        this.header.tab = this;
    }

    find(id: string) {
        return this.content!.find(id);
    }

    add(container: XBaseContainer, index?: number) {
        this.content!.add(container, index);
    }

    getContainer() : XTabContainer | undefined {
        return this.container
    }

    remove(control: XBaseControl) {
        this.content?.remove(control);
    }

    getControls() {
        return this.content!.getControls() || [];
    }

    getDesignValidationIssues(): ValidationIssue[] {
        return [];
    }

    getRuntimeValidationIssues(): ValidationIssue[] {
        return [];
    }

    renderEditUI(): JSX.Element | null{
        return null
    }

}


@RegisterUIControl('Material Controls', 'Tab Container', ControlType.Container, <TextIcon name="T" />)
export class XTabContainer
    extends XBaseContainer {

    orientation: TabOrientation = TabOrientation.Horizontal;

    tabs: XTabContainerTab[] = [];

    selectedValue: string = '';

    interControlSpacing?: number;
    innerMargin? : number = 0;

    innerMarginTabHeader: number = 0;
    minWidthPxTabHeader: number = 0;

    fullWidth: boolean = false;
    centered: boolean = false;

    defaultTabContentHeight: number | null = null;
	defaultTabContentWidth: number | null = null;

	defultTabContentColor: string = '#fff';

    setOrder(id: string, order: number): void {
    }

    setFormContext(value: FormContext | undefined) : void {
        if (!value)
            return;

        super.setFormContext(value);

        if (this.tabs) {
            for (let tab of this.tabs) {
                // set edit context first
                tab.setFormContext( value) ;
            }
        }
    }

    getControls(): XBaseControl[] {
        let controls : XBaseControl[] = [];
        for (let col of this.tabs) {
            controls.push(...col.getControls());
        }
        return controls;
    }

    getCurrentTab(): XTabContainerTab | undefined {
        for (let t of this.tabs) {
            if (t.value === this.selectedValue) {
                return t;
            }
        }
    }


    addTab(tab: XTabContainerTab) {
        if (this.tabs.length === 0) {
            this.selectedValue = tab.value;
        }
        this.add(tab);
    }

    add(control: XBaseControl, index?: number) {

        if (control instanceof XTabContainerTab) {
            let tab = control as XTabContainerTab;
            tab.setContainer(this);
            if (!index) {
                this.tabs.push(tab);
            } else {
                this.tabs.splice(index, 0, tab)
            }
        } else if (control instanceof XBaseContainer) {
            this.getCurrentTab()!.add(control, index);
        }

        if (this.getFormContext())
            control.setFormContext(this.getFormContext()) ;

    }

    remove(control: XBaseControl): void {
        for (let col of this.tabs) {
            col.remove(control);
        }
    }

    find(id: string): XBaseControl | null {
        for (let tab of this.tabs) {
            if (tab.id === id)
                return tab;
            if (tab.content && tab.content.id === id) return tab.content;
            let con = tab.find(id);
            if (con) return con;
        }

        return null;
    }

    getInnerMargin(): number | undefined {
        return this.innerMargin || this.getFormContext()?.form?.defaultInnerContainerMargin;
    }

    getStorageData(): object {
        let resData = DataUtilities.cloneWithoutReact(this, ['_formContext', '_formRuntimeContext', 'tabs'])
        let tabs = []
        for (let t of this.tabs) {
            tabs.push(t.getStorageData());
        }
        Reflect.set(resData, '__tabs', tabs);
        return resData;
    }

    setStorageData(data: object): void {
        DataUtilities.spreadData(this, data, ['__tabs']);

        let tabsArray = Reflect.get(data, '__tabs');
        if (tabsArray && tabsArray instanceof Array && tabsArray.length !== 0) {
            for (let tabData of tabsArray) {
                let tab = new XTabContainerTab();
                
                tab.setStorageData(tabData);
                this.addTab(tab);
            }
        }

    }


    @AutoBind
    handleChange(_event: any, newValue: string) {
        this.selectedValue = newValue;
        StateManager.changed(this);
    }


    render() {
        let mode: FormMode | string = FormMode.Runtime;
        let editContext = this.getFormContext();
        if (editContext)
            mode = editContext.mode;

        let styles: {[key: string]: any} = {};

        if (this.orientation === TabOrientation.Horizontal) {
            styles.height = this.defaultTabContentHeight;

        } else {
			styles.width = this.defaultTabContentWidth;
			styles.flex = 1;
        }

        return (
            <TabContainerWrapper
                padding={this.getInnerMargin()}
                hasBorder={this.hasBorder()}
                borderColor={this.borderColor()}
                borderStyle={this.borderStyle()}
                borderWidth={this.borderWidth()}
                borderRadius={this.borderRadius()}
                backgroundColor={this.backgroundColor()}
				minHeight={this.tabs.length > 0 ? 1 : 75}
				orientation={this.orientation}
            >
                <ObserveState
                    listenTo={this}
                    control={() => (
                        <TabContext value={this.selectedValue}>
                            <TabList
                                orientation={this.orientation}
                                onChange={this.handleChange}
                                variant={this.fullWidth ? 'fullWidth' : 'standard'}
                                centered={this.centered}
                            >
                                {
                                    this.tabs.map((t) => {
                                        return <StyledTab value={t.value || t.header!.title} key={t.id} label={
                                            <TabHeaderWrapper padding={this.innerMarginTabHeader}>
                                                {t.header!.title}
                                            </TabHeaderWrapper>
                                        } />
                                    })
                                }
                            </TabList>
                            <div style={styles}>
                                {
                                    this.tabs.map((t) => {
                                        return <StyledTabPanel value={t.value|| t.header!.title} key={t.id}>
                                            {
                                                t.content!.render()
                                            }
                                        </StyledTabPanel>
                                    })
                                }
                            </div>
                        </TabContext>
                    )}
                />
                
            </TabContainerWrapper>
        )
    }
    renderEditUI(): JSX.Element {
        return (
            <ChildFullWidthDiv>
				<PropertyEditorSelect
					editObject={this}
					label="Orientation"
					propertyName="orientation"
					updateCallback={this.controlUpdate}
					options={FormDesignConstants.TAB_ORIENTATION}
				/>
				<Collapse in={this.orientation === TabOrientation.Horizontal}>
					<ChildFullWidthDiv>
						<PropertyEditorBoolean
							editObject={this}
							label={"Full Width For Tab Headers?"}
							propertyName="fullWidth"
							updateCallback={this.controlUpdate}
						/>
						<PropertyEditorBoolean
							editObject={this}
							label={"Center Tab Headers?"}
							propertyName="centered"
							updateCallback={this.controlUpdate}
						/>
					</ChildFullWidthDiv>
				</Collapse>
                <PropertyEditorInteger  
                    editObject={this}
                    label={"Inner Margin For Tab Header"}
                    propertyName="innerMarginTabHeader"
                    updateCallback={this.controlUpdate}
                    // parentDefaultValue={FormDesignConstants.GAP_BETWEEN_tabs}
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
                    propertyName={"paddingBetweenContainerAndtabs"}
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

                <PropertyEditorColor
                    editObject={this}
                    label="Default Tab Content Color"
                    propertyName="defultTabContentColor"
                    updateCallback={this.controlUpdate}
                />

                {
                    this.renderBorderConfigUI()
                }


                <PropertyEditorList
                    label="Tabs"
                    list={this.tabs.map((col, idx) => ({name: `tabs ${idx + 1}`, item: col}))}
                    showDialogCancel={false}
                    itemUI={(item: {index: number, content?: XTabContainerTab | null}) => ({
                      onComplete : (item: {index: number, content: XTabContainerTab | null}) => {
                        if (item.content) {
                            Reflect.set(this.tabs, item.index, item.content);
                        } else {
                            this.tabs.splice(item.index, 1);
                        }
                        this.controlUpdate();
                      },
                      onCancel: () => {
                        delete item.content;
                      },
                      ui: (
                          <ChildFullWidthDiv>
							{
								item.content && <>
									<PropertyEditorText
										editObject={item.content.header!}
										propertyName="title"
										updateCallback={this.controlUpdate}
										label="Tab Title"
									/>
									<PropertyEditorText
										editObject={item.content}
										propertyName="value"
										updateCallback={this.controlUpdate}
										label="Tab Value"
									/>
								</>
							}
                            
                          </ChildFullWidthDiv>
                      )
                    })}
                    prototype={() => {
                        let tab = new XTabContainerTab()
                        let tabHeader = new XTabContainerTabHeader();
                        let tabContent = new XTabContainerTabContent();
                        tab.setHeader(tabHeader);
						tab.setContent(tabContent);
						return tab;
                    }}
                />
            </ChildFullWidthDiv>
        )
    }
}