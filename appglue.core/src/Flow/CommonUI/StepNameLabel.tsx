
import {InlineTextEdit} from "../../CommonUI/InlineTextEdit";
import React from "react";
import {FlowEditContext} from "../XFlowEditor";
import {BaseFlowStep} from "../Steps/BaseFlowStep";

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

