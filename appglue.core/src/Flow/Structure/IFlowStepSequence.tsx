import {IFlowElement} from "./IFlowElement";

export interface IFlowStepSequence extends IFlowElement {
    x: number;
    y: number;
    desiredX: number;
    desiredY: number;

    reset() : void;
}