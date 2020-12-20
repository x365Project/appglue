import React from "react";
import { StyledTextField, TextFieldDisplayType } from "./PropertyEditorStyles";

export interface PropertyEditorIntegerInterface {
    editObject: object,
    propertyName: string | number,
    label?: string,
    decimal?: number,
    hint?: string,
    updateCallback : CallableFunction,
    parentDefaultValue? : number | null,
    type?: TextFieldDisplayType,
    autoFocus?: boolean,
    disableUnderline?: boolean,
    variant?: 'filled' | 'outlined' | 'standard'
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

    let value = Reflect.get(props.editObject, props.propertyName) ?? props.parentDefaultValue;

    if (!value && value !== 0) {
        value = ''
    }

    return (
        <StyledTextField
            value={value}
            type="number"
            label={props.label}
            onChange={onChange}
            helperText={props.hint}
            displayType={props.type || TextFieldDisplayType.Default}
            autoFocus={props.autoFocus}
            InputProps={{
                disableUnderline: props.disableUnderline
            }}
            variant={props.variant}
        />
    );
}


