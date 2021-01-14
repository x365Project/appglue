import React from "react";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import {Meta, Story} from "@storybook/react/types-6-0";
import {XFormDesigner} from "./../XFormDesigner";
import {XFormConfiguration} from "./../XFormConfiguration";
import {XUserForm} from "../XUserForm";
import {XTextField} from "../Controls/XTextField";
import {XTabContainer, XTabContainerTab, XTabContainerTabContent, XTabContainerTabHeader} from "./XTabContainer";
import {BorderStyle, TabOrientation} from "../FormDesignConstants";
import { DefaultOnOff } from "../Utilities/DefaultOnOff";


export interface XFormDesignerProps {
    form: XFormConfiguration;
}

export default {
    title: "Form Designer/Layout/Tab Container",
    component: XFormDesigner,
} as Meta;

const Template: Story<XFormDesignerProps> = (args) => <XUserForm {...args} />;

function getUI() : {form: XFormConfiguration, container: XTabContainer} {
    let ui = new XFormConfiguration();
    let tabContainer = new XTabContainer();

    let tabContainerTab = new XTabContainerTab();

    tabContainer.overrideFormBorderSettings = DefaultOnOff.On;

    let tabContainerTabContent = new XTabContainerTabContent();
    let tabContainerTabHeader = new XTabContainerTabHeader();

    tabContainerTabHeader.title = 'Test 1';
    tabContainerTab.setContent(tabContainerTabContent);
    tabContainerTab.setHeader(tabContainerTabHeader);

    let tabContainerTab2 = new XTabContainerTab();
    let tabContainerTabContent2 = new XTabContainerTabContent();
    let tabContainerTabHeader2 = new XTabContainerTabHeader();
    tabContainerTabHeader2.title = 'Test 2';
    tabContainerTab2.setContent(tabContainerTabContent2);
    tabContainerTab2.setHeader(tabContainerTabHeader2);

    tabContainer.addTab(tabContainerTab);
    tabContainer.addTab(tabContainerTab2);

    ui.add(tabContainer);

    return {form: ui, container : tabContainer};
}

let ui = getUI();

export const EmptyTab = Template.bind({}, {form: ui.form});

ui.container.add(new XTextField())
ui.container.add(new XTextField())
ui.container.add(new XTextField())
export const ControlTabContrainter = Template.bind({}, {form: ui.form});

ui = getUI();

ui.container.selectedValue = 'test2';

ui.container.add(new XTextField())
ui.container.add(new XTextField())
ui.container.add(new XTextField())
export const SecondTab = Template.bind({}, {form: ui.form});

ui = getUI();
ui.container.orientation = TabOrientation.Veritical;

ui.container.add(new XTextField())
ui.container.add(new XTextField())
ui.container.add(new XTextField())
export const Vertical = Template.bind({}, {form: ui.form});

ui = getUI();
ui.container.fullWidth = true;

ui.container.add(new XTextField())
ui.container.add(new XTextField())
ui.container.add(new XTextField())
export const FullWidth = Template.bind({}, {form: ui.form});

ui = getUI();
ui.container.centered = true;

ui.container.add(new XTextField())
ui.container.add(new XTextField())
ui.container.add(new XTextField())
export const Centered = Template.bind({}, {form: ui.form});


ui = getUI();
ui.container.containerBorderColor = 'red';
ui.container.containerBorderRadius = 50;
ui.container.containerBorderStyle = BorderStyle.Dashed;
ui.container.containerBorderWidth = 10;
export const OverrideBorder = Template.bind({}, {form: ui.form});

ui = getUI();
ui.container.interControlSpacing = 30;
ui.container.innerMargin = 30;

ui.container.add(new XTextField())
ui.container.add(new XTextField())
ui.container.add(new XTextField())

export const OverrideSpacing = Template.bind({}, {form: ui.form});

ui = getUI();
ui.container.innerMarginTabHeader = 30;

ui.container.add(new XTextField())
ui.container.add(new XTextField())
ui.container.add(new XTextField())

export const HeaderMargin = Template.bind({}, {form: ui.form});


ui = getUI();
ui.container.defaultTabContentBackground = 'gray';

export const DefaultContentBackground = Template.bind({}, {form: ui.form});

ui = getUI();
ui.container.defaultShowContentBorder = true;


export const DefaultContentBorder = Template.bind({}, {form: ui.form});


ui = getUI();
ui.container.defaultShowContentBorder = true;
ui.container.tabs[0].content!.overrideFormBorderSettings = DefaultOnOff.On;
ui.container.tabs[0].content!.contentBorderWidth = 2;
ui.container.tabs[0].content!.contentBorderColor = 'red';

export const OverrideContentBorder = Template.bind({}, {form: ui.form});

ui = getUI();
ui.container.defaultShowContentBorder = true;
ui.container.tabs[0].content!.innerMargin = 30;

export const OverrideContentInnerMargin = Template.bind({}, {form: ui.form});

ui = getUI();
ui.container.defaultTabContentBackground = 'gray';
ui.container.tabs[0].content!.contentBackgroundColor = 'lightgray';

export const OverrideContentBackground = Template.bind({}, {form: ui.form});