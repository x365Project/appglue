import React from "react";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import {Meta, Story} from "@storybook/react/types-6-0";
import {XFormDesigner} from "../../Form/XFormDesigner";
import {PropertyEditorInteger, PropertyEditorIntegerInterface} from "./PropertyEditorInteger";
import { TextFieldDisplayType } from "./PropertyEditorStyles";
import { ObserveState } from "../StateManagement/ObserveState";
import { StateManager } from "../StateManagement/StateManager";



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

    type?: TextFieldDisplayType = TextFieldDisplayType.Default;

    updateCallback = () => {
        StateManager.changed(this);
    }

}

const TextTemplate: Story<PropertyEditorIntegerInterface> = (args) => <ObserveState listenTo={args} control={() => <PropertyEditorInteger {...args} />} />;

export const DefaultIntegerEditor = TextTemplate.bind({}, new TextData());


let errorTestData = new TextData();
errorTestData.type = TextFieldDisplayType.Error;

export const ErrorIntegerEditor = TextTemplate.bind({}, errorTestData);


let successTestData = new TextData();
successTestData.type = TextFieldDisplayType.Success;

export const SuccessIntegerEditor = TextTemplate.bind({}, successTestData);