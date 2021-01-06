import {IFlowElement} from "./IFlowElement";
import { IPosition } from "../CommonUI/IPosition";

export interface IFlowStepSequence extends IFlowElement {
    x: number;
    y: number;

    getDestination(): IPosition;
}