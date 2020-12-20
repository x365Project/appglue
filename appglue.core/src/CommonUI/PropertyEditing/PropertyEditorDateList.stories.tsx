import React from "react";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import {Meta, Story} from "@storybook/react/types-6-0";
import {XFormDesigner} from "../../Form/XFormDesigner";
import {PropertyEditorDateList, PropertyEditorDateListInterface} from "./PropertyEditorDateList";
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


class DateListData implements PropertyEditorDateListInterface {
    editObject: object = {};
    label: string = 'Date List';
    propertyName: string = 'DateList';

    updateCallback: () => void = () => {
        StateManager.propertyChanged(this, this.propertyName)
    }

}

let testData = new DateListData();

const DateListTemplate: Story<PropertyEditorDateListInterface> = 
    (args) => <ObserveState listenTo={testData} properties={[testData.propertyName]} control={() => <PropertyEditorDateList {...args} />} />;

export const DateListEditor = DateListTemplate.bind({}, testData);
