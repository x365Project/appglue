// this is stored off so we not need to check each time
import React from "react";
import {Guid} from "guid-typescript";
import * as util from "util";
import {FileData} from "./FileData";
import {
    ArrayAddDataMemberAccessor, ArrayAddFirstDataMemberAccessor,
    ArrayFirstDataMemberAccessor, ArrayItemDataMemberAccessor,
    ArrayLastDataMemberAccessor,
    IDataMemberAccessor,
    PropertyDataMemberAccessor
} from "./DataMemberAccessor";

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

    static spreadDataWithoutFunction(value: object, dataToSpread: object, exclude?: string[]): void {


        for (var i in dataToSpread) {


            if (exclude && exclude.length !== 0) {
                if (exclude.indexOf(i) !== -1) continue;
            }

            let val = Reflect.get(dataToSpread, i);
            if (val instanceof Function) continue;

            Reflect.set(value, i, val);
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

    static isAssignable(val: any, toVal: any) : boolean {
        // we cannot make judgement
        if (val === null || val === undefined || toVal === null || toVal === undefined)
            return true;

        // array types do not match
        if (Array.isArray(val) !== Array.isArray(toVal))
            return false;

        // types do not match
        if (typeof val != typeof toVal)
            return false;

        // if object, do structure compare
        if (typeof val === 'object')
            return this.compareObjectStructure(val, toVal);

        return true;
    }

    static isDateString(checkVal: string) : boolean {
        const dateFormat = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*))(?:Z|(\+|-)([\d|:]*))?$/;

        return dateFormat.test(checkVal);
    }

    static getDateFromString(s: string) : Date {
        return new Date(Date.parse(s));
    }

    // todo: add cache?
    static splitPath(path: string) : IDataMemberAccessor[] {
        let dataMembers : IDataMemberAccessor[] = [];

        let pathPieces = path.split('.');

        for (let p of pathPieces) {
            if (p.indexOf('[') !== -1) {
                // remove ]
                p = p.replace(']', '');
                // split again
                let subPieces = p.split('[');

                if (subPieces[subPieces.length -1] === '')
                    subPieces.splice(subPieces.length -1, 1);

                if (subPieces.length === 1) {
                    // this is case where [] means we are goign to return all the array pieces
                    dataMembers.push(new PropertyDataMemberAccessor(subPieces[0]));

                } else {
                    // first piece = property
                    dataMembers.push(new PropertyDataMemberAccessor(subPieces[0]));

                    // second piece = index or first or last
                    if (subPieces[1] === 'add') {
                        dataMembers.push(new ArrayAddDataMemberAccessor());}
                    else if (subPieces[1] === 'addfirst') {
                        dataMembers.push(new ArrayAddFirstDataMemberAccessor());}
                    else if (subPieces[1] === 'first') {
                        dataMembers.push(new ArrayFirstDataMemberAccessor());
                    } else if (subPieces[1] === 'last') {
                        dataMembers.push(new ArrayLastDataMemberAccessor());
                    } else if (subPieces[1] === 'all') {
                        // do nothing
                    } else {
                        dataMembers.push(new ArrayItemDataMemberAccessor(+subPieces[1]));
                    }
                }
            } else {
                dataMembers.push(new PropertyDataMemberAccessor(p));
            }
        }

        return  dataMembers;
    }

    // rules
    // - path is separated by .
    // - [] returns all items of array
    // - . on array without specifying that we want all items '[]' returns the value of the property
    // - . after [] returns new array with the items of that particular property
    // - [first] and [last] return the first and last item
    static get(from: object, path: string) : any {
        let pieces = this.splitPath(path);

        let v = from;
        for (let p of pieces) {
            v = p.get(v);

            if (v === undefined || v === null)
                return undefined;
        }

        return v;
    }

    static set(from: object, path: string, value: any, throwExceptionIfTargetIsNull: boolean = true) : void {
        let pieces = this.splitPath(path);

        let v = from;
        let lastPiece = pieces[pieces.length -1];
        // removes last item from array
        pieces = pieces.slice(0, -1);

        for (let p of pieces) {
            v = p.get(v);

            if (v === undefined || v === null){
                if (throwExceptionIfTargetIsNull)
                    throw 'an parent item to item being set is null or undefined ' + path;

                return;
            }
        }

        let currentVal = lastPiece.get(v);

        if (currentVal && typeof currentVal === 'string' && typeof value !== 'string')
            value = value + '';

        if (!this.isAssignable(value, currentVal))
            throw `unassignable: cannot replace ${currentVal} with ${value}`


        lastPiece.set(v, value);
    }


}






