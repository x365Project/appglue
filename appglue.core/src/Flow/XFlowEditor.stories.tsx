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


export const WithStepsEmptyDesigner = TestTemplate.bind({},{flow: flow});

flow = getFlowWithNoSteps();

export const AllTopbarControls = TestTemplate.bind({},{
    flow: flow, 
    flowTitle: 'Flow Title', 
    viewAPIUrl: 'http://localhost:6006',
    onFlowCancel: () => {},
    onFlowSave: () => {}
});

flow = getFlowWithSteps();
flow.sequences[0].canDelete = false;

export const CanNotDeleteSequence = TestTemplate.bind({},{flow: flow});

flow = getFlowWithSteps();
flow.sequences[0].canCopy = false;

export const CanNotCopySequence = TestTemplate.bind({},{flow: flow});