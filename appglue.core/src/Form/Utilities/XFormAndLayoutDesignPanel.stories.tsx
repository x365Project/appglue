import React from "react";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import {Meta, Story} from "@storybook/react/types-6-0";
import {XFormAndLayoutDesignPanel} from "./XFormAndLayoutDesignPanel";
import { FormEditContext } from "./FormEditContext";
import { XFormConfiguration } from "../XFormConfiguration";
import { getFormConfig } from "../Testing/FormTestData";
import { FormMode } from "../FormDesignConstants";
import { XStackContainer } from "../Containers/XStackContainer";
import { XTextField } from "../Controls/XTextField";
import { ValidationIssue, ValidationLevel } from "../../Common/IDesignValidationProvider";
import { XBaseControl } from "../Controls/XBaseControl";
import { XHStackContainer } from "../Containers/XHStackContainer";
import { XColumnContainer } from "../Containers/XColumnContainer";

export default {
    title: "Form Designer/Designer/Pieces",
    parameters: {
    }
} as Meta;


const Template: Story<{
    editContext: FormEditContext
}> = (args) => {
    const ref = React.createRef<XFormAndLayoutDesignPanel>()
    // hook to the update
    args.editContext.onDesignerUpdate = () => {
        ref.current?.forceUpdate();
    }

    return <XFormAndLayoutDesignPanel {...args} ref={ref} />

};


let form: XFormConfiguration = getFormConfig();
let ui: FormEditContext = new FormEditContext(form);
form.setFormEditContext(ui);


export const DesignFormMode = Template.bind({}, {editContext: ui});

form = getFormConfig();
ui = new FormEditContext(form);
form.setFormEditContext(ui);
ui.mode = FormMode.LayoutDesign;

export const DesignPanelOnlyControlMode = Template.bind({}, {editContext: ui})


form = new XFormConfiguration();

let stack = new XStackContainer();
let errorField = new XTextField();
errorField.label = 'Label';
stack.add(errorField);

let textField = new XTextField();
textField.valueName = 'ttt';
textField.label = 'Text';
stack.add(textField);

form.add(stack);

ui = new FormEditContext(form);
ui.designValidationProvider = {
    getDesignValidationIssues: (control?: XBaseControl): ValidationIssue[] => {
        const valueName = Reflect.get(control!, 'valueName');

        if (valueName && valueName.length < 6) {
            return [
                new ValidationIssue('valueName must have at least 6 characters', valueName, control?.id, ValidationLevel.WARNING)
            ]
        }
        return []
    }
}

form.setFormEditContext(ui);

export const DesignPanelWithDesignTimeValidationIssue = Template.bind({}, {editContext: ui});



form = getFormConfig();
form.doNotScrollFirstContainerOnForm = true;
form.doNotScrollLastContainerOnForm = true;

ui = new FormEditContext(form);
form.setFormEditContext(ui);

export const DesignPanelWithPinSection = Template.bind({}, {editContext: ui});


form = new XFormConfiguration();
stack = new XStackContainer();
form.add(stack);
let hstack = new XHStackContainer();
form.add(hstack);

let columnContainer = new XColumnContainer();
form.add(columnContainer);

ui = new FormEditContext(form);
form.setFormEditContext(ui);

export const FormModeDesignPanelWithEmptyContainer = Template.bind({}, {editContext: ui});

form = new XFormConfiguration();

stack = new XStackContainer();
form.add(stack);

hstack = new XHStackContainer();
form.add(hstack);

columnContainer = new XColumnContainer();
form.add(columnContainer);

ui = new FormEditContext(form);
ui.mode = FormMode.LayoutDesign;
form.setFormEditContext(ui);

export const LayoutModeDesignPanelWithEmptyContainer = Template.bind({}, {editContext: ui});
