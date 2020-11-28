/*eslint no-useless-constructor: "ignore"*/

// decorator function to create registry for unpacking json



export function RegisterFlowStep(category: string, name: string,  icon: JSX.Element) {
    return function<T extends {new(...any: any[]): object}> (constructorFunction: T) {

        constructorFunction.prototype.__type = constructorFunction.name;
        FlowStepRegistration[name] = new RegistrationData(constructorFunction, category, name,  icon);

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
    prototype: any;

    constructor(constructorFunction: Function, category: string, name: string, icon: JSX.Element) {
        this.constructorFunction = constructorFunction;
        this.prototype = constructorFunction.prototype;
        this.category = category;
        this.name = name;
        this.icon = icon;
    }
}

export class FlowStepRegistrationClass {
    [key: string]: RegistrationData;
}

export const FlowStepRegistration = new FlowStepRegistrationClass();
