import {Input, TextField} from "@material-ui/core"
import React from "react";

export interface PropertyEditorIntegerInterface{
    editObject: object,
    propertyName: string | number,
    label?: string,
    decimal?: number;
    hint?: string,
    updateCallback : CallableFunction,
    parentDefaultValue? : number | null
}

export const PropertyEditorInteger : React.FC<PropertyEditorIntegerInterface> = (props: PropertyEditorIntegerInterface) => {

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        try {
            let val = parseInt(event.target.value, 10);
            if (props.parentDefaultValue && props.parentDefaultValue === val) {
                Reflect.set(props.editObject, props.propertyName, null);
            } else {
                Reflect.set(props.editObject, props.propertyName, val);
            }
			props.updateCallback();
		} catch {}
        
    }

    const value = Reflect.get(props.editObject, props.propertyName) ?? props.parentDefaultValue;

    return (
        <>
            {
                props.label && (
                    <TextField variant="outlined" value={value || ''}
                        type="number"
                        label={props.label}
                        onChange={onChange}
                        helperText={props.hint}
                    />
                )
            }
            {
                !props.label && (
                    <Input value={value || ''}
                        type="number"
                        onChange={onChange}
                    />
                )
            }
            
        </>
    );
}


