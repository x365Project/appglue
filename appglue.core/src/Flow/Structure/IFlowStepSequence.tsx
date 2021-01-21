import {IFlowElement} from "./IFlowElement";

export interface IFlowStepSequence extends IFlowElement {
    readonly sequenceType : 'standard' | 'pathcandidate' | 'candidate';
    x: number;
    y: number;
    desiredX: number;
    desiredY: number;

    reset() : void;

    getElementId() : string;

}