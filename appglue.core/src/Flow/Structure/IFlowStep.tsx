import {IFlowElement} from "./IFlowElement";
import {FlowStepOutput} from "./FlowStepOutput";

export interface IFlowStep extends IFlowElement {
    // add common stuff for steps here.
    outputs: FlowStepOutput | FlowStepOutput[] | undefined | null;
}