import React from "react";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import {Meta, Story} from "@storybook/react/types-6-0";
import {XFormDesigner} from "../../Form/XFormDesigner";
import {PropertyEditorNumberList, PropertyEditorNumberListInterface} from "./PropertyEditorNumberList";
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


class NumberListData implements PropertyEditorNumberListInterface {
    editObject: object = {};
    label: string = 'Number List';
    propertyName: string = 'NumberList';
    hint: string = 'NumberList';

    updateCallback: () => void = () => {
        StateManager.propertyChanged(this, this.propertyName)
    }

}

let testData = new NumberListData();

const NumberListTemplate: Story<PropertyEditorNumberListInterface> = 
    (args) => <ObserveState listenTo={testData} properties={[testData.propertyName]} control={() => <PropertyEditorNumberList {...args} />} />;

export const NumberListEditor = NumberListTemplate.bind({}, testData);
