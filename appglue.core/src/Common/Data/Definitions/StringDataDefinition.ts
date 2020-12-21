import {XDataTypes} from "../XDataDefinition";
import {BaseDataDefinition} from "./BaseDataDefinition";

export class StringDataDefinition extends BaseDataDefinition {
    readonly type: XDataTypes = XDataTypes.STRING;

    value?: string;
    validValues: string[] = [];
    format?: string | string[];

    getValue(): any {
        return this.value;
    }
}