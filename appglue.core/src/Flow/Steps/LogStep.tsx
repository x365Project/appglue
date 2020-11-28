import {RegisterFlowStep} from "../Utilities/RegisterFlowStep";
import {TextIcon} from "../../CommonUI/TextIcon";
import {BaseFlowStep} from "./BaseFlowStep";
import React from "react";
import {FlowStepOutput} from "../Structure/FlowStepOutput";

@RegisterFlowStep('Utilities', 'Log', <TextIcon name={'Log'}/>)
export class LogStep extends BaseFlowStep {
    get outputs(): FlowStepOutput | FlowStepOutput[] | undefined | null {
        return new FlowStepOutput();
    }

    renderEditUI(): JSX.Element | null {
        return (
            <div>edit log step</div>
        );
    }

}