import {XDataTypes} from "../XDataDefinition";
import {BaseDataDefinition} from "./BaseDataDefinition";

export class NumberDataDefinition extends BaseDataDefinition {
    readonly type: XDataTypes = XDataTypes.NUMBER;

    value?: number | number[];

    lowerBounds?: number;
    upperBounds?: number;
    allowDecimals: boolean = true;

    getValue(): any {
        return this.value;
    }
}