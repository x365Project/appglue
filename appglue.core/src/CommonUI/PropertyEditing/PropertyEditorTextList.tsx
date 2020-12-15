import TextField from "@material-ui/core/TextField"
import React from "react";
import { Input } from "@material-ui/core";

export interface PropertyEditorTextListInterface{
    editObject: object,
    propertyName: string | number,
    label?: string,
    updateCallback : CallableFunction,
}

export const PropertyEditorTextList : React.FC<PropertyEditorTextListInterface> = (props: PropertyEditorTextListInterface) => {

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        Reflect.set(props.editObject, props.propertyName, event.target.value);
        props.updateCallback();
    }
    const value = Reflect.get(props.editObject, props.propertyName) || [];
    return (
        <>
            {
                props.label && (
                    <TextField variant="outlined" value={value || ''} label={props.label} onChange={onChange} />
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


