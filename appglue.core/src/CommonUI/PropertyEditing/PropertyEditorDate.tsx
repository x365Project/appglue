import React from "react";
import TextField from "@material-ui/core/TextField";

export interface PropertyEditorDateInterface{
    editObject: object;
    propertyName: string;
    label: string;
    hint?: string;
    autoFocus?: boolean;
    updateCallback : CallableFunction;
}

export const PropertyEditorDate : React.FC<PropertyEditorDateInterface> = (props: PropertyEditorDateInterface) => {
    
    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        Reflect.set(props.editObject, props.propertyName, event.target.value);
        props.updateCallback();
    }

    return (
        <TextField
            variant="outlined"
            autoFocus={props.autoFocus}
            value={Reflect.get(props.editObject, props.propertyName)}
            label={props.label}
            onChange={onChange}
            helperText={props.hint}
            type="date"
        />
    );
}


