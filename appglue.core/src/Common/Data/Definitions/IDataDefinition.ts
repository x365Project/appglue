import {XDataTypes} from "../XDataDefinition";
import {IDataDefinitionOwner} from "../IDataDefinitionOwner";

export interface IDataDefinition{
    readonly type: XDataTypes;
    list: boolean;
    name?: string;
    description?: string;
    valueIsDefault: boolean;
    owner? : IDataDefinitionOwner;

}