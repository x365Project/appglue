import {XDataTreeValue} from "./XDataTreeValue";
import {ObjectDataDefinition} from "./Definitions/ObjectDataDefinition";
import {IDataDefinition} from "./Definitions/IDataDefinition";
import {IDataDefinitionOwner} from "./IDataDefinitionOwner";
import {StringDataDefinition} from "./Definitions/StringDataDefinition";
import {NumberDataDefinition} from "./Definitions/NumberDataDefinition";
import {BooleanDataDefinition} from "./Definitions/BooleanDataDefinition";
import {FileDataDefinition} from "./Definitions/FileDataDefinition";

export class XDataDefinition implements IDataDefinitionOwner{
    fields : IDataDefinition[] = [];
    value : {[propertyName: string] : any} = {}

    // returns valid json schema from object definition
    toJSONSchema(): string {
        return '';
    }

    // parses json schema into the object definitions.
    // - remove items that are not in schema
    // - adds items that are in schema
    // - adjust items that the schema changes values of
    // ** Throw error if schema is not valid


    // to add:
    //  - title
    //  - description
    //  - sub type on number
    // resolve url schema
    // resolve internal refs
    // one of?
    mergeJSONSchema(schema: string, removeItemsNotInSchema: boolean = false,  reorderElementsToMatchSchema: boolean = true) : void {
        let schemaObj = JSON.parse(schema);

        this.fields = XDataDefinition.parseSchemaNode(schemaObj, schemaObj, this, this.fields, removeItemsNotInSchema, reorderElementsToMatchSchema);
    }

    private static parseSchemaNode(
        fullSchema: object,
        schemaNode : object,
        owner: IDataDefinitionOwner,
        existingFields: IDataDefinition[],
        removeItemsNotInSchema: boolean,
        reorderElementsToMatchSchema: boolean ) : IDataDefinition[] {

        //https://json-schema.org/understanding-json-schema/index.html

        if (Reflect.get(schemaNode, "allOf"))
            throw 'allOf is not supported'
        if (Reflect.get(schemaNode, "anyOf"))
            throw 'anyOf is not supported'
        if (Reflect.get(schemaNode, "oneOf"))
            throw 'oneOf is not supported'
        if (Reflect.get(schemaNode, "not"))
            throw 'not is not supported'

        let newFieldsMap: { [fieldName: string]: IDataDefinition } = {};
        let newFieldList: IDataDefinition[] = [];

        let oldFieldsMap: { [fieldName: string]: IDataDefinition } = {};

        for (let oField of existingFields) {
            if (oField.name) {
                oldFieldsMap[oField.name] = oField;
            }
        }

        if (Reflect.get(schemaNode, 'type') === 'array') {
            // items
            // additional items
            // contains
        } else {
            // root might be array, not
            let properties = Reflect.get(schemaNode, 'properties');

            for (let property in properties) {
                let propDescription = properties[property];

                let def: IDataDefinition | undefined = undefined;
                if (propDescription.type === '#ref') {
                    // lookup local ref



                } else if (propDescription.type === 'array') {
// https://json-schema.org/understanding-json-schema/reference/array.html

                    // handle array

                    // check items property

                    // call recursively??
                    // unique
                    // single value
                    // objects
                    // tuples
                } else {
                    if (propDescription.type === 'string') {
                        // todo: emum
                        let sdef = oldFieldsMap[property] as StringDataDefinition ?? new StringDataDefinition();
                        sdef.name = property;
                        sdef.list = false;
                        sdef.owner = owner;
                        sdef.setValue(property + ' value');

                        let pattern = Reflect.get(propDescription, 'pattern') ;
                        if (pattern)
                            sdef.pattern = pattern;

                        def = sdef;
                    } else if (propDescription.type === 'boolean' ) {
                        let sdef = oldFieldsMap[property] as BooleanDataDefinition ?? new BooleanDataDefinition();
                        sdef.name = property;
                        sdef.list = false;
                        sdef.owner = owner;
                        sdef.setValue(false);
                        def = sdef;
                    } else if (propDescription.type === 'number' || propDescription.type === 'integer') {
                        let sdef = oldFieldsMap[property] as NumberDataDefinition ?? new NumberDataDefinition();
                        sdef.name = property;
                        sdef.list = false;
                        sdef.owner = owner;
                        sdef.setValue(10);


                        // check upper and lower bounds
                        let upperBound = Reflect.get(propDescription, "maximum");
                        if (upperBound) {
                            sdef.upperBounds = +upperBound;
                        }

                        let lowerBound = Reflect.get(propDescription, "minimum");
                        if (lowerBound) {
                            sdef.lowerBounds = +lowerBound;
                        }

                        sdef.allowDecimals = (propDescription.type === 'number');

                        def = sdef;
                    } else if (propDescription.type === 'null') {
                        // ignore
                    } else if (propDescription.type === 'object') {
                        let odef = oldFieldsMap[property] as ObjectDataDefinition ?? new ObjectDataDefinition();
                        odef.name = property;
                        odef.list = false;
                        odef.owner = owner;
                        odef.fields = this.parseSchemaNode(fullSchema, propDescription, owner, (oldFieldsMap[property] as ObjectDataDefinition)?.fields ?? [], removeItemsNotInSchema, reorderElementsToMatchSchema);
                        def = odef;
                    }
                }

                if (def && def.name) {
                    newFieldList.push(def);
                    newFieldsMap[def.name] = def;
                }
            }
        }

        return XDataDefinition.reconcileFieldList(
            removeItemsNotInSchema,
            reorderElementsToMatchSchema,
            newFieldList,
            newFieldsMap,
            existingFields)
    }

    static reconcileFieldList(removeItemsNotInSchema: boolean, reorderElementsToMatch: boolean, newFieldList: IDataDefinition[], newFieldsMap: { [p: string]: IDataDefinition }, existingFields: IDataDefinition[]) {
        if (removeItemsNotInSchema && reorderElementsToMatch) {
            return newFieldList;
        } else if (reorderElementsToMatch && !removeItemsNotInSchema) {
            for (let oldField of existingFields) {
                if (oldField.name && !newFieldsMap[oldField.name]) {
                    newFieldList.push(oldField);
                }
            }
            return newFieldList;
        } else if (!reorderElementsToMatch && !removeItemsNotInSchema) {
            let toSet: IDataDefinition[] = [];

            for (let oldField of existingFields) {
                if (oldField.name) {
                    if (!newFieldsMap[oldField.name]) {
                        toSet.push(oldField);
                    } else {
                        toSet.push(newFieldsMap[oldField.name])
                    }
                }
            }
            return toSet;
        } else { // if (!reorderElementsToMatch && removeItemsNotInSchema)
            let toSet: IDataDefinition[] = [];

            for (let oldField of existingFields) {
                if (oldField.name) {
                    if (!newFieldsMap[oldField.name]) {
                        // this field is being removed
                    } else {
                        toSet.push(newFieldsMap[oldField.name])
                    }
                }
            }

            return toSet;
        }
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
        this.fields = ObjectDataDefinition.parseFieldsForObject(
            this,
            data,
            this.fields,
            removeItemsNotInSchema,
            reorderElementsToMatch);

    }


// returns json as string
    toSampleJson(): string {
        return JSON.stringify(this.toSampleObject(), null, 2);
    }

    // build object from data definition
    toSampleObject(): object {
        return this.value;
    }

    getDataValues(type: XDataTypes | {}, isList: boolean): XDataTreeValue[] {
        return [];
    }

    getValueObject(): { [p: string]: any } {
        return this.value;
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




