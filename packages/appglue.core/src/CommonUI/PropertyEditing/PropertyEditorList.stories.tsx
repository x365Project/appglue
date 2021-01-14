import React from "react";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import {Meta, Story} from "@storybook/react/types-6-0";
import {XFormDesigner} from "../../Form/XFormDesigner";
import {IPropertyEditorList, PropertyEditorList} from "./PropertyEditorList";


export default {
    title: "Shared/Property Editors",
    component: XFormDesigner,
} as Meta;


const MissingTemplate: Story<{}> = () => (
    <div>
        Missing
    </div>
);

class MyData {
    value1: string = 'first value';
    value2: string = 'second value';
}

class ListData implements IPropertyEditorList {
    desiredHeight: number = 100;
    desiredWidth: number= 100;

    itemUI(item: any): { onComplete: Function; onCancel: Function; ui: JSX.Element | undefined } {
        return {onCancel: () => {}, onComplete: () =>{}, ui: undefined};
    }

    label: string = 'List Name';
    list: { name: string; item: any }[] = [];

    prototype(): any {
    }

    showDialogCancel: boolean = true;

}

const ListTemplate: Story<IPropertyEditorList> = (args) => <PropertyEditorList {...args} />;

export const ListEditor = MissingTemplate.bind({}, new ListData());

export const ListEditorNoData = MissingTemplate.bind({}, new ListData());

export const ListEditorBigDialog = MissingTemplate.bind({}, new ListData());
