import React from "react";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import {Meta, Story} from "@storybook/react/types-6-0";
import {XFormAndLayoutDesignPanel} from "./XFormAndLayoutDesignPanel";
import { XFormConfiguration } from "../XFormConfiguration";
import { getFormConfig } from "../Testing/FormTestData";
import { FormMode } from "../FormDesignConstants";
import { XStackContainer } from "../Containers/XStackContainer";
import { XTextField } from "../Controls/XTextField";
import { ValidationIssue, ValidationLevel } from "../../Common/IDesignValidationProvider";
import { XHStackContainer } from "../Containers/XHStackContainer";
import { XColumnContainer, XColumnContainerColumn } from "../Containers/XColumnContainer";
import {FormContext} from "./FormContext";
import { XTabContainer, XTabContainerTabContent, XTabContainerTabHeader, XTabContainerTab } from "../Containers/XTabContainer";
import { DefaultOnOff } from "./DefaultOnOff";

export default {
    title: "Form Designer/Designer/Pieces",
    parameters: {
    }
} as Meta;


const Template: Story<{
    editContext: FormContext
}> = (args) => {
    const ref = React.createRef<XFormAndLayoutDesignPanel>()
    // hook to the update
    args.editContext.onDesignerUpdate = () => {
        ref.current?.forceUpdate();
    }

    return <XFormAndLayoutDesignPanel {...args} ref={ref} />

};


let form: XFormConfiguration = getFormConfig();
let ui: FormContext = new FormContext(form);
form.setFormContext(ui);


export const DesignFormMode = Template.bind({}, {editContext: ui});

form = getFormConfig();
ui = new FormContext(form);
form.setFormContext(ui);
ui.mode = FormMode.LayoutDesign;

export const DesignPanelOnlyControlMode = Template.bind({}, {editContext: ui})


let form1 = new XFormConfiguration();

let stack = new XStackContainer();
let errorField = new XTextField();
errorField.label = 'Label';
stack.add(errorField);

let textField = new XTextField();
textField.valueName = 'ttt';
textField.label = 'Text';
stack.add(textField);

form1.add(stack);

ui = new FormContext(form1);
form1.setFormContext(ui);

ui.designValidationProvider = {
    getDesignValidationIssues: (): ValidationIssue[] => {
        let breaks: ValidationIssue[] = [];
        for (let c of form1.getAllControls()) {
            const valueName = Reflect.get(c, 'valueName');
            if (valueName && valueName.length < 6) {
                breaks.push(
                    new ValidationIssue('valueName must have at least 6 characters', valueName, c.id, ValidationLevel.WARNING)
                )
            }

        }
        return breaks;
    }
}

// todo: remove these parts, we need to listen to all compoments
ui.computeDesignValidationIssues();


export const DesignPanelWithDesignTimeValidationIssue = Template.bind({}, {editContext: ui});

form = getFormConfig();
form.doNotScrollFirstContainerOnForm = true;
form.doNotScrollLastContainerOnForm = true;

ui = new FormContext(form);
form.setFormContext(ui);

export const DesignPanelWithPinSection = Template.bind({}, {editContext: ui});

form = new XFormConfiguration();
stack = new XStackContainer();
form.add(stack);
let hstack = new XHStackContainer();
form.add(hstack);

let columnContainer = new XColumnContainer();
form.add(columnContainer);

ui = new FormContext(form);
form.setFormContext(ui);

export const FormModeDesignPanelWithEmptyContainer = Template.bind({}, {editContext: ui});

form = new XFormConfiguration();

stack = new XStackContainer();
form.add(stack);

hstack = new XHStackContainer();
form.add(hstack);

columnContainer = new XColumnContainer();
form.add(columnContainer);

ui = new FormContext(form);
ui.mode = FormMode.LayoutDesign;
form.setFormContext(ui);

export const LayoutModeDesignPanelWithEmptyContainer = Template.bind({}, {editContext: ui});



form = new XFormConfiguration();
columnContainer = new XColumnContainer();

let actualCol = new XColumnContainerColumn();
let actualCol2 = new XColumnContainerColumn();
let actualCol3 = new XColumnContainerColumn();
actualCol.add(new XTextField());
actualCol2.add(new XTextField());
actualCol3.add(new XTextField());

columnContainer.add(actualCol);
columnContainer.add(actualCol2);
columnContainer.add(actualCol3);

actualCol.targetWidth = 30;
actualCol.minSizePx = 500;
actualCol2.targetWidth = 70;
actualCol2.minSizePx = 300;
actualCol3.targetWidth = 20;
actualCol3.minSizePx = 100;

columnContainer.lineBetweenColumns = true;
columnContainer.lineWidthBetweenColumns = 2;
columnContainer.lineColorBetweenColumns = 'gray';

form.add(columnContainer);

ui = new FormContext(form);
ui.mode = FormMode.LayoutDesign;
form.setFormContext(ui);

export const DesignPanelWithLineBetweenWithOverlap = Template.bind({}, {editContext: ui});

let tabContainer = new XTabContainer();

let tabContainerTab = new XTabContainerTab();

tabContainer.overrideFormBorderSettings = DefaultOnOff.On;

let tabContainerTabContent = new XTabContainerTabContent();
let tabContainerTabHeader = new XTabContainerTabHeader();

tabContainerTabHeader.title = 'Test 1';
tabContainerTab.setContent(tabContainerTabContent);
tabContainerTab.setHeader(tabContainerTabHeader);

let tabContainerTab2 = new XTabContainerTab();
let tabContainerTabContent2 = new XTabContainerTabContent();
let tabContainerTabHeader2 = new XTabContainerTabHeader();
tabContainerTabHeader2.title = 'Test 2';
tabContainerTab2.setContent(tabContainerTabContent2);
tabContainerTab2.setHeader(tabContainerTabHeader2);

tabContainer.addTab(tabContainerTab);
tabContainer.addTab(tabContainerTab2);

form.add(tabContainer);

ui = new FormContext(form);
ui.mode = FormMode.LayoutDesign;
form.setFormContext(ui);

export const DesignPanelWithTabContainer = Template.bind({}, {editContext: ui});