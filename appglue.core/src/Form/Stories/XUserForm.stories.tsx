import React from "react";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from "@storybook/react/types-6-0";
import { XFormConfiguration } from "../XFormConfiguration";
import { getFormConfig } from "../Testing/FormTestData";
import {XUserForm} from "../XUserForm";
import { IDesignPanelConfig, FormDesignConstants, FormMode } from "../FormDesignConstants";
import {XColumnContainer, XColumnContainerColumn} from "../Containers/XColumnContainer";
import {XHStackContainer, HStackVerticalAlignment} from "../Containers/XHStackContainer";
import {XTextField} from "../Controls/XTextField";
import {XButton} from "../Controls/XButton";
import { DefaultOnOff } from "../Utilities/DefaultOnOff";
import { XStackContainer } from "../Containers/XStackContainer";
import { XUserFormTester } from "../Utilities/XUserFormTester";
import { FormEditContext } from "../Utilities/FormEditContext";
import { XTextArea } from "../Controls/XTextArea";
import { XSelectbox } from "../Controls/XSelectbox";
import { XCheckboxField } from "../Controls/XCheckboxField";


let form = getFormConfig();

const MissingTemplate: Story<{}> = () => (
    <div>
        Missing
    </div>
);

export interface XFormDesignerProps {
    form: XFormConfiguration;
    // TODO: remove. these are runtime tests.  should have nothing about design here.
    config?: IDesignPanelConfig;
}


// --------------------------------
// control for testing
// --------------------------------

interface StoryHostXUserFormProps extends XFormDesignerProps {
    width? : number;
    height? : number;
    formName? : string;
    showCancel? : boolean;
    background?: string ;
}

// TODO: hook button event
// TODO: hook cancel event
// TODO: hook data change event
// TODO: hook close event
// TODO: add width and height to div if exists
// TODO: add background color.  IF NO background, set to light gray.
function StoryHostXUserForm(props: {storyHostProps : StoryHostXUserFormProps}) {
    return (
        <div>
            <XUserForm form={props.storyHostProps.form}/>
            to right: text area showing data
            to right: text area for logging of events
        </div>
    );
}

// --------------------------------
// END control for testing
// --------------------------------


export default {
    title: "Form Designer/Runtime",
} as Meta;

const Template: Story<XFormDesignerProps> = (args) => <XUserForm {...args} />;

export const AllControls = Template.bind({}, {form: form});

form = new XFormConfiguration();
let cContainer = new XColumnContainer();
let hContainer = new XHStackContainer();
let sContainer = new XStackContainer();

form.add(cContainer);
form.add(hContainer);
form.add(sContainer);

export const NoControls = Template.bind({}, {form: form});


const TemplateWithEditContext: Story<{editContext: FormEditContext}> = (args) => <XUserFormTester {...args} />;

form = new XFormConfiguration();
let columnContainer = new XColumnContainer();
let actualCol = new XColumnContainerColumn();
let actualCol2 = new XColumnContainerColumn();
let actualCol3 = new XColumnContainerColumn();

actualCol.targetWidth = 30;
actualCol.minSizePx = 100;
actualCol2.targetWidth = 70;
actualCol2.minSizePx = 300;
actualCol3.targetWidth = 20;
actualCol3.minSizePx = 100;

// show border so we can see
columnContainer.overrideFormBorderSettings = DefaultOnOff.On;
columnContainer.showContainerBorder = true;
columnContainer.defaultShowColumnBorder = true;

columnContainer.add(actualCol);
columnContainer.add(actualCol2);
columnContainer.add(actualCol3);

actualCol.add(new XTextField());
actualCol.add(new XTextField());
actualCol.add(new XTextField());
actualCol2.add(new XTextField());
actualCol2.add(new XTextField());
actualCol2.add(new XTextField());

let hstackContainer = new XHStackContainer();
hstackContainer.verticalAlignment = HStackVerticalAlignment.MIDDLE;
hstackContainer.overrideFormBorderSettings = DefaultOnOff.On;
hstackContainer.showContainerBorder = true;


let button = new XButton();
button.label = 'Submit';
let button2 = new XButton();
button.label = 'Cancel';
hstackContainer.add(new XTextField());
hstackContainer.add(new XTextField());
hstackContainer.add(button);
hstackContainer.add(button2);

form.add(columnContainer);
form.add(hstackContainer);

const config: IDesignPanelConfig = {
    size: FormDesignConstants.FORM_SIZE_MODE_PHONE_VERTICAL,
    background: FormDesignConstants.FORM_BACKGROUND_MODE_PAPER,
    data: FormDesignConstants.FORM_DATA_MODE_NONE
}

let ui = new FormEditContext(form);
ui.mode = FormMode.Runtime;
form.setFormEditContext(ui);
ui.designConfig = config

export const ResponsiveThinForm = TemplateWithEditContext.bind({}, {editContext: ui});

form = getFormConfig();
form.doNotScrollLastContainerOnForm = true;
form.doNotScrollFirstContainerOnForm = true;

ui = new FormEditContext(form);
ui.mode = FormMode.Runtime;
ui.designConfig = {
    size: FormDesignConstants.FORM_SIZE_MODE_DEFINED,
    background: FormDesignConstants.FORM_BACKGROUND_MODE_PAPER,
    data: FormDesignConstants.FORM_DATA_MODE_NONE
}
form.setFormEditContext(ui);

export const PinnedSections = TemplateWithEditContext.bind({}, {editContext: ui});


form = new XFormConfiguration();
form.doNotScrollFirstContainerOnForm = true;
form.doNotScrollLastContainerOnForm = true;

ui = new FormEditContext(form);
ui.designConfig = {
    size: FormDesignConstants.FORM_SIZE_MODE_TABLET_HORIZONTAL,
    background: FormDesignConstants.FORM_BACKGROUND_MODE_PAPER,
    data: FormDesignConstants.FORM_DATA_MODE_NONE
}
form.setFormEditContext(ui);
ui.mode = FormMode.Runtime;

export const PinnedSectionsForEmptyForm = TemplateWithEditContext.bind({}, {editContext: ui});


form = new XFormConfiguration();
let stackContainer = new XStackContainer();
let textField = new XTextField();

textField.valueName = 'textfield';
textField.label = 'Text Field';

let textareaField = new XTextArea();
textareaField.valueName = 'textarea';
textareaField.label = 'Textarea Field';

let selectField = new XSelectbox();
selectField.valueName = 'selectbox';
selectField.items = [
    {
        label: 'Option 1',
        value: '1',
    },
    {
        label: 'Option 2',
        value: '2',
    },
];

let checkboxField = new XCheckboxField();
checkboxField.valueName = 'checkbox';

stackContainer.add(textField);
stackContainer.add(textareaField);
stackContainer.add(selectField);
stackContainer.add(checkboxField);

form.add(stackContainer);

ui = new FormEditContext(form);
ui.mode = FormMode.Runtime;
form.setFormEditContext(ui);

ui.setFormData({
    textfield: 'Text Field',
    textarea: 'Text Area',
    checkbox: true,
    selectbox: '2'
});

export const DataChangingExternally = TemplateWithEditContext.bind({}, {editContext: ui});


export const ValidationBreaks = MissingTemplate.bind({}, {});
export const ButtonEvents = MissingTemplate.bind({}, {});
export const CloseAction = MissingTemplate.bind({}, {});

form = new XFormConfiguration();
let stack = new XStackContainer();
form.add(stack);
let control = new XTextField();
control.valueName = 'test';
control.label = 'test label';
stack.add(control);

export const SimpleFormOneTextBox = Template.bind({}, {form: form});
