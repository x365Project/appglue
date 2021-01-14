import React from "react";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import {Meta, Story} from "@storybook/react/types-6-0";
import {XFormDesigner} from "../../Form/XFormDesigner";
import {
    PropertyEditorTextSizeSelection,
    PropertyEditorTextStyleSelection,
    TextStyleSelectionInterface
} from "./TextSelectionButtonGroups";



export default {
    title: "Shared/Property Editors",
    component: XFormDesigner,
} as Meta;


const MissingTemplate: Story<{}> = () => (
    <div>
        Missing
    </div>
);


class TextStyleButtons implements TextStyleSelectionInterface {
    editObject: object = {};
    label: string = 'TextEditor';
    parentDefaultValue: string | null = null;
    propertyName: string | number = 'textValue';

    updateCallback() {
    }

}

const Template: Story<TextStyleSelectionInterface> = (args) => <PropertyEditorTextStyleSelection {...args} />;

export const TextStyleButtonsEditor = Template.bind({}, new TextStyleButtons());

const Template2: Story<TextStyleSelectionInterface> = (args) => <PropertyEditorTextSizeSelection {...args} />;

export const TextSizeButtonsEditor = Template2.bind({}, new TextStyleButtons());
