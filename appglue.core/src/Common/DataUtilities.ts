// this is stored off so we not need to check each time
import React from "react";
import { Guid } from "guid-typescript";

const reactProperties = Object.getOwnPropertyNames(new React.Component({}));

export function cloneWithoutReact(value: object, alsoExclude: string[] = []): object {

    let output = {};

    for (var i in value) {
        if (reactProperties.indexOf(i) !== -1) continue;

        if (i === 'data') continue;
        if (i === 'isReactComponent') continue;

        if (alsoExclude.indexOf(i) !== -1){
            // excluding
        } else {
            Reflect.set(output, i, Reflect.get(value, i));
        }

    }

    return output;
}
 
export function spreadData(value: object, dataToSpread: object, exclude?: string[]): void {


    for (var i in dataToSpread) {


        if (exclude && exclude.length !== 0) {
            if (exclude.indexOf(i) !== -1) continue;
        }

        Reflect.set(value, i, Reflect.get(dataToSpread, i));
    }

}


export function generateUniqueId() : string {
    return Guid.create().toString();
}