import {DataUtilities} from "../../DataUtilities";
import {
    XDataDefinition,
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
import {IDataDefinitionOwner} from "../IDataDefinitionOwner";

export class ObjectDataDefinition
    extends BaseDataDefinition<object>
    implements IDataDefinitionOwner{
    readonly type: XDataTypes = XDataTypes.OBJECT;

    keyField?: string;
    fields: IDataDefinition[] = [];

    getValueObject(): { [propertyName: string]: any; } {
        if (this.owner && this.name)  {
            let valObj = this.owner.getValueObject()[this.name];

            if (!valObj) {
                valObj = {};
                this.owner.getValueObject()[this.name] = valObj;
            }

            // check array
            if (Array.isArray(valObj) != this.list) {
                if (this.list) {
                    // set array
                    valObj = [];
                    this.owner.getValueObject()[this.name] = valObj;
                } else {
                    // set object
                    valObj = {};
                    this.owner.getValueObject()[this.name] = valObj;
                }
            }

            return valObj;
        }
        // this should not happen
        return this.list ? [] : {};
    }


    static parseObject(
        owner: IDataDefinitionOwner,
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
            dateDef.owner = owner;
            dateDef.list = isList;
            if (isList) {
                dateDef.setListValue(data as Date[]);
            } else {
                dateDef.setValue(data as Date);
            }

            return dateDef;
        }

        // check if file
        if (DataUtilities.isValidFile(checkVal)) {
            let dateDef = currentDefinition as FileDataDefinition ?? new FileDataDefinition();

            dateDef.name = name;
            dateDef.owner = owner;
            dateDef.list = isList;

            if (isList) {
                dateDef.setListValue(data as FileData[]);
            } else {
                dateDef.setValue(data as FileData);
            }

            return dateDef;
        }

        // default parse as object

        let objectDef = currentDefinition as ObjectDataDefinition ?? new ObjectDataDefinition();
        objectDef.name = name;
        objectDef.owner = owner;

        objectDef.list = isList;

        if (isList) {
            objectDef.setListValue(data as object[]);
        } else {
            objectDef.setValue(data);
        }

        objectDef.fields = this.parseFieldsForObject(objectDef, checkVal, objectDef.fields, removeItemsNotInSchema, reorderElementsToMatch);

        return objectDef;
    }

    static parseFieldsForObject(
        owner: IDataDefinitionOwner,
        data: object,
        existingFields: IDataDefinition[],
        removeItemsNotInSchema: boolean,
        reorderElementsToMatch: boolean): IDataDefinition[] {
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
                    sdef.owner = owner;

                    if (isArray) {
                        //todo: handle date array
                        let dateArray: Date[] = [];

                        for (let dString of val) {
                            dateArray.push(DataUtilities.getDateFromString(dString));
                        }

                        sdef.setListValue(dateArray);
                    } else {
                        sdef.setValue(DataUtilities.getDateFromString(val));
                    }
                    sdef.list = isArray;

                    def = sdef;
                } else {
                    let sdef = oldFieldsMap[name] as StringDataDefinition ?? new StringDataDefinition();

                    sdef.name = name;
                    sdef.owner = owner;

                    if (isArray) {
                        sdef.setListValue(val);
                    } else {
                        sdef.setValue(val);
                    }

                    sdef.list = isArray;

                    def = sdef;
                }

            } else if (typeof checkVal === 'number') {
                let sdef = oldFieldsMap[name] as NumberDataDefinition ?? new NumberDataDefinition();
                sdef.name = name;
                sdef.owner = owner;
                if (isArray) {
                    sdef.setListValue(val);
                } else {
                    sdef.setValue(val);
                }
                sdef.list = isArray;

                def = sdef;
            } else if (typeof checkVal === 'boolean') {
                let sdef = oldFieldsMap[name] as BooleanDataDefinition ?? new BooleanDataDefinition();
                sdef.name = name;
                sdef.owner = owner;
                if (isArray) {
                    sdef.setListValue(val);
                } else {
                    sdef.setValue(val);
                }
                sdef.list = isArray;

                def = sdef;
            } else {
                def = ObjectDataDefinition.parseObject(
                    owner,
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
        return XDataDefinition.reconcileFieldList(
            removeItemsNotInSchema,
            reorderElementsToMatch,
            newFieldList,
            newFieldsMap,
            existingFields);
    }



    getValue(): object | undefined {
        return this.getValueObject();
    }

    setValue(value: object) {
        if (this.owner && this.name)  {
            this.owner.getValueObject()[this.name] = value;
        }
    }

    getListValue(): object[] | undefined {
        return this.getValueObject() as object[];
    }

    setListValue(value: object[]) {
        if (this.owner && this.name)  {
            this.owner.getValueObject()[this.name] = value;
        }
    }
}