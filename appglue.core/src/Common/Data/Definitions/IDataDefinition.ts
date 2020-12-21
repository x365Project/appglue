import {XDataTypes} from "../XDataDefinition";

export interface IDataDefinition {
    readonly type: XDataTypes;
    list: boolean;
    name?: string;
    description?: string;
    valueIsDefault: boolean

    getValue(): any;

}