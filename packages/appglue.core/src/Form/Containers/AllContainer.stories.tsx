import React from "react";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import {Meta, Story} from "@storybook/react/types-6-0";
import {XFormDesigner} from "./../XFormDesigner";
import {XFormConfiguration} from "./../XFormConfiguration";
import {getFormConfig} from "../Testing/FormTestData";
import {XUserForm} from "../XUserForm";
import {BorderStyle} from "../FormDesignConstants";
import { DefaultOnOff } from "../Utilities/DefaultOnOff";


export interface XFormDesignerProps {
    form: XFormConfiguration;
}

export default {
    title: "Form Designer/Layout/All",
    component: XFormDesigner,
} as Meta;

const Template: Story<XFormDesignerProps> = (args) => <XUserForm {...args} />;

const MissingTemplate: Story<{}> = () => (
    <div>
        Missing
    </div>
);

let ui = getFormConfig();
export const DefaultLayout = Template.bind({}, {form: ui});

ui = getFormConfig();
ui.formBackgroundColor = 'red';

export const FormBackgroundColor = Template.bind({}, {form: ui});

ui = getFormConfig();
ui.defaultShowContainerBorder = true;
ui.gapBetweenContainers = 100;

export const InterLayoutSpace = Template.bind({}, {form: ui});

ui = getFormConfig();
ui.defaultShowContainerBorder = true;
ui.defaultInterControlSpacing = 50;

export const InterControlSpace = Template.bind({}, {form: ui});

ui = getFormConfig();
ui.formBackgroundColor = 'red';
ui.defaultShowContainerBorder = true;
ui.defaultInnerContainerMargin = 100;

export const InnerMargin = Template.bind({}, {form: ui});

ui = getFormConfig();
ui.defaultInnerColumnMargin = 50;

export const InnerColumnMargin = Template.bind({}, {form: ui});

ui = getFormConfig();
ui.defaultShowContainerBorder = true;
ui.defaultContainerBorderColor = 'black';

export const DefaultBorders = Template.bind({}, {form: ui});

ui = getFormConfig();
ui.defaultShowContainerBorder = true;
ui.defaultContainerBorderStyle = BorderStyle.Dashed;

export const DefaultBordersDashed = Template.bind({}, {form: ui});

ui = getFormConfig();
ui.showLinesBetweenContainers = true;

export const LineBetweenLayouts = Template.bind({}, {form: ui});

ui = getFormConfig();
ui.defaultShowContainerBorder = true;
ui.defaultContainerBorderColor = 'black';
ui.getContainers()[0].overrideFormBorderSettings = DefaultOnOff.On;
ui.getContainers()[0].showContainerBorder = true;
ui.getContainers()[0].containerBorderColor = 'red';

export const OverrideDefaultsInOneContainer = Template.bind({}, {form: ui});

ui = getFormConfig();
ui.defaultShowContainerBorder = true;
ui.defaultContainerBorderColor = 'black';
ui.getContainers()[0].overrideFormBorderSettings = DefaultOnOff.On;
ui.getContainers()[0].showContainerBorder = false;

export const TurnOffBorderInOneContainer = Template.bind({}, {form: ui});