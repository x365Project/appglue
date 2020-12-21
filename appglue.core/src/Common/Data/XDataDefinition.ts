import {XDataTreeValue} from "./XDataTreeValue";
import {ObjectDataDefinitionElement} from "./Definitions/ObjectDataDefinitionElement";
import {IDataDefinition} from "./Definitions/IDataDefinition";

export class XDataDefinition {
    fields : IDataDefinition[] = [];
    value : {[propertyName: string] : any} = {}

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
        this.fields = ObjectDataDefinitionElement.parseFieldsForObject(data, this.fields, removeItemsNotInSchema, reorderElementsToMatch);
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




