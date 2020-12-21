import {XDataTypes} from "../XDataDefinition";
import {BaseDataDefinition} from "./BaseDataDefinition";

export class BooleanDataDefinition extends BaseDataDefinition {
    readonly type: XDataTypes = XDataTypes.BOOLEAN;

    value?: boolean | boolean[];

    getValue(): any {
        return this.value;
    }
}