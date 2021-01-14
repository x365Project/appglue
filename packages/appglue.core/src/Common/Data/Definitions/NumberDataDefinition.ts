import {XDataTypes} from "../XDataDefinition";
import {BaseDataDefinition} from "./BaseDataDefinition";

export class NumberDataDefinition extends BaseDataDefinition<number> {
    readonly type: XDataTypes = XDataTypes.NUMBER;

    lowerBounds?: number;
    upperBounds?: number;
    allowDecimals: boolean = true;
}