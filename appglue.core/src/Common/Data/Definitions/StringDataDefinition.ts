import {XDataTypes} from "../XDataDefinition";
import {BaseDataDefinition} from "./BaseDataDefinition";

export class StringDataDefinition extends BaseDataDefinition<string> {
    readonly type: XDataTypes = XDataTypes.STRING;

    validValues: string[] = [];
    format?: string | string[];
}