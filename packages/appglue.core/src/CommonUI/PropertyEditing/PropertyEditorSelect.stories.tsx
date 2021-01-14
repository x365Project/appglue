import React from "react";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import {Meta, Story} from "@storybook/react/types-6-0";
import {XFormDesigner} from "../../Form/XFormDesigner";
import {PropertyEditorSelect, PropertyEditorSelectInterface} from "./PropertyEditorSelect";

export default {
    title: "Shared/Property Editors",
    component: XFormDesigner,
} as Meta;


const MissingTemplate: Story<{}> = () => (
    <div>
        Missing
    </div>
);


class SelectData implements PropertyEditorSelectInterface {
    editObject: object = {};
    hint: string = 'hint';
    label: string = 'Select Editor';
    options: string[] = ['Option a', 'Option b'];
    parentDefaultValue: string = '';
    propertyName: string = 'propName';
    requiredText: string = 'required text';
    updateCallback() {
    }


}

const SelectTemplate: Story<PropertyEditorSelectInterface> = (args) => <PropertyEditorSelect {...args} />;

export const SelectEditor = SelectTemplate.bind({}, new SelectData());
