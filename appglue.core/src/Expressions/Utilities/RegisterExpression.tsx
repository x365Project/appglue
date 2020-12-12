/*eslint no-useless-constructor: 0*/

// decorator function to create registry for unpacking json


import {ExpressionExpectedType} from "../ExpressionExpectedType";

export function RegisterExpression(category: string, name: string,  icon: JSX.Element, valueType?:  ExpressionExpectedType) {
    return function<T extends {new(...any: any[]): object}> (constructorFunction: T) {

        constructorFunction.prototype.__type = constructorFunction.name;
        ExpressionRegistration.registrations[name] = new RegistrationData(constructorFunction, category, name,  icon, valueType);

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
     registrations : {[key: string]: RegistrationData} = {};

    getCategories() : string[] {
        let categories : string[] = [];

        for (let reg of Object.values(this.registrations)) {
            if (categories.indexOf(reg.category) === -1)
                categories.push(reg.category);
        }
        return categories;
    }

    getExpressionsByCategory(category: string) : RegistrationData[] {
        return Object.values(this.registrations).filter((value: RegistrationData) => {
            return value.category === category;
        });
    }

    getCommonExpressions() : RegistrationData[] {
        return [];
    }

    getRegistrationByName(name: string) : RegistrationData | null {
        return this.registrations[name];
    }

}

export const ExpressionRegistration = new ExpressionRegistrationClass();
