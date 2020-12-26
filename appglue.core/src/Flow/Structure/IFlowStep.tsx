import {IFlowElement} from "./IFlowElement";
import {FlowStepOutput} from "./FlowStepOutput";
import {FlowStepOutputInstructions} from "./FlowStepOutputInstructions";

export interface IFlowStep extends IFlowElement {
    // add common stuff for steps here.
    outputs: FlowStepOutput | FlowStepOutput[] | undefined | null;

    // this is where we put instructions on what to do with non default paths
    nonDefaultOutputInstructions? : FlowStepOutputInstructions[];
}

