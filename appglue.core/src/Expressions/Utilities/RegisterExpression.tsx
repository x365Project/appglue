/*eslint no-useless-constructor: "ignore"*/

// decorator function to create registry for unpacking json


import {ExpressionExpectedType} from "../ExpressionExpectedType";

export function RegisterExpression(category: string, name: string,  icon: JSX.Element, valueType?:  ExpressionExpectedType) {
    return function<T extends {new(...any: any[]): object}> (constructorFunction: T) {

        constructorFunction.prototype.__type = constructorFunction.name;
        ExpressionRegistration[name] = new RegistrationData(constructorFunction, category, name,  icon, valueType);

        return class extends constructorFunction {
            constructor(...any: any[]) {
                super(...any);
            }
        };
    }
}

export class RegistrationData {
    constructorFunction: Function;
    category : string;
    name: string;
    icon: JSX.Element;
    valueType? : ExpressionExpectedType;
    prototype: any;

    constructor(constructorFunction: Function, category: string, name: string, icon: JSX.Element, valueType?: ExpressionExpectedType ) {
        this.constructorFunction = constructorFunction;
        this.prototype = constructorFunction.prototype;
        this.category = category;
        this.name = name;
        this.icon = icon;
        this.valueType = valueType;
    }
}

export class ExpressionRegistrationClass {
    [key: string]: RegistrationData;
}

export const ExpressionRegistration = new ExpressionRegistrationClass();
