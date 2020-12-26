// shared interface for base defintion and object
export interface IDataDefinitionOwner {
    getValueObject() : {[propertyName: string] : any};
}
