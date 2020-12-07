// this is stored off so we not need to check each time
import React from "react";
import { Guid } from "guid-typescript";
import * as util from "util";

export class DataUtilities {
    static reactProperties = Object.getOwnPropertyNames(new React.Component({}));

    static compare(v1: object, v2: object) : boolean {
        return util.isDeepStrictEqual(v1, v2);

        return true;
    }

    static clone(value: object): object {
        //todo: deep clone
        //todo: skip data members that should not be cloned
        //todo: check for recursion
        //todo: skip properties that should not be cloned

        let output = {...value};

        return output;
    }

    static cloneWithoutReact(value: object, alsoExclude: string[] = []): object {

        let output = {};

        for (var i in value) {
            if (this.reactProperties.indexOf(i) !== -1) continue;

            if (i === 'isReactComponent') continue;

            if (alsoExclude.indexOf(i) !== -1){
                // excluding
            } else {
                // these are special properties we do not want in output
                if (!i.startsWith('_____'))
                    Reflect.set(output, i, Reflect.get(value, i));
            }

        }

        return output;
    }

    static spreadData(value: object, dataToSpread: object, exclude?: string[]): void {


        for (var i in dataToSpread) {


            if (exclude && exclude.length !== 0) {
                if (exclude.indexOf(i) !== -1) continue;
            }

            Reflect.set(value, i, Reflect.get(dataToSpread, i));
        }

    }

    static generateUniqueId() : string {
        return Guid.create().toString();
    }
}




