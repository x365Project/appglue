import React from "react";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from "@storybook/react/types-6-0";
import { XFormDesigner } from "../XFormDesigner";
import { XFormConfiguration } from "../XFormConfiguration";
import { getFormConfig } from "../Testing/FormTestData";

let ui = getFormConfig();

export interface XFormDesignerProps {
    form: XFormConfiguration;
}


export default {
    title: "Form Designer/Designer",
    component: XFormDesigner,
} as Meta;

const Template: Story<XFormDesignerProps> = (args) => <XFormDesigner {...args} />;

const MissingTemplate: Story<{}> = () => (
    <div>
        Missing
    </div>
);


export const AllControls = Template.bind({}, {form: ui});

ui = new XFormConfiguration()

export const NoControls = Template.bind({}, {form: ui});

ui = new XFormConfiguration();

export const FormTitle = Template.bind({}, {form: ui, formName: 'Test Form'});

ui = new XFormConfiguration();
export const SaveButton = Template.bind({}, {form: ui, onFormSave: (data: any) => {}});

ui = getFormConfig();
ui.doNotScrollLastContainerOnForm = true;
ui.doNotScrollFirstContainerOnForm = true;

export const PinnedSections = Template.bind({}, {form: ui});

ui = new XFormConfiguration();
export const CloseXAction = Template.bind({}, {form: ui, onFormClose: (data: any) => {}});

export const BringUpInDialogByButton = MissingTemplate.bind({}, {form: ui});
