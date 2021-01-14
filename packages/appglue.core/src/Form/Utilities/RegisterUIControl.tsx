/*eslint no-useless-constructor: 0*/

// decorator function to create registry for unpacking json

export enum ControlType {
    Control = 'Control',
    Container = 'Container'
}

export function RegisterUIControl(category: string, name: string, typeOfControl: ControlType = ControlType.Control , icon?: JSX.Element) {
    return function<T extends {new(...any: any[]): object}> (constructorFunction: T) {

        constructorFunction.prototype.__type = name;
        UIControlRegistration[name] = new RegistrationData(constructorFunction, category, name, typeOfControl, icon);

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
    icon?: JSX.Element;
    typeOfControl: ControlType
    prototype: any;

    constructor(constructorFunction: Function, category: string, name: string, typeOfControl: ControlType = ControlType.Control, icon?: JSX.Element) {
        this.constructorFunction = constructorFunction;
        this.prototype = constructorFunction.prototype;
        this.category = category;
        this.name = name;
        this.icon = icon;
        this.typeOfControl = typeOfControl;
    }
}

export class ControlRegistrationClass {
    [key: string]: RegistrationData;
}

export const UIControlRegistration = new ControlRegistrationClass();
