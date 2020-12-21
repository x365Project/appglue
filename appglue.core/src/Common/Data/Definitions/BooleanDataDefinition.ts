import {XDataTypes} from "../XDataDefinition";
import {BaseDataDefinition} from "./BaseDataDefinition";

export class BooleanDataDefinition extends BaseDataDefinition<boolean> {
    readonly type: XDataTypes = XDataTypes.BOOLEAN;

}