import React from "react";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import {Meta, Story} from "@storybook/react/types-6-0";
import {InlineInputProps, InlineTextEdit} from "./InlineTextEdit";
import {InlineOptionSelect, InlineOptionsProps} from "./InlineOptionSelect";

export default {
    title: "Shared/Inline Option Select",
    parameters: {
    }
} as Meta;

const TestTemplate: Story<InlineOptionsProps> = (args) => <InlineOptionSelect {...args} />;

export const OptionSelect = TestTemplate.bind({},{text: 'test', options: ['a','b'], onEdit : (newVal: string) => {}});

