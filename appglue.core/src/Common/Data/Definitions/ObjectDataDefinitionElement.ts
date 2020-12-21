import {DataUtilities} from "../../DataUtilities";
import {
    XDataTypes
} from "../XDataDefinition";
import {NumberDataDefinition} from "./NumberDataDefinition";
import {DateDataDefinition} from "./DateDataDefinition";
import {StringDataDefinition} from "./StringDataDefinition";
import {BooleanDataDefinition} from "./BooleanDataDefinition";
import {BaseDataDefinition} from "./BaseDataDefinition";
import {IDataDefinition} from "./IDataDefinition";
import {FileDataDefinition} from "./FileDataDefinition";
import {FileData} from "../../FileData";

export class ObjectDataDefinitionElement extends BaseDataDefinition {
    readonly type: XDataTypes = XDataTypes.OBJECT;

    keyField?: string;
    fields: IDataDefinition[] = [];

    // todo: come back here
    getValue(): any {
    }

    static parseObject(
        checkVal: object,
        data: object,
        isList: boolean,
        name: string,
        currentDefinition: IDataDefinition,
        removeItemsNotInSchema: boolean,
        reorderElementsToMatch: boolean): IDataDefinition | null {
        // check if date
        if (DataUtilities.isValidDate(checkVal)) {
            let dateDef = currentDefinition as DateDataDefinition ?? new DateDataDefinition();

            dateDef.name = name;
            dateDef.list = isList;
            dateDef.value = data as Date;

            return dateDef;
        }

        // check if file
        if (DataUtilities.isValidFile(checkVal)) {
            let dateDef = currentDefinition as FileDataDefinition ?? new FileDataDefinition();

            dateDef.name = name;
            dateDef.list = isList;
            dateDef.value = data as FileData;

            return dateDef;
        }

        // default parse as object

        let objectDef = currentDefinition as ObjectDataDefinitionElement ?? new ObjectDataDefinitionElement();
        objectDef.name = name;
        objectDef.list = isList;
        objectDef.fields = this.parseFieldsForObject(checkVal, objectDef.fields, removeItemsNotInSchema, reorderElementsToMatch);

        return objectDef;
    }

    static parseFieldsForObject(data: object, existingFields: IDataDefinition[], removeItemsNotInSchema: boolean, reorderElementsToMatch: boolean): IDataDefinition[] {
        let newFieldsMap: { [fieldName: string]: IDataDefinition } = {};
        let newFieldList: IDataDefinition[] = [];

        let oldFieldsMap: { [fieldName: string]: IDataDefinition } = {};

        for (let oField of existingFields) {
            if (oField.name) {
                oldFieldsMap[oField.name] = oField;
            }
        }

        for (let name in data) {
            let val = Reflect.get(data, name);
            let checkVal = val;

            let isArray = false;
            if (Array.isArray(val)) {
                isArray = true;
                checkVal = val[0];
            }

            let def: IDataDefinition | null = null;
            if (typeof checkVal === 'string') {
                // see if it is a date string
                if (DataUtilities.isDateString(checkVal)) {
                    let sdef = oldFieldsMap[name] as DateDataDefinition ?? new DateDataDefinition();
                    sdef.name = name;

                    if (isArray) {
                        //todo: handle date array
                    } else {
                        sdef.value = DataUtilities.getDateFromString(val);
                    }
                    sdef.list = isArray;

                    def = sdef;

                } else {
                    let sdef = oldFieldsMap[name] as StringDataDefinition ?? new StringDataDefinition();
                    sdef.name = name;
                    sdef.value = val;
                    sdef.list = isArray;

                    def = sdef;
                }

            } else if (typeof checkVal === 'number') {
                let sdef = oldFieldsMap[name] as NumberDataDefinition ?? new NumberDataDefinition();
                sdef.name = name;
                sdef.value = val;
                sdef.list = isArray;

                def = sdef;
            } else if (typeof checkVal === 'boolean') {
                let sdef = oldFieldsMap[name] as BooleanDataDefinition ?? new BooleanDataDefinition();
                sdef.name = name;
                sdef.value = val;
                sdef.list = isArray;

                def = sdef;
            } else {
                def = ObjectDataDefinitionElement.parseObject(
                    checkVal,
                    val,
                    isArray,
                    name,
                    oldFieldsMap[name],
                    removeItemsNotInSchema,
                    reorderElementsToMatch);
            }

            if (def && def.name) {
                newFieldsMap[def.name] = def;
                newFieldList.push(def);
            }
        }

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

}