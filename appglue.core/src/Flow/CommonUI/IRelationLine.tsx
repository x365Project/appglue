import { IPosition } from "./IPosition";

export interface IRelationLine {
    from: {
        position: IPosition,
        forStepId: string;
        forStepPath: string;
    },
    to: IPosition
}