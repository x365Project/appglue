import {XDataTypes} from "../XDataDefinition";
import {BaseDataDefinition} from "./BaseDataDefinition";

export class DateDataDefinition extends BaseDataDefinition<Date> {
    readonly type: XDataTypes = XDataTypes.DATE;

    lowerBounds?: Date;
    upperBounds?: Date;
    storeTime: boolean = true;

}