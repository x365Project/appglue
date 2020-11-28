import TextField from "@material-ui/core/TextField"
import React from "react";

export interface PropertyEditorDateInterface{
    editObject: object,
    propertyName: string,
    label: string,
    hint?: string,
    updateCallback : CallableFunction
}

export const PropertyEditorDate : React.FC<PropertyEditorDateInterface> = (props: PropertyEditorDateInterface) => {
    
    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        Reflect.set(props.editObject, props.propertyName, event.target.value);
        props.updateCallback();
    }

    return (
        <>
            <TextField variant="outlined" value={Reflect.get(props.editObject, props.propertyName)}
                label={props.label}
                onChange={onChange}
                helperText={props.hint}
                InputLabelProps={{
                    shrink: true,
                }}
                type="date"
            />
        </>
    );
}


