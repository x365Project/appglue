import React from "react";

import {StyledTextField, TextFieldDisplayType} from "./PropertyEditorStyles";


export interface PropertyEditorTextInterface {
    editObject: object,
    label?: string,
    propertyName: string | number,
    hint?: string,
    requiredText? : string,
    updateCallback : CallableFunction,
    parentDefaultValue? : string | null,
    type?: TextFieldDisplayType,
    autoFocus?: boolean
}

export const PropertyEditorText : React.FC<PropertyEditorTextInterface> = (props: PropertyEditorTextInterface) => {

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (props.parentDefaultValue && event.target.value === props.parentDefaultValue) {
            Reflect.set(props.editObject, props.propertyName, null);
        } else {
            Reflect.set(props.editObject, props.propertyName, event.target.value);
        }
        props.updateCallback();
    }
    const value = Reflect.get(props.editObject, props.propertyName) ?? props.parentDefaultValue;
    return (
        <StyledTextField value={value || ''} label={props.label} onChange={onChange} helperText={props.hint} displayType={props.type || TextFieldDisplayType.Default} autoFocus={props.autoFocus} />
    );
}


