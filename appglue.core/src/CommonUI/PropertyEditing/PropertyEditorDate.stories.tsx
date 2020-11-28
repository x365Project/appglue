import React from "react";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import {Meta, Story} from "@storybook/react/types-6-0";
import {XFormDesigner} from "../../Form/XFormDesigner";
import {PropertyEditorDate, PropertyEditorDateInterface} from "./PropertyEditorDate";



export default {
    title: "Shared/Property Editors",
    component: XFormDesigner,
} as Meta;


const MissingTemplate: Story<{}> = () => (
    <div>
        Missing
    </div>
);


class DateData implements PropertyEditorDateInterface {
    editObject: object = {};
    hint: string = 'hint';
    label: string = 'DateEditor';
    parentDefaultValue: string | null = null;
    requiredText: string = 'required text';
    propertyName: string = 'datedata';

    updateCallback() {
    }


}

const TextTemplate: Story<PropertyEditorDateInterface> = (args) => <PropertyEditorDate {...args} />;

export const DateEditor = TextTemplate.bind({}, new DateData());
