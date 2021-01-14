import {RegisterFlowStep} from "../Utilities/RegisterFlowStep";
import {TextIcon} from "../../CommonUI/TextIcon";
import {BaseFlowStep} from "./BaseFlowStep";
import {StepNameLabel} from "../CommonUI/StepNameLabel";
import {Button} from "@material-ui/core";
import React from "react";
import styled from "styled-components";
import {FlowStepOutput} from "../Structure/FlowStepOutput";
import { FlowStepOutputInstructions } from "../Structure/FlowStepOutputInstructions";

const FormStepDiv = styled.div`
    display: flex;
    flexDirection: row;
    padding: 5px;
    width: 100%;
`;

const FloatLeft = styled.div`
  display: flex;
  justify-content: flex-begin;
  margin-top: auto;
  margin-bottom: auto;
`;

const FloatRight = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  margin-left: auto;
`;

@RegisterFlowStep('UI', 'Form', <TextIcon name={'Form'}/>)
export class FormStep extends BaseFlowStep {

    render() {

        return (
            <FormStepDiv>
                <FloatLeft>
                    <StepNameLabel step={this}/>
                </FloatLeft>
                <FloatRight>
                    <Button variant={"outlined"}>Edit Form</Button>
                </FloatRight>
            </FormStepDiv>
        );
    }

    renderEditUI(): JSX.Element | null {
        return (
            <div>edit form step</div>
        );
    }

}