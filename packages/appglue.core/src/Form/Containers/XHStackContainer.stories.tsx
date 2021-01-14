import React from "react";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import {Meta, Story} from "@storybook/react/types-6-0";
import {XFormDesigner} from "./../XFormDesigner";
import {XFormConfiguration} from "./../XFormConfiguration";
import {XUserForm} from "../XUserForm";
import {XTextField} from "../Controls/XTextField";
import {BorderStyle} from "../FormDesignConstants";
import {HStackAlignment, XHStackContainer, HStackVerticalAlignment} from "./XHStackContainer";
import {XButton} from "../Controls/XButton";
import { DefaultOnOff } from "../Utilities/DefaultOnOff";
import { XTextArea } from "../Controls/XTextArea";


export interface XFormDesignerProps {
    form: XFormConfiguration;
}

export default {
    title: "Form Designer/Layout/Horizontal Stack",
    component: XFormDesigner,
} as Meta;

const Template: Story<XFormDesignerProps> = (args) => <XUserForm {...args} />;

const MissingTemplate: Story<{}> = () => (
    <div>
        Missing
    </div>
);

function getUI() : {form: XFormConfiguration, container: XHStackContainer} {
    let ui = new XFormConfiguration();
    let hstackContainer = new XHStackContainer();
    // show border so we can see
    hstackContainer.overrideFormBorderSettings = DefaultOnOff.On;

    let b = new XButton();
    b.label = 'Save'
    let b2 = new XButton();
    b2.label = 'Cancel'
    hstackContainer.add(b);
    hstackContainer.add(b2);
    hstackContainer.add(new XTextArea());
    ui.add(hstackContainer);

    return {form: ui, container : hstackContainer};
}

let ui = getUI();
export const Left = Template.bind({}, {form: ui.form});

ui = getUI();
ui.container.alignment = HStackAlignment.CENTER;

export const Center = Template.bind({}, {form: ui.form});

ui = getUI();
ui.container.alignment = HStackAlignment.RIGHT;

export const Right = Template.bind({}, {form: ui.form});

ui = getUI();
ui.container.verticalAlignment = HStackVerticalAlignment.TOP;
export const Top = Template.bind({}, {form: ui.form});

ui = getUI();
ui.container.verticalAlignment = HStackVerticalAlignment.MIDDLE;
export const Middle = Template.bind({}, {form: ui.form});

ui = getUI();
ui.container.verticalAlignment = HStackVerticalAlignment.BOTTOM;
export const Bottom = Template.bind({}, {form: ui.form});

ui = getUI();
ui.container.containerBorderColor = 'red';
ui.container.containerBorderRadius = 50;
ui.container.containerBorderStyle = BorderStyle.Dashed;
ui.container.containerBorderWidth = 10;

export const OverrideBorder = Template.bind({}, {form: ui.form});

ui = getUI();
ui.container.containerBackgroundColor = 'blue';
export const OverrideBackgroundColor = Template.bind({}, {form: ui.form});

ui = getUI();
ui.container.interControlSpacing = 30;
ui.container.innerMargin = 30;

export const OverrideSpacing = Template.bind({}, {form: ui.form});

ui = getUI();
ui.container.overrideFormBorderSettings = DefaultOnOff.DEFAULT;
ui.form.defaultContainerBorderColor = '#f00';
ui.form.defaultShowContainerBorder = true;
export const BroderFromForm = Template.bind({}, {form: ui.form});


ui = getUI();
ui.form.defaultContainerBackgroundColor = '#ff0';
export const BackgroundFromForm = Template.bind({}, {form: ui.form});

ui = getUI();
ui.form.runtimeWidth = 375;
export const ThinAndStackControls = Template.bind({}, {form: ui.form});

let form = new XFormConfiguration();
form.defaultContainerBorderColor = "#0f0";
form.defaultShowContainerBorder = true;
form.add(new XHStackContainer());
export const PlaceholderInRuntime = Template.bind({}, {form});