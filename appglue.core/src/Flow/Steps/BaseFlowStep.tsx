import React from "react";
import {StepNameLabel} from "../CommonUI/StepNameLabel";
import styled from "styled-components";
import {IFlowElement} from "../Structure/IFlowElement";
import {IFlowStep} from "../Structure/IFlowStep";
import {FlowStepOutput} from "../Structure/FlowStepOutput";
import {DataUtilities} from "../../Common/DataUtilities";
import {FlowStepOutputInstructions} from "../Structure/FlowStepOutputInstructions";

export const BasicStep = styled.div`
    width: 100%;
    padding-left: 7px;
    padding-right: 7px;
    padding-top: 3px;
    padding-bottom: 3px;
`;

export abstract class BaseFlowStep
    extends React.Component
    implements IFlowElement,
        IFlowStep {
    _id: string = DataUtilities.generateUniqueId();
    name?: string;

    // this is where we put instructions on what to do with non default paths
    nonDefaultOutputInstructions? : FlowStepOutputInstructions[];


    constructor() {
        super({}, {});

        this.name = Reflect.get(this, '__type');
    }

    render() {

        return (
            <BasicStep>
                <StepNameLabel step={this}/>
            </BasicStep>
        );
    }

    abstract renderEditUI(): JSX.Element | null ;


    abstract get outputs(): FlowStepOutput | FlowStepOutput[] | undefined | null ;

}