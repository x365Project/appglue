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
            return this.owner.getValueObject()[this.name] as T;
        return ;
    }

    setValue(value: T) {
        if (this.name && this.owner) {
            this.owner.getValueObject()[this.name] = value;
        }
    }

    getListValue() : T[] | undefined {
        if (this.name && this.owner)
            return this.owner.getValueObject()[this.name] as T[];
        return ;
    }

    setListValue(value: T[]) {
        if (this.name && this.owner)
            this.owner.getValueObject()[this.name] = value;
    }

}