import React from "react";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import {Meta, Story} from "@storybook/react/types-6-0";
import {XFormDesigner} from "./../XFormDesigner";
import {XFormConfiguration} from "./../XFormConfiguration";
import {IUserFormParameters, XUserForm} from "../XUserForm";
import {XNumberBox} from "../Controls/XNumberBox";
import {XColumnContainer, XColumnContainerColumn} from "../Containers/XColumnContainer";
import {XLabel} from "./XLabel";
import {TextControlSize, TextControlStyle} from "../FormDesignConstants";
import {UserFormData} from "../UserFormData";


export default {
    title: "Form Designer/Controls/NumberField",
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
    label.text = 'Large Size';
    col1.add(label);
    
    let textField = new XNumberBox();
    textField.label = 'Text Field Label';
    textField.valueName = 'value';
    textField.requiredOnAllOutcomes = false;
    col1.add(textField);

    textField = new XNumberBox();
    textField.label = 'Text Field Label';
    textField.style = TextControlStyle.OUTLINE;
    textField.valueName = 'value';
    textField.requiredOnAllOutcomes = false;
    textField.overrideStyle = true;
    col1.add(textField);

    textField = new XNumberBox();
    textField.label = 'Text Field Label';
    textField.style = TextControlStyle.SHADED;
    textField.valueName = 'value';
    textField.requiredOnAllOutcomes = false;
    textField.overrideStyle = true;
    col1.add(textField);

    textField = new XNumberBox();
    textField.label = 'Text Field Label';
    textField.valueName = 'value';
    textField.style = TextControlStyle.UNDERLINED;
    textField.requiredOnAllOutcomes = false;
    textField.overrideStyle = true;
    col1.add(textField);

    label = new XLabel();
    label.text = 'Small Size';
    col2.add(label);

    textField = new XNumberBox();
    textField.label = 'Text Field Label';
    textField.valueName = 'value';
    textField.requiredOnAllOutcomes = false;
    textField.size = TextControlSize.SMALL;
    col2.add(textField);

    textField = new XNumberBox();
    textField.label = 'Text Field Label';
    textField.style = TextControlStyle.OUTLINE;
    textField.valueName = 'value';
    textField.size = TextControlSize.SMALL;
    textField.requiredOnAllOutcomes = false;
    textField.overrideStyle = true;
    col2.add(textField);

    textField = new XNumberBox();
    textField.label = 'Text Field Label';
    textField.style = TextControlStyle.SHADED;
    textField.valueName = 'value';
    textField.size = TextControlSize.SMALL;
    textField.requiredOnAllOutcomes = false;
    textField.overrideStyle = true;
    col2.add(textField);

    textField = new XNumberBox();
    textField.label = 'Text Field Label';
    textField.style = TextControlStyle.UNDERLINED;
    textField.valueName = 'value';
    textField.size = TextControlSize.SMALL;
    textField.requiredOnAllOutcomes = false;
    textField.overrideStyle = true;
    col2.add(textField);


    return {form: ui};
}

let ui = getUI();

export const AllStyles = Template.bind({}, {form: ui.form});

ui = getUI();

let controls = ui.form.getAllControls();

for (let c of controls) {
    let ctf = c as XNumberBox;
    if (ctf) {
        ctf.hintText ='hint text'
    }
}

export const WithHints = Template.bind({}, {form: ui.form});


ui = getUI();

controls = ui.form.getAllControls();

for (let c of controls) {
    let ctf = c as XNumberBox;
    if (ctf) {
        ctf.placeholderText ='placeholder text';
    }
}

export const WithPlaceholderText = Template.bind({}, {form: ui.form});


ui = getUI();

controls = ui.form.getAllControls();

for (let c of controls) {
    let ctf = c as XNumberBox;
    if (ctf) {
        ctf.requiredOnAllOutcomes = true;
    }
}

export const WithValidationBreaks = Template.bind({}, {form: ui.form});


ui = getUI();

let data = new UserFormData();
data['value'] = 200;

export const WithValue = Template.bind({}, {form: ui.form, formData: data});
