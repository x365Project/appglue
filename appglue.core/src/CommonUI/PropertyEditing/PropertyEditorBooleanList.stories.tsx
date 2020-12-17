import React from "react";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import {Meta, Story} from "@storybook/react/types-6-0";
import {XFormDesigner} from "../../Form/XFormDesigner";
import {PropertyEditorBooleanList, PropertyEditorBooleanListInterface} from "./PropertyEditorBooleanList";
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


class BooleanListData implements PropertyEditorBooleanListInterface {
    editObject: object = {};
    label: string = 'Boolean List';
    propertyName: string = 'BooleanList';

    updateCallback: () => void = () => {
        StateManager.propertyChanged(this, this.propertyName)
    }

}

let testData = new BooleanListData();

const BooleanListTemplate: Story<PropertyEditorBooleanListInterface> = 
    (args) => <ObserveState listenTo={testData} properties={[testData.propertyName]} control={() => <PropertyEditorBooleanList {...args} />} />;

export const BooleanListEditor = BooleanListTemplate.bind({}, testData);
