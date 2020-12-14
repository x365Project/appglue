/*eslint no-useless-constructor: 0*/

// decorator function to create registry for unpacking json


import {ExpressionExpectedType} from "../ExpressionExpectedType";

export function RegisterExpression(category: string, name: string,  icon: JSX.Element, valueType?:  ExpressionExpectedType, common: boolean = false) {
    return function<T extends {new(...any: any[]): object}> (constructorFunction: T) {

        constructorFunction.prototype.__type = constructorFunction.name;
        ExpressionRegistration.registrations[name] = new RegistrationData(constructorFunction, category, name,  icon, valueType, common);

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
    common: boolean;

    constructor(
            constructorFunction: Function,
            category: string,
            name: string,
            icon: JSX.Element,
            valueType?: ExpressionExpectedType,
            common: boolean = false) {
        this.constructorFunction = constructorFunction;
        this.prototype = constructorFunction.prototype;
        this.category = category;
        this.name = name;
        this.icon = icon;
        this.valueType = valueType;
        this.common = common;
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

    getExpressionByType(type: string) : RegistrationData | undefined {

        for (let r of Object.values(this.registrations)) {
            if (type === Reflect.get(r.prototype, '__type')) {
                return r;
            }
        }
        return undefined;
    }

    getExpressionsByCategory(category: string) : RegistrationData[] {
        return Object.values(this.registrations).filter((value: RegistrationData) => {
            return value.category === category;
        });
    }

    getCommonExpressions() : RegistrationData[] {
        return Object.values(this.registrations).filter((value: RegistrationData) => {
            return value.common;
        });
    }

    getRegistrationByName(name: string) : RegistrationData | null {
        return this.registrations[name];
    }

}

export const ExpressionRegistration = new ExpressionRegistrationClass();
