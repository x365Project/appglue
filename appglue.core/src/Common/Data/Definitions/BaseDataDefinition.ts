import {XDataTypes} from "../XDataDefinition";
import {IDataDefinition} from "./IDataDefinition";

export abstract class BaseDataDefinition implements IDataDefinition {
    readonly abstract type: XDataTypes;
    name?: string;
    list: boolean = false;
    description?: string;
    valueIsDefault: boolean = false;

    abstract getValue(): any ;


}