import React from "react";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from "@storybook/react/types-6-0";
import styled from "styled-components";
import { Typography } from "@material-ui/core";

import {InfoIcon} from "../../CommonUI/Icon/InfoIcon";
import {TextIcon} from "../../CommonUI/TextIcon";
import { XFormDesigner } from "../XFormDesigner";
import { XFormConfiguration } from "../XFormConfiguration";
import { getFormConfig } from "../Testing/FormTestData";
import { IAction } from "../../CommonUI/IAction";

let ui = getFormConfig();

export interface XFormDesignerProps {
    form: XFormConfiguration;
}


export default {
    title: "Form Designer/Designer",
    component: XFormDesigner,
} as Meta;

const Template: Story<{
    form: XFormConfiguration;
    topDesignerExtensions?: IAction[],
    bottomDesignerExtensions?: IAction[],
}> = (args) => <XFormDesigner {...args} />;

const MissingTemplate: Story<{}> = () => (
    <div>
        Missing
    </div>
);


export const AllControls = Template.bind({}, {form: ui});

ui = new XFormConfiguration()

export const NoControls = Template.bind({}, {form: ui});

ui = new XFormConfiguration();

export const FormTitle = Template.bind({}, {form: ui, formName: 'Test Form'});

ui = new XFormConfiguration();
export const SaveButton = Template.bind({}, {form: ui, onFormSave: (data: any) => {}});

ui = getFormConfig();
ui.doNotScrollLastContainerOnForm = true;
ui.doNotScrollFirstContainerOnForm = true;

export const PinnedSections = Template.bind({}, {form: ui});

ui = new XFormConfiguration();
export const CloseXAction = Template.bind({}, {form: ui, onFormClose: (data: any) => {}});

export const BringUpInDialogByButton = MissingTemplate.bind({}, {form: ui});



const Wrapper = styled("div")<{
    width?: number;
    height?: number;
    backgroundColor?: string;
}>`
  flex: 1;
  display: flex;
  flex-flow: column;
  background: ${props => props.backgroundColor || 'transparent'}
`;

class TopExtensionPanel implements IAction {

    name = 'Info';
    icon = <InfoIcon />

    renderUI() {
        return (
            <Wrapper backgroundColor="gray">
                <div>
                    <Typography>
                        Information
                    </Typography>
                </div>
            </Wrapper>
        )
    }
}

class BottomExtensionPanel implements IAction {
    name = 'Doc';
    icon = <TextIcon name="D" />

    renderUI() {
        return (
            <Wrapper backgroundColor="green">
                <div>
                    <Typography>
                        Documentation
                    </Typography>
                </div>
            </Wrapper>
        )
    }
}

ui = getFormConfig();

export const FormDesignerExtensionPanels = Template.bind({}, {form: ui, topDesignerExtensions: [new TopExtensionPanel()], bottomDesignerExtensions: [new BottomExtensionPanel()]});
