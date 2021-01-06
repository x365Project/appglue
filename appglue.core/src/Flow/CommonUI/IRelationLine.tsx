import { IPosition } from "./IPosition";
import { IFlowStepSequence } from "../Structure/IFlowStepSequence";

export interface IRelationLine {
    forStepId: string;
    forStepPath: string;
    from: IPosition;
    to: IFlowStepSequence
}