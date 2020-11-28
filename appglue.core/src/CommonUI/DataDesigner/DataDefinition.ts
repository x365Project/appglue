import {FileData} from "../../Common/FileData";

export class DataDefinition {
    fields : IDataDefinition[] = [];

    // returns valid json schema from object definition
    toJSONSchema(): string {
        return '';
    }

    // parses json schema into the object definitions.
    // - remove items that are not in schema
    // - adds items that are in schema
    // - ajust items that the schema changes values of
    // ** Throw error if schema is not valid
    mergeJSONSchema(schema: string, removeItemsNotInSchema: boolean = false,  recorderElementsToMatch: boolean = true) : void {

    }

    // parses json schema into the object definitions.
    // ** JSON is evaluated to see to determine the type of each element **
    // - remove items that are not in schema
    // - adds items that are in schema
    // - adjust items that the schema changes values of
    // ** Throw error if schema is not valid
    // ** change order of elements to match json
    mergeJSON(json: string, removeItemsNotInSchema: boolean = false, recorderElementsToMatch: boolean = true) : void {

    }

    // returns json as string
    toSampleJson(): string {
        return JSON.stringify(this.toSampleObject(), null, 2);
    }

    // build object from data definition
    toSampleObject(): object {
        return {};
    }

}

export enum XDataTypes {
    STRING= 'string',
    NUMBER= 'number',
    BOOLEAN='boolean',
    DATE='date',
    FILE='file',
    OBJECT='object',
    UNDEFINED='undefined'

}

export interface IDataDefinition {
    readonly type: XDataTypes;
    list: boolean;
    name?: string;
    description?: string;
    valueIsDefault: boolean

}

abstract class BaseDataDefinition implements IDataDefinition {
    readonly abstract type: XDataTypes;
    name?: string;
    list: boolean = false ;
    description?: string;
    valueIsDefault: boolean = false;

}

export class UndefinedDataDefinition extends BaseDataDefinition{
    readonly type: XDataTypes = XDataTypes.UNDEFINED;

}

export class BooleanDataDefinition extends BaseDataDefinition{
    readonly type: XDataTypes = XDataTypes.BOOLEAN;

    value?: boolean | boolean[];
}

export class StringDataDefinition extends BaseDataDefinition{
    readonly type: XDataTypes = XDataTypes.STRING;

    value?: string;
    validValues: string[] = [];
    format?: string | string[];
}

export class DateDataDefinition extends BaseDataDefinition{
    readonly type: XDataTypes = XDataTypes.DATE;

    lowerBounds? : Date;
    upperBounds? : Date;
    storeTime : boolean = true;

    value?: Date | Date[];
    validValues: string[] = [];
}

export class NumberDataDefinition extends BaseDataDefinition{
    readonly type: XDataTypes = XDataTypes.STRING;

    value?: number | number[];

    lowerBounds? : number;
    upperBounds? : number;
    allowDecimals : boolean = true;
}

export class FileDataDefinition extends BaseDataDefinition{
    readonly type: XDataTypes = XDataTypes.FILE;

    value?: FileData | FileData[];

}

export class ObjectDataDefinitionElement extends BaseDataDefinition{
    readonly type: XDataTypes = XDataTypes.OBJECT;

    keyField?: string;
    fields : IDataDefinition[] = [];

}




