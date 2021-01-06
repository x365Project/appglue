import {IFlowElement} from "./IFlowElement";
import {FlowStepOutputInstructions} from "./FlowStepOutputInstructions";
import {FlowStepOutput} from "./FlowStepOutput";

export interface IFlowStep extends IFlowElement {
    // add common stuff for steps here.
    getOutcomes(): FlowStepOutput[] | undefined;
    getOutcomeInstructions() : FlowStepOutputInstructions[];
}

