import {TextField, Input} from "@material-ui/core"
import React, {useState, useEffect} from "react";

export interface PropertyEditorFloatInterface{
    editObject: object,
    propertyName: string | number,
    label?: string,
    decimal?: number;
    hint?: string,
    updateCallback : CallableFunction
}

export const PropertyEditorFloat : React.FC<PropertyEditorFloatInterface> = (props: PropertyEditorFloatInterface) => {

    const propvalue = Reflect.get(props.editObject, props.propertyName);
    const [value, setValue] = useState((propvalue || 0).toString());

    const onBlur = () => {
        try {
			let val = parseFloat(value);
			if (props.decimal) {
				val = parseFloat(value.toFixed(props.decimal));
			}
			Reflect.set(props.editObject, props.propertyName, val);
			props.updateCallback();
        } catch {}
    }

    useEffect(() => {
        if (propvalue) {
            setValue(propvalue.toString());
        }
    }, [propvalue])

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    }

    return (
        <>
            {
                props.label && (
                    <TextField variant="outlined" value={value}
                        type='number'
                        label={props.label}
                        onChange={onChange}
                        onBlur={onBlur}
                        helperText={props.hint}
                    />
                )
            }
            {
                !props.label && (
                    <Input value={value} type="number" onChange={onChange} onBlur={onBlur} />
                )
            }
            
        </>
    );
}


