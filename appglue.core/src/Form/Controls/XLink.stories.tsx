import React from "react";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import {Meta, Story} from "@storybook/react/types-6-0";
import {XFormDesigner} from "./../XFormDesigner";
import {XFormConfiguration} from "./../XFormConfiguration";
import {IUserFormParameters, XUserForm} from "../XUserForm";
import {XLink} from "../Controls/XLink";
import {XColumnContainer, XColumnContainerColumn} from "../Containers/XColumnContainer";
import {XLabel} from "./XLabel";
import {ButtonControlSize, LinkControlType, LinkControlUnderline} from "../FormDesignConstants";
import {UserFormData} from "../UserFormData";


export default {
    title: "Form Designer/Controls/Link",
    component: XFormDesigner,
} as Meta;

const Template: Story<IUserFormParameters> = (args) => <XUserForm {...args} />;

const MissingTemplate: Story<{}> = () => (
    <div>
        Missing
    </div>
);

function getUI() : {form: XFormConfiguration} {
    let ui = new XFormConfiguration();
    let container = new XColumnContainer();
    let col1 = new XColumnContainerColumn();
    let col2 = new XColumnContainerColumn();
    col2.interControlSpacing = 20;

    container.add(col1);
    container.add(col2);
    ui.add(container);
    
    let label = new XLabel();
    label.text = 'Large Size Action Link';
    col1.add(label);

    let link = new XLink();
    link.label = 'Link Label';
    link.valueName = 'Test Link';
    link.requiredOnAllOutcomes = false;
    link.size = ButtonControlSize.LARGE;
    link.linkType = LinkControlType.ACTION;
    link.linkUnderline = LinkControlUnderline.HOVER;
    col1.add(link);

    link = new XLink();
    link.label = 'Link Label';
    link.valueName = 'Test Link';
    link.requiredOnAllOutcomes = false;
    link.size = ButtonControlSize.LARGE;
    link.linkType = LinkControlType.ACTION;
    link.linkUnderline = LinkControlUnderline.ALWAYS;
    col1.add(link);

    link = new XLink();
    link.label = 'Link Label';
    link.valueName = 'Test Link';
    link.requiredOnAllOutcomes = false;
    link.size = ButtonControlSize.LARGE;
    link.linkType = LinkControlType.ACTION;
    link.linkUnderline = LinkControlUnderline.NONE;
    col1.add(link);


    label = new XLabel();
    label.text = 'Small Size Action Link';
    col2.add(label);

    link = new XLink();
    link.label = 'Link Label';
    link.valueName = 'Test Link';
    link.requiredOnAllOutcomes = false;
    link.size = ButtonControlSize.SMALL;
    link.linkType = LinkControlType.ACTION;
    link.linkUnderline = LinkControlUnderline.HOVER;
    col2.add(link);

    link = new XLink();
    link.label = 'Link Label';
    link.valueName = 'Test Link';
    link.requiredOnAllOutcomes = false;
    link.size = ButtonControlSize.SMALL;
    link.linkType = LinkControlType.ACTION;
    link.linkUnderline = LinkControlUnderline.ALWAYS;
    col2.add(link);

    link = new XLink();
    link.label = 'Link Label';
    link.valueName = 'Test Link';
    link.requiredOnAllOutcomes = false;
    link.size = ButtonControlSize.SMALL;
    link.linkType = LinkControlType.ACTION;
    link.linkUnderline = LinkControlUnderline.NONE;
    col2.add(link);


    container = new XColumnContainer();
    col1 = new XColumnContainerColumn();
    col2 = new XColumnContainerColumn();
    col2.interControlSpacing = 20;

    container.add(col1);
    container.add(col2);
    ui.add(container);

    label = new XLabel();
    label.text = 'Large Size Url Link';
    col1.add(label);

    link = new XLink();
    link.label = 'Link Label';
    link.valueName = 'http://www.example.com/';
    link.requiredOnAllOutcomes = false;
    link.size = ButtonControlSize.LARGE;
    link.linkType = LinkControlType.URL;
    link.linkUnderline = LinkControlUnderline.HOVER;
    col1.add(link);

    link = new XLink();
    link.label = 'Link Label';
    link.valueName = 'http://www.example.com/';
    link.requiredOnAllOutcomes = false;
    link.size = ButtonControlSize.LARGE;
    link.linkType = LinkControlType.URL;
    link.linkUnderline = LinkControlUnderline.ALWAYS;
    col1.add(link);

    link = new XLink();
    link.label = 'Link Label';
    link.valueName = 'http://www.example.com/';
    link.requiredOnAllOutcomes = false;
    link.size = ButtonControlSize.LARGE;
    link.linkType = LinkControlType.URL;
    link.linkUnderline = LinkControlUnderline.NONE;
    col1.add(link);

    label = new XLabel();
    label.text = 'Small Size Url Link';
    col2.add(label);

    link = new XLink();
    link.label = 'Link Label';
    link.valueName = 'http://www.example.com/';
    link.requiredOnAllOutcomes = false;
    link.size = ButtonControlSize.SMALL;
    link.linkType = LinkControlType.URL;
    link.linkUnderline = LinkControlUnderline.HOVER;
    col2.add(link);

    link = new XLink();
    link.label = 'Link Label';
    link.valueName = 'http://www.example.com/';
    link.requiredOnAllOutcomes = false;
    link.size = ButtonControlSize.SMALL;
    link.linkType = LinkControlType.URL;
    link.linkUnderline = LinkControlUnderline.ALWAYS;
    col2.add(link);

    link = new XLink();
    link.label = 'Link Label';
    link.valueName = 'http://www.example.com/';
    link.requiredOnAllOutcomes = false;
    link.size = ButtonControlSize.SMALL;
    link.linkType = LinkControlType.URL;
    link.linkUnderline = LinkControlUnderline.NONE;
    col2.add(link);

    return {form: ui};
}

let ui = getUI();

export const AllStyles = Template.bind({}, {form: ui.form});

ui = getUI();

let controls = ui.form.getAllControls();


ui = getUI();

controls = ui.form.getAllControls();

for (let c of controls) {
    let ctf = c as XLink;
    if (ctf) {
        ctf.requiredOnAllOutcomes = true;
    }
}

export const WithValidationBreaks = Template.bind({}, {form: ui.form});


ui = getUI();

let data = new UserFormData();
data['value'] = 'text value';

export const WithValue = Template.bind({}, {form: ui.form, formData: data});
