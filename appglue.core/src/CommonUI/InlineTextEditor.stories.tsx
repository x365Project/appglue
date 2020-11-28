import React from "react";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import {Meta, Story} from "@storybook/react/types-6-0";
import {InlineInputProps, InlineTextEdit} from "./InlineTextEdit";

export default {
    title: "Shared/Inline Text Editor",
    parameters: {
    }
} as Meta;

const TestTemplate: Story<InlineInputProps> = (args) => <InlineTextEdit {...args} />;

export const TextInputLabel = TestTemplate.bind({},{text: 'test', onEdit : (newVal: string) => {}});

