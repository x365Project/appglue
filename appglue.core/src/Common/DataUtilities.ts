// this is stored off so we not need to check each time
import React from "react";
import { Guid } from "guid-typescript";
import * as util from "util";
import {FileData} from "./FileData";

export class DataUtilities {
    static reactProperties = Object.getOwnPropertyNames(new React.Component({}));

    static compare(v1: object, v2: object) : boolean {

        // we are cloning to get rid of stuff we do not want to compare
        return util.isDeepStrictEqual(this.clone(v1) , this.clone(v2));
   }

    static clone(value: object): object {
        let output = {};

        for (var i in value) {
            if (this.reactProperties.indexOf(i) !== -1) continue;

            if (i === 'isReactComponent') continue;

            // these are special properties we do not want in output
            if (!i.startsWith('_____'))
                Reflect.set(output, i, Reflect.get(value, i));

        }

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

    static isValidDate(possibleDate: object) : boolean {
        // todo: might need to do more here
        return possibleDate instanceof Date;
    }

    static isValidFile(possibleFile: object) : boolean {
        return this.compareObjectStructure(possibleFile, new FileData());
    }

    // ensure object has all the values and functions that matchesObject has
    static compareObjectStructure(object: object, matchesObject: object) : boolean {
        const keys1 = Object.keys(object);
        const keys2 = Object.keys(matchesObject);

        for (let key of keys2) {
            if (keys1.indexOf(key) === -1) {
                return false;
            }
        }

        return true;
    }

    static isDateString(checkVal: string) : boolean {
        const dateFormat = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*))(?:Z|(\+|-)([\d|:]*))?$/;

        return dateFormat.test(checkVal);
    }

    static getDateFromString(s: string) : Date {
        return new Date(Date.parse(s));
    }

}




