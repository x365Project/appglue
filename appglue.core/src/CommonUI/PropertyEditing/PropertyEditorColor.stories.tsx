import React from "react";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import {Meta, Story} from "@storybook/react/types-6-0";
import {XFormDesigner} from "../../Form/XFormDesigner";
import {PropertyEditorColor, PropertyEditorColorInterface} from "./PropertyEditorColor";

export default {
    title: "Shared/Property Editors",
    component: XFormDesigner,
} as Meta;


const MissingTemplate: Story<{}> = () => (
    <div>
        Missing
    </div>
);

const ColorTemplate: Story<PropertyEditorColorInterface> = (args) => <PropertyEditorColor {...args} />;

class ColorData implements PropertyEditorColorInterface {
    color: "primary" | "secondary" | "default" = 'default';
    editObject: object = {};
    label: string = 'Color Editor';
    name: string = 'Color';
    parentDefaultValue: string | null = null;
    propertyName: string | number = 'color';

    updateCallback() {
    }

}
let color = new ColorData();
export const ColorEditorDefault = ColorTemplate.bind({}, color);

color = new ColorData();
color.color = 'primary';
export const ColorEditorPrimary = ColorTemplate.bind({}, color);

color = new ColorData();
color.color = 'secondary';
export const ColorEditorSecondary = ColorTemplate.bind({}, color);

