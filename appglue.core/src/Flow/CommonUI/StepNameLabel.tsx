
import {InlineTextEdit} from "../../CommonUI/InlineTextEdit";
import React from "react";
import {BaseFlowStep} from "../Steps/BaseFlowStep";
import {FlowEditContext} from "../FlowEditContext";

export interface StepNameLabelProps {
    step: BaseFlowStep;
}

export function StepNameLabel(props: StepNameLabelProps) {
    return(
        <InlineTextEdit text={props.step.name ?? 'Step Name'} onEdit={(val: string) => {
                props.step.name = val;
                props.step.forceUpdate();
            }}
        />
    )
}

