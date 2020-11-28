import React from "react";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import {Meta, Story} from "@storybook/react/types-6-0";
import {XFormDesigner} from "./../XFormDesigner";
import {XFormConfiguration} from "./../XFormConfiguration";
import {XUserForm} from "../XUserForm";
import {XTextField} from "../Controls/XTextField";
import {XStackContainer} from "./XStackContainer";
import {BorderStyle} from "../FormDesignConstants";
import { DefaultOnOff } from "../Utilities/DefaultOnOff";


export interface XFormDesignerProps {
    form: XFormConfiguration;
}

export default {
    title: "Form Designer/Layout/Stack",
    component: XFormDesigner,
} as Meta;

const Template: Story<XFormDesignerProps> = (args) => <XUserForm {...args} />;

const MissingTemplate: Story<{}> = () => (
    <div>
        Missing
    </div>
);

function getUI() : {form: XFormConfiguration, container: XStackContainer} {
    let ui = new XFormConfiguration();
    let columnContainer = new XStackContainer();
// show border so we can see
    columnContainer.overrideFormBorderSettings = DefaultOnOff.On;
    columnContainer.showContainerBorder = true;

    columnContainer.add(new XTextField());
    columnContainer.add(new XTextField());
    columnContainer.add(new XTextField());
    ui.add(columnContainer);

    return {form: ui, container : columnContainer};
}

let ui = getUI();

export const ControlStack = Template.bind({}, {form: ui.form});

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

