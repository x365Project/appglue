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
import { ContainerDivider, ContainerDiv } from "../../CommonUI/CommonStyles";
import { XContainerDesignWrapper } from "../Utilities/XContainerDesignWrapper";
import { Droppable, DroppableProvided, DroppableStateSnapshot } from "react-beautiful-dnd";
import { TabPanel, TabContext, TabList } from "@material-ui/lab";
import { FormContext } from "../Utilities/FormContext";
import { AutoBind } from "../../Common/AutoBind";
import { StateManager } from "../../CommonUI/StateManagement/StateManager";
import { TextIcon } from "../../CommonUI/TextIcon";
import { ObserveState } from "../../CommonUI/StateManagement/ObserveState";
import { DataUtilities } from "../../Common/DataUtilities";


const TabContainerWrapper = styled("div")<{
    border?: string;
}>`
    border: ${props => props.border || 'none'};
`;

const StyledTab = styled(Tab)`
    && {
        padding: 0;
    }
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

const TabContentWrapper = styled("div")<{
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
    width: 100%;
`;

export class XTabContainerTabHeader {
    icon: JSX.Element | null = null;
    title: string = '';
    tab?: XTabContainerTab;

    getStorageData(): object {
        return DataUtilities.cloneWithoutReact(this, ['tab', '_formContext', '_formRuntimeContext']);
    }

    setStorageData(data: object): void {
        DataUtilities.spreadData(this, data, []);
    }
    
}

export class XTabContainerTabContent extends XBaseControl {

    containers: XBaseContainer[] = [];

    tab?: XTabContainerTab;

    getControls = () => {
        return this.containers.map(c => c.getControls()).reduce((controls, cur) => [...controls, ...cur], []);
    }

    find(id: string) {
        if (this.containers.length === 0) return null;

        for (let c of this.containers) {
            if (c.id === id) return c;
            let res = c.find(id);
            if (res) return res;
        }
        return null;
    }

    add(container: XBaseContainer, index?: number) {
        if (!index) {
            this.containers.push(container);
        } else {
            this.containers.splice(index, 0, container)
        }
        if (this.getFormContext()) {
            container.setFormContext(this.getFormContext());
        }
    }

    remove(control: XBaseControl) {
        for (let c of this.containers) {
            c.remove(control);
        }
    }

    setFormContext(value: FormContext | undefined) : void {
        if (!value)
            throw 'cannot set edit context to null (base control)';

        super.setFormContext(value);
        for (let c of this.containers) {
            c.setFormContext(value);
        }
    }

    getFormMode(): FormMode | string {
        return this.getFormContext()!.mode || FormMode.Runtime;
    }

    getStorageData(): object {
        let resData = DataUtilities.cloneWithoutReact(this, ['tab', 'containers', '_formContext', '_formRuntimeContext']);
        let containers = [];
        for (let c of this.containers) {
            containers.push(c.getStorageData());
        }
        Reflect.set(resData, '__tabs', containers);
        return resData;
    }

	setStorageData(data: object): void {
		DataUtilities.spreadData(this, data, ['__containers']);

		this.containers = [];
		let containerArray = Reflect.get(data, '__containers');

		let editContext = this.getFormContext();

		if (containerArray && containerArray instanceof Array && containerArray.length !== 0) {
			for (let container of containerArray) {
				let typeName = Reflect.get(container, '__type');

				if (typeName) {
					let registeredControl = UIControlRegistration[typeName];
					let val = new registeredControl.prototype.constructor();
					// @ts-ignore
					let control = val as XBaseContainer;

					if (editContext)
						control.setFormContext(editContext);

					control.setStorageData(container);
					this.containers.push(control);
				}
			}
		}
	}

    @AutoBind
    render() {
        let gap = 0;

        if (this.getFormMode() === FormMode.LayoutDesign) {
            return (
                <Droppable droppableId={`tab___${this.tab!.id}___${this.tab!.value}`} key={this.tab!.id}>
                    {
                        (provided: DroppableProvided, snapShot: DroppableStateSnapshot) => {
                            return (
                                <div
                                    ref={provided.innerRef}
                                    style={{position: 'relative', minHeight: 75}}
                                    {...provided.droppableProps}
                                >
                                    {
                                        this.containers.map((c, idx) => (
                                            <React.Fragment key={c.id}>
                                                {/* {
                                                    this.showLinesBetweenContainers && idx !== 0 &&
                                                    <ContainerDivider
                                                        data-testid="line-between-containers"
                                                        lineColorBetweenContainers={this.defaultLineBetweenContainerColor}
                                                        lineStyleBetweenContrainers={this.defaultLineBetweenContainerStyle}
                                                        lineWidthBetweenContainers={this.defaultLineBetweenContainerWidth}
                                                        colGap={gap}
                                                    />
                                                } */}
                                                <ContainerDiv colGap={gap}>
                                                    <XContainerDesignWrapper
                                                        id={c.id}
                                                        index={idx}
                                                        innerComponent={c}
                                                        editContext={this.tab!.getFormContext()!}
                                                    />
                                                </ContainerDiv>
                                            </React.Fragment >
                                        ))
                                    }
                                    {provided.placeholder}
                                </div>
                            )
                        }
                    
                    }
                </Droppable>
            )
        } else {
            return <div style={{position: 'relative', minHeight: 75}}>
                {
                    this.containers.map((c, idx) => (
                        <React.Fragment key={c.id}>
                            {/* {
                                this.showLinesBetweenContainers && idx !== 0 &&
                                <ContainerDivider
                                    data-testid="line-between-containers"
                                    lineColorBetweenContainers={this.defaultLineBetweenContainerColor}
                                    lineStyleBetweenContrainers={this.defaultLineBetweenContainerStyle}
                                    lineWidthBetweenContainers={this.defaultLineBetweenContainerWidth}
                                    colGap={gap}
                                />
                            } */}
                            <ContainerDiv colGap={gap}>
                                <XContainerDesignWrapper
                                    id={c.id}
                                    index={idx}
                                    innerComponent={c}
                                    editContext={this.tab!.getFormContext()!}
                                />
                            </ContainerDiv>
                        </React.Fragment >
                    ))
                }
            </div>
        }

    }

    getDesignValidationIssues(): ValidationIssue[] {
        throw new Error("Method not implemented.");
    }
    getRuntimeValidationIssues(): ValidationIssue[] {
        throw new Error("Method not implemented.");
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

    defaultTabContentHeight: number | null = null;
    defaultTabContentWidth: number | null = null;

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
        }

        return (
            <TabContainerWrapper>
                <ObserveState
                    listenTo={this}
                    control={() => (
                        <TabContext value={this.selectedValue}>
                            <TabList
                                orientation={this.orientation}
                                onChange={this.handleChange}
                            >
                                {
                                    this.tabs.map((t) => {
                                        return <StyledTab value={t.value} key={t.id} label={
                                            <TabHeaderWrapper>
                                                {t.header!.title}
                                            </TabHeaderWrapper>
                                        } />
                                    })
                                }
                            </TabList>
                            <div style={styles}>
                                {
                                    this.tabs.map((t) => {
                                        return <StyledTabPanel value={t.value} key={t.id}>
                                            <TabContentWrapper>
                                            {
                                                t.content!.render()
                                            }
                                            </TabContentWrapper>
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