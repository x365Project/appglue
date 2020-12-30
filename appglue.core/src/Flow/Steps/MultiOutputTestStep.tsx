import {RegisterFlowStep} from "../Utilities/RegisterFlowStep";
import {TextIcon} from "../../CommonUI/TextIcon";
import {BaseFlowStep} from "./BaseFlowStep";
import React from "react";
import { FlowStepOutputInstructions } from "../Structure/FlowStepOutputInstructions";

@RegisterFlowStep('Utilities', 'Multi', <TextIcon name={'2x'}/>)
export class MultiOutputTestStep extends BaseFlowStep {
    
    constructor() {
        super();
        let output1 = new FlowStepOutputInstructions();
        let output2 = new FlowStepOutputInstructions('alt1');
        let output3 = new FlowStepOutputInstructions('alt2');
        this.nonDefaultOutputInstructions = [output1, output2, output3];
    }


    get outputs(): FlowStepOutputInstructions[] | undefined {
        return this.nonDefaultOutputInstructions;
    }

    renderEditUI(): JSX.Element | null {
        return (
            <div>edit multi step</div>
        );
    }

}