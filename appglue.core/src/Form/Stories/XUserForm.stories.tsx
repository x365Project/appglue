import React from "react";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from "@storybook/react/types-6-0";
import { XFormConfiguration } from "../XFormConfiguration";
import { getFormConfig } from "../Testing/FormTestData";
import {XUserForm} from "../XUserForm";
import { IDesignPanelConfig, FormDesignConstants } from "../FormDesignConstants";
import {XColumnContainer, XColumnContainerColumn} from "../Containers/XColumnContainer";
import {XHStackContainer, HStackVerticalAlignment} from "../Containers/XHStackContainer";
import {XTextField} from "../Controls/XTextField";
import {XButton} from "../Controls/XButton";
import { DefaultOnOff } from "../Utilities/DefaultOnOff";
import { XStackContainer } from "../Containers/XStackContainer";


let ui = getFormConfig();

const MissingTemplate: Story<{}> = () => (
    <div>
        Missing
    </div>
);

export interface XFormDesignerProps {
    form: XFormConfiguration;
    config?: IDesignPanelConfig;
}


export default {
    title: "Form Designer/Runtime",
    component: XUserForm,
} as Meta;

const Template: Story<XFormDesignerProps> = (args) => <XUserForm {...args} />;

export const AllControls = Template.bind({}, {form: ui});

ui = new XFormConfiguration()

export const NoControls = Template.bind({}, {form: ui});


ui = new XFormConfiguration()
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

ui.add(columnContainer);
ui.add(hstackContainer);

const config: IDesignPanelConfig = {
    size: FormDesignConstants.FORM_SIZE_MODE_PHONE_VERTICAL,
    background: FormDesignConstants.FORM_BACKGROUND_MODE_PAPER,
    data: FormDesignConstants.FORM_DATA_MODE_NONE
}
export const ResponsiveThinForm = Template.bind({}, {form: ui, config});


export const PinnedSections = MissingTemplate.bind({}, {});
export const DataChangingExternally = MissingTemplate.bind({}, {});
export const ValidationBreaks = MissingTemplate.bind({}, {});
export const ButtonEvents = MissingTemplate.bind({}, {});
export const CloseAction = MissingTemplate.bind({}, {});

let form = new XFormConfiguration();
let stack = new XStackContainer();
form.add(stack);
let control = new XTextField();
control.valueName = 'test';
control.label = 'test label';
stack.add(control);

export const SimpleFormOneTextBox = Template.bind({}, {form: form});
