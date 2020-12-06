import React from "react";
import {IConfigStorage} from "../../Common/IConfigStorage";
import {cloneWithoutReact, generateUniqueId, spreadData} from "../../Common/DataUtilities";
import {IEditable} from "../../CommonUI/IEditable";
import {UserFormData} from "../UserFormData";
import {IFormDataAccessor} from "../Utilities/IFormDataAccessor";
import {AutoBind} from "../../Common/AutoBind";
import {
    IDesignValidationProvider,
    IRuntimeValidationProvider,
    ValidationIssue
} from "../../Common/IDesignValidationProvider";
import {FormContext} from "../Utilities/FormContext";

export abstract class XBaseControl
    extends React.Component
    implements
        IConfigStorage,
        IEditable,
        IFormDataAccessor,
        IDesignValidationProvider,
        IRuntimeValidationProvider {

    id: string ;

    // not serialized
    private _formContext?: FormContext;

    // to implement
    abstract getDesignValidationIssues() : ValidationIssue[];
    abstract getRuntimeValidationIssues() : ValidationIssue[];

    abstract renderEditUI(): JSX.Element | null ;

    constructor() {
        super({});

        // generates ID to be a guid
        this.id = generateUniqueId();
    }

    getFormContext(): FormContext | undefined {
        return this._formContext ;
    }

    setFormContext(value: FormContext | undefined) : void {
        if (!value)
            throw 'cannot set edit context to null (base control)';

        this._formContext = value;
    }

    getStorageData(): object {
        return cloneWithoutReact(this, ['owner', '_formContext', '_formRuntimeContext']);
    }

    setStorageData(data: object): void {
        spreadData(this, data, []);
    }


    @AutoBind
    designerUpdate () : void {
        this.getFormContext()?.refreshDesigner();
    }

    isDesignSelected() : boolean {
        if (this.getFormContext()) {
            return this.getFormContext()!.selectedId === this.id;
        }

        return false;
    }

    selectInDesigner() : void {
        if (this.getFormContext()) {
            this.getFormContext()!.selectedId = this.id;
            this.getFormContext()!.refreshDesigner();
        }
    }

    unselectInDesigner(): void {
        if (this.getFormContext()) {
            this.getFormContext()!.selectedId = null;
            this.getFormContext()!.refreshDesigner();
        }
    }

    getFormData(): UserFormData | undefined | null {
        return (this.getFormContext())?.getFormData();
    }

    getFormDataValue(fieldName: string): any {
        return (this.getFormContext())?.getFormDataValue(fieldName);
    }

    setFormData(value: UserFormData): void {
        return (this.getFormContext())?.setFormData(value);
    }

    setFormDataValue(fieldName: string, value: any): void {
        (this.getFormContext())?.setFormDataValue(fieldName, value);
    }

    toString() : string | null {
        let type = Reflect.get(this, '__type');

        if (type && type.startsWith('X')) {
            type = type.substring(1);
        }

        let valueName = Reflect.get(this, 'valueName');

        if (type && valueName) {
            return type + ' [' + valueName + ']';
        } else if (type) {
            return type + ' [' + valueName + ']';
        } else if (valueName) {
            return valueName ;
        }

        return null;
    }

}

