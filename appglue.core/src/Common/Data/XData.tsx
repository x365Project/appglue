import {XDataDefinition, XDataTypes} from "./XDataDefinition";
import {XDataTreeValue} from "./XDataTreeValue";

export class XData {
    data: { [name: string]: any } = {};
    definition?: XDataDefinition;


    constructor(data?: { }, definition?: XDataDefinition) {
        if (data)
            this.data = data;
        if (definition)
            this.definition = definition;
    }

    // can be name or name.name
    getValue(name: string): any {
        return Reflect.get(this.data, name);
    }

    // can be name or name.name
    setValue(name: string, value: any): void {
        Reflect.set(this.data, name, value);
    }

    // returns all data
    getData(): object {
        return this.data;
    }

    getDataValues(type: XDataTypes | {}, isList: boolean): XDataTreeValue[] {
        return [];
    }


}

