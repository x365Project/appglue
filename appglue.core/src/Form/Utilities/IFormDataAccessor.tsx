// this interface allows the polymorphism between controls, containers, etc.
import {UserFormData} from "../UserFormData";

export interface IFormDataAccessor {
    setFormDataValue(fieldName: string, value: any) : void ;
    getFormDataValue(fieldName: string) : any ;
    getFormData() : UserFormData | undefined | null;
    setFormData(value: UserFormData) : void;
}