import {FileData} from "../FileData";
import {XDataTreeValue} from "./XDataTreeValue";

export class XDataDefinition {
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
    // ** Throw error if json is not valid
    // ** change order of elements to match json
    mergeJSON(json: string, removeItemsNotInSchema: boolean = false, reorderElementsToMatch: boolean = true) : void {
        this.mergeObject(JSON.parse(json), removeItemsNotInSchema, reorderElementsToMatch);
    }

    // updates data definition with values from object
    mergeObject(data: object,  removeItemsNotInSchema: boolean = false, reorderElementsToMatch: boolean = true) {
        for (let name in data) {
            let val = Reflect.get(data, name);
            let checkVal = val;

            let isArray = false;
            if (Array.isArray(val)) {
                isArray = true;
                checkVal = val[0];
            }

            let def : IDataDefinition | null = null;
            if (typeof checkVal === 'string') {
                let sdef = new StringDataDefinition();
                sdef.name = name;
                sdef.value = val;
                sdef.list = isArray;

                def = sdef;
            } else if (typeof checkVal === 'number') {
                let sdef = new NumberDataDefinition();
                sdef.name = name;
                sdef.value = val;
                sdef.list = isArray;

                def = sdef;
            } else if (typeof checkVal === 'boolean') {
                let sdef = new BooleanDataDefinition();
                sdef.name = name;
                sdef.value = val;
                sdef.list = isArray;

                def = sdef;
            } else {
                throw 'could not parse ' + name;
            }

            if (def)
                this.fields.push(def);
        }
    }

    // returns json as string
    toSampleJson(): string {
        return JSON.stringify(this.toSampleObject(), null, 2);
    }

    // build object from data definition
    toSampleObject(): object {
        let sample = {};
        for (let def of this.fields) {
            let val = def.getValue();

            if (val && def.name) {
                Reflect.set(sample, def.name, val);
            }
        }
        return sample;
    }

    getDataValues(type: XDataTypes | {}, isList: boolean): XDataTreeValue[] {
        return [];
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

    getValue() : any;

}

abstract class BaseDataDefinition implements IDataDefinition {
    readonly abstract type: XDataTypes;
    name?: string;
    list: boolean = false ;
    description?: string;
    valueIsDefault: boolean = false;

    abstract getValue(): any ;


}

export class UndefinedDataDefinition extends BaseDataDefinition{
    readonly type: XDataTypes = XDataTypes.UNDEFINED;

    getValue(): any {
    }
}

export class BooleanDataDefinition extends BaseDataDefinition{
    readonly type: XDataTypes = XDataTypes.BOOLEAN;

    value?: boolean | boolean[];

    getValue(): any {
        return this.value;
    }
}

export class StringDataDefinition extends BaseDataDefinition{
    readonly type: XDataTypes = XDataTypes.STRING;

    value?: string;
    validValues: string[] = [];
    format?: string | string[];

    getValue(): any {
        return this.value;
    }
}

export class DateDataDefinition extends BaseDataDefinition{
    readonly type: XDataTypes = XDataTypes.DATE;

    lowerBounds? : Date;
    upperBounds? : Date;
    storeTime : boolean = true;

    value?: Date | Date[];
    validValues: string[] = [];

    getValue(): any {
        return this.value;
    }
}

export class NumberDataDefinition extends BaseDataDefinition{
    readonly type: XDataTypes = XDataTypes.STRING;

    value?: number | number[];

    lowerBounds? : number;
    upperBounds? : number;
    allowDecimals : boolean = true;

    getValue(): any {
        return this.value;
    }
}

export class FileDataDefinition extends BaseDataDefinition{
    readonly type: XDataTypes = XDataTypes.FILE;

    value?: FileData | FileData[];

    getValue(): any {
        return this.value;
    }
}

export class ObjectDataDefinitionElement extends BaseDataDefinition{
    readonly type: XDataTypes = XDataTypes.OBJECT;

    keyField?: string;
    fields : IDataDefinition[] = [];

    // todo: come back here
    getValue(): any {
    }

    static parseDefinition(data: object) : IDataDefinition | null {
        // check if date

        // check if file

        // parse as object

        return null;
    }
}




