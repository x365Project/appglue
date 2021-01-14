import React from "react";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import {Meta, Story} from "@storybook/react/types-6-0";
import {XFormDesigner} from "../../Form/XFormDesigner";
import {PropertyEditorBooleanInterface, PropertyEditorBoolean} from "./PropertyEditorBoolean";
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


class TextData implements PropertyEditorBooleanInterface {
    editObject: object = {};
    hint: string = 'hint';
    label: string = 'Boolean Editor';
    parentDefaultValue: string | null = null;
    propertyName: string | number = 'textValue';
    requiredText: string = 'required text';

    updateCallback = () => {
        StateManager.changed(this);
    }

}

const TextTemplate: Story<PropertyEditorBooleanInterface> = (args) => <ObserveState listenTo={args} control={() => <PropertyEditorBoolean {...args} />} />;

export const BooleanEditor = TextTemplate.bind({}, new TextData());
