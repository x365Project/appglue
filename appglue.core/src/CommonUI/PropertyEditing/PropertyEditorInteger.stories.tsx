import React from "react";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import {Meta, Story} from "@storybook/react/types-6-0";
import {XFormDesigner} from "../../Form/XFormDesigner";
import {PropertyEditorInteger, PropertyEditorIntegerInterface} from "./PropertyEditorInteger";



export default {
    title: "Shared/Property Editors",
    component: XFormDesigner,
} as Meta;


const MissingTemplate: Story<{}> = () => (
    <div>
        Missing
    </div>
);


class TextData implements PropertyEditorIntegerInterface {
    editObject: object = {};
    hint: string = 'hint';
    label: string = 'Integer Editor';

    propertyName: string | number = 'textValue';
    requiredText: string = 'required text';

    updateCallback() {
    }

}

const TextTemplate: Story<PropertyEditorIntegerInterface> = (args) => <PropertyEditorInteger {...args} />;

export const IntegerEditor = TextTemplate.bind({}, new TextData());
