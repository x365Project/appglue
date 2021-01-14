import React from "react";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import {Meta, Story} from "@storybook/react/types-6-0";
import {XFormDesigner} from "./../XFormDesigner";
import {XFormConfiguration} from "./../XFormConfiguration";
import {IUserFormParameters, XUserForm} from "../XUserForm";
import {XSelectbox} from "../Controls/XSelectbox";
import {XColumnContainer, XColumnContainerColumn} from "../Containers/XColumnContainer";
import {XLabel} from "./XLabel";
import {TextControlSize, TextControlStyle} from "../FormDesignConstants";
import {UserFormData} from "../UserFormData";


export default {
    title: "Form Designer/Controls/SelectBox",
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
    
    let textField = new XSelectbox();
    textField.label = 'Text Field Label';
    textField.valueName = 'value';
    textField.list = ['Pizza', 'Beer', 'Kale'];
    textField.requiredOnAllOutcomes = false;
    col1.add(textField);

    textField = new XSelectbox();
    textField.label = 'Text Field Label';
    textField.style = TextControlStyle.OUTLINE;
    textField.valueName = 'value';
    textField.list = ['Pizza', 'Beer', 'Kale'];
    textField.requiredOnAllOutcomes = false;
    textField.overrideStyle = true;
    col1.add(textField);

    textField = new XSelectbox();
    textField.label = 'Text Field Label';
    textField.style = TextControlStyle.SHADED;
    textField.list = ['Pizza', 'Beer', 'Kale'];
    textField.valueName = 'value';
    textField.requiredOnAllOutcomes = false;
    textField.overrideStyle = true;
    col1.add(textField);

    textField = new XSelectbox();
    textField.label = 'Text Field Label';
    textField.valueName = 'value';
    textField.list = ['Pizza', 'Beer', 'Kale'];
    textField.style = TextControlStyle.UNDERLINED;
    textField.requiredOnAllOutcomes = false;
    textField.overrideStyle = true;
    col1.add(textField);

    label = new XLabel();
    label.text = 'Small Size';
    col2.add(label);

    textField = new XSelectbox();
    textField.label = 'Text Field Label';
    textField.list = ['Pizza', 'Beer', 'Kale'];
    textField.valueName = 'value';
    textField.requiredOnAllOutcomes = false;
    textField.size = TextControlSize.SMALL;
    col2.add(textField);

    textField = new XSelectbox();
    textField.label = 'Text Field Label';
    textField.style = TextControlStyle.OUTLINE;
    textField.list = ['Pizza', 'Beer', 'Kale'];
    textField.valueName = 'value';
    textField.size = TextControlSize.SMALL;
    textField.requiredOnAllOutcomes = false;
    textField.overrideStyle = true;
    col2.add(textField);

    textField = new XSelectbox();
    textField.label = 'Text Field Label';
    textField.style = TextControlStyle.SHADED;
    textField.list = ['Pizza', 'Beer', 'Kale'];
    textField.valueName = 'value';
    textField.size = TextControlSize.SMALL;
    textField.requiredOnAllOutcomes = false;
    textField.overrideStyle = true;
    col2.add(textField);

    textField = new XSelectbox();
    textField.label = 'Text Field Label';
    textField.list = ['Pizza', 'Beer', 'Kale'];
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
    let ctf = c as XSelectbox;
    if (ctf) {
        ctf.hintText ='hint text'
    }
}

export const WithHints = Template.bind({}, {form: ui.form});


ui = getUI();

controls = ui.form.getAllControls();

for (let c of controls) {
    let ctf = c as XSelectbox;
    if (ctf) {
        ctf.placeholderText ='placeholder text';
    }
}

export const WithPlaceholderText = Template.bind({}, {form: ui.form});


ui = getUI();

controls = ui.form.getAllControls();

for (let c of controls) {
    let ctf = c as XSelectbox;
    if (ctf) {
        ctf.requiredOnAllOutcomes = true;
    }
}

export const WithValidationBreaks = Template.bind({}, {form: ui.form});


ui = getUI();

let data = new UserFormData();
data['value'] = 'Pizza';

export const WithValue = Template.bind({}, {form: ui.form, formData: data});

ui = getUI();

data = new UserFormData();
data['value'] = 'Pizza NOT IN LIST, SHOULD DISPLAY with validation break';

export const WithValueNoInList = Template.bind({}, {form: ui.form, formData: data});
