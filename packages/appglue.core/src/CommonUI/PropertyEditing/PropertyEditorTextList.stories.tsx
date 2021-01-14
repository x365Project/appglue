import React from "react";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import {Meta, Story} from "@storybook/react/types-6-0";
import {XFormDesigner} from "../../Form/XFormDesigner";
import {PropertyEditorTextList, PropertyEditorTextListInterface} from "./PropertyEditorTextList";
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


class TextListData implements PropertyEditorTextListInterface {
    editObject: object = {};
    label: string = 'TextEditor';
    propertyName: string = 'textList';
    hint: string = 'Please input multiline text';

    updateCallback: () => void = () => {
        StateManager.propertyChanged(this, this.propertyName)
    }

}

let testData = new TextListData();

const TextListTemplate: Story<PropertyEditorTextListInterface> = 
    (args) => <ObserveState listenTo={testData} properties={[testData.propertyName]} control={() => <PropertyEditorTextList {...args} />} />;

export const TextListEditor = TextListTemplate.bind({}, testData);
