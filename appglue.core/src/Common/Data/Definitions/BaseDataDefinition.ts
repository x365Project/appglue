import {XDataTypes} from "../XDataDefinition";
import {IDataDefinition} from "./IDataDefinition";
import {IDataDefinitionOwner} from "../IDataDefinitionOwner";

export abstract class BaseDataDefinition<T> implements IDataDefinition {
    readonly abstract type: XDataTypes;
    name?: string;
    list: boolean = false;
    description?: string;
    valueIsDefault: boolean = false;
    owner? : IDataDefinitionOwner;

    getValue() : T | undefined {
        if (this.name && this.owner)
            return this.owner.value[this.name] as T;
        return ;
    }

    setValue(value: T) {
        if (this.name && this.owner) {
            console.log('setting value');
            this.owner.value[this.name] = value;
        } else {
            console.log('not setting value', this.name, this.owner);
        }
    }

    getListValue() : T[] | undefined {
        if (this.name && this.owner)
            return this.owner.value[this.name] as T[];
        return ;
    }

    setListValue(value: T[]) {
        if (this.name && this.owner)
            this.owner.value[this.name] = value;
    }

}