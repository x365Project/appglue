import TextField from "@material-ui/core/TextField"
import React from "react";
import { Input } from "@material-ui/core";

export interface PropertyEditorTextInterface{
    editObject: object,
    label?: string,
    propertyName: string | number,
    hint?: string,
    requiredText? : string,
    updateCallback : CallableFunction,
    parentDefaultValue? : string | null
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
        <>
            {
                props.label && (
                    <TextField variant="outlined" value={value || ''} label={props.label} onChange={onChange} helperText={props.hint} />
                )
            }
            {
                !props.label && (
                    <Input value={value || ''} onChange={onChange} />
                )
            }
        </>
    );
}


