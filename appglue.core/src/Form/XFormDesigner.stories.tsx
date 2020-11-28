import React from "react";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import {Meta, Story} from "@storybook/react/types-6-0";
import {XFormDesigner} from "./XFormDesigner";
import { XFormConfiguration } from "./XFormConfiguration";
import { IAction } from "../CommonUI/IAction";
import { getFormConfig } from "./Testing/FormTestData";
import styled from "styled-components";
import { InfoIcon } from "../CommonUI/Icon/InfoIcon";
import { Typography } from "@material-ui/core";
import { TextIcon } from "../CommonUI/TextIcon";

export default {
    title: "Form Designer/Designer",
    parameters: {
    }
} as Meta;


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

const Template: Story<{
    form: XFormConfiguration;
    topDesignerExtensions?: IAction[],
    bottomDesignerExtensions?: IAction[],
}> = (args) => <XFormDesigner {...args} />;

let ui = getFormConfig();

export const FormDesignerExtensionPanels = Template.bind({}, {form: ui, topDesignerExtensions: [new TopExtensionPanel()], bottomDesignerExtensions: [new BottomExtensionPanel()]});

