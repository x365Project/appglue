import {RegisterFlowStep} from "../Utilities/RegisterFlowStep";
import {TextIcon} from "../../CommonUI/TextIcon";
import {BaseFlowStep} from "./BaseFlowStep";
import React from "react";
import { FlowStepOutputInstructions } from "../Structure/FlowStepOutputInstructions";

@RegisterFlowStep('Utilities', 'Log', <TextIcon name={'Log'}/>)
export class LogStep extends BaseFlowStep {

    renderEditUI(): JSX.Element | null {
        return (
            <div>edit log step</div>
        );
    }

}