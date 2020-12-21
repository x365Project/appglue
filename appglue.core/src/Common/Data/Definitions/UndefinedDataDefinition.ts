import {XDataTypes} from "../XDataDefinition";
import {BaseDataDefinition} from "./BaseDataDefinition";

export class UndefinedDataDefinition extends BaseDataDefinition {
    readonly type: XDataTypes = XDataTypes.UNDEFINED;

    getValue(): any {
    }
}