export interface IDataMemberAccessor {
    get(fromValue: object): any;

    set(onValue: any, value: any): void;
}

export class PropertyDataMemberAccessor implements IDataMemberAccessor {
    propertyName: string;

    constructor(propertyName: string) {
        this.propertyName = propertyName;
    }

    get(fromValue: object): any {
        if (Array.isArray(fromValue)) {
            let output : any[] = [];

            for (let v of fromValue) {
                let vv = Reflect.get(v, this.propertyName);
                if (Array.isArray(vv)) {
                    // combine arrays
                    for (let vvVal of vv) {
                        output.push(vvVal);
                    }
                } else {
                    output.push(vv);
                }
            }

            return output;
        }
        return Reflect.get(fromValue, this.propertyName);
    }

    set(onValue: any, value: any): void {
        Reflect.set(onValue, this.propertyName, value);
    }
}

export class ArrayItemDataMemberAccessor implements IDataMemberAccessor {
    index: number;


    constructor(index: number) {
        this.index = index;
    }

    get(fromValue: object): any {
        if (Array.isArray(fromValue)) {
            if (fromValue.length <= this.index)
                throw 'fetching invalid array item';

            return fromValue[this.index];
        } else {
            throw 'value is not an array'
        }
    }

    set(onValue: any, value: any): void {
        if (Array.isArray(onValue)) {
            if (onValue.length <= this.index)
                throw 'index is out of range';

            onValue[this.index] = value;
        } else {
            throw 'value is not an array'
        }
    }
}

export class ArrayFirstDataMemberAccessor implements IDataMemberAccessor {
    get(fromValue: object): any {
        if (Array.isArray(fromValue)) {
            if (fromValue.length === 0)
                return null;

            return fromValue[0];
        } else {
            throw 'value is not an array'
        }
    }

    set(onValue: any, value: any): void {
        if (Array.isArray(onValue)) {
            if (onValue.length === 0)
                throw 'index is out of range';

            onValue[0] = value;
        } else {
            throw 'value is not an array'
        }
    }

}

export class ArrayLastDataMemberAccessor implements IDataMemberAccessor {
    get(fromValue: object): any {
        if (Array.isArray(fromValue)) {
            if (fromValue.length === 0)
                return null;

            return fromValue[fromValue.length -1];
        } else {
            throw 'value is not an array'
        }
    }

    set(onValue: any, value: any): void {
        if (Array.isArray(onValue)) {
            if (onValue.length === 0)
                throw 'index is out of range';

            onValue[onValue.length -1] = value;
        } else {
            throw 'value is not an array'
        }
    }

}

export class ArrayAddDataMemberAccessor implements IDataMemberAccessor {
    get(fromValue: object): any {
        if (Array.isArray(fromValue)) {
            if (fromValue.length === 0)
                return null;

            return fromValue[fromValue.length -1];
        } else {
            throw 'value is not an array'
        }
    }

    set(onValue: any, value: any): void {
        if (Array.isArray(onValue)) {
            onValue.push(value);
        } else {
            throw 'value is not an array'
        }
    }
}

export class ArrayAddFirstDataMemberAccessor implements IDataMemberAccessor {
    get(fromValue: object): any {
        if (Array.isArray(fromValue)) {
            if (fromValue.length === 0)
                return null;

            return fromValue[0];
        } else {
            throw 'value is not an array'
        }
    }

    set(onValue: any, value: any): void {
        if (Array.isArray(onValue)) {
            onValue.unshift(value);
        } else {
            throw 'value is not an array'
        }
    }
}