import React from "react";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import {Meta, Story} from "@storybook/react/types-6-0";
import {getEmptyDataDefinition, getFilledDataDefinition} from "./Testing/DataTestData";
import {IDefinitionEditorParms, XDefinitionEditor} from "./XDefinitionEditor";

export default {
    title: "Data Designer/Designer",
    parameters: {
    }
} as Meta;

let def = getEmptyDataDefinition();

const TestTemplate: Story<IDefinitionEditorParms> = (args) => <XDefinitionEditor {...args} />;

export const EmptyDesigner = TestTemplate.bind({},{definition: def});

def = getFilledDataDefinition();

const TestTemplateWithData: Story<IDefinitionEditorParms> = (args) => <XDefinitionEditor {...args} />;

export const DesignerWithData = TestTemplateWithData.bind({},{definition: def});
