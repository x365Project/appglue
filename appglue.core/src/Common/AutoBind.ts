import React from "react";

// decorator to use to fix the javascript bind issue.
export function AutoBind(_: any, _2: string, descriptor: PropertyDescriptor) {

    const originMethod  = descriptor.value;
    const adjustedDescriptor: PropertyDescriptor = {
        configurable: true,
        enumerable: false,
        get() {
            const boundFunction = originMethod.bind(this);

            return boundFunction;
        }
    }
    return adjustedDescriptor;
}