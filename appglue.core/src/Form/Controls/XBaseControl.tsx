import React from "react";
import {IConfigStorage} from "../../Common/IConfigStorage";
import {cloneWithoutReact, generateUniqueId, spreadData} from "../../Common/DataUtilities";
import {IEditable} from "../../CommonUI/IEditable";
import {UserFormData} from "../UserFormData";
import {IFormDataAccessor} from "../Utilities/IFormDataAccessor";
import {AutoBind} from "../../Common/AutoBind";
import {IDesignValidationProvider, ValidationIssue} from "../../Common/IDesignValidationProvider";
import {FormRuntimeContext, FormEditContext} from "../Utilities/FormEditContext";

export abstract class XBaseControl
    extends React.Component
    implements
        IConfigStorage,
        IEditable,
        IFormDataAccessor,
        IDesignValidationProvider {

    id: string ;

    // not serialized
    private _formRuntimeContext?: FormRuntimeContext;
    private _formEditContext?: FormEditContext;

    // to implement
    abstract getDesignValidationIssues() : ValidationIssue[];
    abstract renderEditUI(): JSX.Element | null ;

    constructor() {
        super({});

        // generates ID to be a guid
        this.id = generateUniqueId();
    }

    getFormRuntimeContext(throwExceptionIfNotFound: boolean = true): FormRuntimeContext | undefined {
        let c = this._formRuntimeContext ?? this._formEditContext;

        if (throwExceptionIfNotFound && !c)
            throw 'no runtime context found';

        return c;
    }

    setFormRuntimeContext(value: FormRuntimeContext | undefined) : void {
        if (!value)
            throw 'cannot set form context to null (base control)';

        this._formRuntimeContext = value;
    }

    getFormEditContext(): FormEditContext | undefined {
        return this._formEditContext ;
    }

    setFormEditContext(value: FormEditContext | undefined) : void {
        if (!value)
            throw 'cannot set edit context to null (base control)';

        this._formEditContext = value;
    }

    getStorageData(): object {
        return cloneWithoutReact(this, ['owner', '_formEditContext', '_formRuntimeContext']);
    }

    setStorageData(data: object): void {
        spreadData(this, data, []);
    }


    @AutoBind
    designerUpdate () : void {
        this.getFormEditContext()?.refreshDesigner();
    }

    isDesignSelected() : boolean {
        if (this.getFormEditContext()) {
            return this.getFormEditContext()!.selectedId === this.id;
        }

        return false;
    }

    selectInDesigner() : void {
        if (this.getFormEditContext()) {
            this.getFormEditContext()!.selectedId = this.id;
            this.getFormEditContext()!.refreshDesigner();
        }
    }

    unselectInDesigner(): void {
        if (this.getFormEditContext()) {
            this.getFormEditContext()!.selectedId = null;
            this.getFormEditContext()!.refreshDesigner();
        }
    }

    getFormData(): UserFormData | undefined | null {
        return (this.getFormRuntimeContext())?.getFormData();
    }

    getFormDataValue(fieldName: string): any {
        return (this.getFormRuntimeContext())?.getFormDataValue(fieldName);
    }

    setFormData(value: UserFormData): void {
        return (this.getFormRuntimeContext())?.setFormData(value);
    }

    setFormDataValue(fieldName: string, value: any): void {
        (this.getFormRuntimeContext())?.setFormDataValue(fieldName, value);
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

