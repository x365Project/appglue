import {RegisterFlowStep} from "../Utilities/RegisterFlowStep";
import {TextIcon} from "../../CommonUI/TextIcon";
import {BaseFlowStep} from "./BaseFlowStep";
import React from "react";
import {FlowStepOutput} from "../Structure/FlowStepOutput";

@RegisterFlowStep('Utilities', 'Multi', <TextIcon name={'2x'}/>)
export class MultiOutputTestStep extends BaseFlowStep {
    get outputs(): FlowStepOutput | FlowStepOutput[] | undefined | null {
        let outputs: FlowStepOutput[] = [];
        let output = new FlowStepOutput();
        outputs.push(output);
        output = new FlowStepOutput('alt1');
        outputs.push(output);
        output = new FlowStepOutput('alt2');
        outputs.push(output);
        return outputs;
    }

    renderEditUI(): JSX.Element | null {
        return (
            <div>edit multi step</div>
        );
    }

}