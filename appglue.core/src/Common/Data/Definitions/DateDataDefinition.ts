import {XDataTypes} from "../XDataDefinition";
import {BaseDataDefinition} from "./BaseDataDefinition";

export class DateDataDefinition extends BaseDataDefinition {
    readonly type: XDataTypes = XDataTypes.DATE;

    lowerBounds?: Date;
    upperBounds?: Date;
    storeTime: boolean = true;

    value?: Date | Date[];
    validValues: string[] = [];

    getValue(): any {
        return this.value;
    }
}