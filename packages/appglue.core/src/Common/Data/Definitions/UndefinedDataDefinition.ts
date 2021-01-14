import {XDataTypes} from "../XDataDefinition";
import {BaseDataDefinition} from "./BaseDataDefinition";

export class UndefinedDataDefinition extends BaseDataDefinition<any> {
    readonly type: XDataTypes = XDataTypes.UNDEFINED;

}