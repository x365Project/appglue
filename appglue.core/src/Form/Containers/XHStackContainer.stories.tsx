import React from "react";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import {Meta, Story} from "@storybook/react/types-6-0";
import {XFormDesigner} from "./../XFormDesigner";
import {XFormConfiguration} from "./../XFormConfiguration";
import {XUserForm} from "../XUserForm";
import {XTextField} from "../Controls/XTextField";
import {BorderStyle} from "../FormDesignConstants";
import {HStackAlignment, XHStackContainer} from "./XHStackContainer";
import {XButton} from "../Controls/XButton";
import { DefaultOnOff } from "../Utilities/DefaultOnOff";


export interface XFormDesignerProps {
    form: XFormConfiguration;
}

export default {
    title: "Form Designer/Layout/HorizontalStack",
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
    let columnContainer = new XHStackContainer();
// show border so we can see
    columnContainer.overrideFormBorderSettings = DefaultOnOff.On;
    columnContainer.showContainerBorder = true;

    let b = new XButton();
    b.label = 'Save'
    let b2 = new XButton();
    b2.label = 'Cancel'
    columnContainer.add(b);
    columnContainer.add(b2);
    ui.add(columnContainer);

    return {form: ui, container : columnContainer};
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
ui.container.containerBorderColor = 'red';
ui.container.containerBorderRadius = 50;
ui.container.containerBorderStyle = BorderStyle.Dashed;
ui.container.containerBorderWidth = 10;

export const OverrideBorder = Template.bind({}, {form: ui.form});

ui = getUI();
ui.container.containerBackgroundColor = 'blue';


export const OverrideColor = Template.bind({}, {form: ui.form});

ui = getUI();
ui.container.interControlSpacing = 30;
ui.container.innerMargin = 30;

export const OverrideSpacing = Template.bind({}, {form: ui.form});

