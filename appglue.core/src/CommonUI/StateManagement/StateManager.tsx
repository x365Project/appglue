import React from "react";
import {listeners} from "cluster";


class ListenerRegistration {
    components: {component: React.Component, properties? : string[]}[] = [];
    functions: {function: Function, properties?: string[]}[] = [];
}

// todo, keep copy of old object, only send out updates if actual changes were made
export class StateManager {

    static readonly OBSERVERS_VALUE_NAME = '_____observers';

    static addObserver(
            observable: object,
            observer: React.Component | Function,
            properties: string[] = []): void {
        let observers = Reflect.get(observable, this.OBSERVERS_VALUE_NAME) as ListenerRegistration;

        if (!observers) {
            observers = new ListenerRegistration();
            Reflect.set(observable, this.OBSERVERS_VALUE_NAME, observers);
        }

        if (observer instanceof Function) {
            observers.functions.push({function: observer, properties: properties})
        } else {
            observers.components.push({component: observer, properties: properties});
        }
    }

    static removeObserver(
            observable: object,
            observer: React.Component | Function ): void {
        let observers = Reflect.get(observable, this.OBSERVERS_VALUE_NAME) as ListenerRegistration;

        if (observers) {
            if (observer instanceof Function) {
                let index = -1;
                for (let l of observers.functions) {
                    index++;
                    if (l.function === observer)
                        break;
                }
                if (index !== -1)
                    observers.functions.splice(index, 1);
            } else {
                let index = -1;
                for (let l of observers.components) {
                    index++;
                    if (l.component === observer)
                        break;
                }
                if (index !== -1)
                    observers.components.splice(index, 1);
            }

        }
    }


    static internalTriggerUpdate(observable: object, forProperty: string|undefined = undefined) {
        let observers = Reflect.get(observable, this.OBSERVERS_VALUE_NAME) as ListenerRegistration;

        if (observers) {
            for (let l of observers.components) {
             //   console.log('forcing update', l)
                if (forProperty && l.properties?.indexOf(forProperty) !== -1)
                    l.component.forceUpdate();

                if (!forProperty && (!l.properties || l.properties.length === 0))
                    l.component.forceUpdate();
            }

            for (let l of observers.functions) {
                //   console.log('forcing update', l)
                if (forProperty && l.properties?.indexOf(forProperty) !== -1)
                    l.function();

                if (!forProperty && (!l.properties || l.properties.length === 0))
                    l.function();
            }
        }

    }

    static changed(observable: object) {
        StateManager.internalTriggerUpdate(observable);
    }

    static propertyChanged(observable: object, property: string) {
        StateManager.internalTriggerUpdate(observable, property);
    }
}

// class ObserverHandler<T extends object> {
//     set(obj: object, prop: string, value: any) : boolean{
//         if (prop === 'age') {
//             if (!Number.isInteger(value)) {
//                 throw new TypeError('The age is not an integer');
//             }
//             if (value > 200) {
//                 throw new RangeError('The age seems invalid');
//             }
//         }
//
//         // The default behavior to store the value
//         Reflect.set(obj, prop, value);
//
//
//         // Indicate success
//         return true;
//     }
// };
//
// export class ObserverProxyFactory  {
//
//     static getProxy<T extends object>(target: T) : T {
//         return new Proxy<T>(target, new ObserverHandler<T>());
//     }
//
// }

export const action = (
    target: Object,
    propertyKey: string,
    descriptor: PropertyDescriptor
) => {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
        let retVal = originalMethod.apply(...args);
        StateManager.changed(target);
        return retVal;
    };
}
