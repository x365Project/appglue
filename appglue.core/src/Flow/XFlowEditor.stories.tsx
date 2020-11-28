import React from "react";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import {Meta, Story} from "@storybook/react/types-6-0";
import {FlowEditorParameters, XFlowEditor} from "./XFlowEditor";
import {getFlowWithNoSteps, getFlowWithSteps} from "./Testing/TestDataSetup";

export default {
    title: "Flow Designer/Designer",
    parameters: {
    }
} as Meta;

let flow = getFlowWithNoSteps();

const TestTemplate: Story<FlowEditorParameters> = (args) => <XFlowEditor {...args} />;

export const EmptyDesigner = TestTemplate.bind({},{flow: flow});

flow = getFlowWithSteps();

const TestTemplateWithSteps: Story<FlowEditorParameters> = (args) => <XFlowEditor {...args} />;

export const WithStepsEmptyDesigner = TestTemplateWithSteps.bind({},{flow: flow});
