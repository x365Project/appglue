import React from "react";
import { StyledTextField, TextFieldDisplayType } from "./PropertyEditorStyles";

export interface PropertyEditorDateInterface{
    editObject: object,
    propertyName: string,
    label: string,
    hint?: string,
    updateCallback : CallableFunction,
    type?: TextFieldDisplayType
}

export const PropertyEditorDate : React.FC<PropertyEditorDateInterface> = (props: PropertyEditorDateInterface) => {
    
    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        Reflect.set(props.editObject, props.propertyName, event.target.value);
        props.updateCallback();
    }

    return (
        <StyledTextField
            value={Reflect.get(props.editObject, props.propertyName)}
            label={props.label}
            onChange={onChange}
            helperText={props.hint}
            type="date"
            displayType={props.type}
        />
    );
}


