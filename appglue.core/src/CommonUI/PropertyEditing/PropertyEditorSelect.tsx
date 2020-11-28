import React from "react";
import {FormControl, Select, InputLabel} from "@material-ui/core";

export interface PropertyEditorSelectInterface{
    editObject: object,
    label?: string,
    propertyName: string,
    options: string[],
    hint?: string,
    requiredText? : string,
    updateCallback : CallableFunction,
    parentDefaultValue? : string;

}

export const PropertyEditorSelect : React.FC<PropertyEditorSelectInterface> = (props: PropertyEditorSelectInterface) => {

    const onChange = (event: React.ChangeEvent<{name?: string | null, value: unknown}>) => {
        if (props.parentDefaultValue && props.parentDefaultValue === event.target.value) {
            Reflect.set(props.editObject, props.propertyName, null);
        } else {
            Reflect.set(props.editObject, props.propertyName, event.target.value);
        }
        props.updateCallback();
    }

    return (
        <>
            <FormControl fullWidth>
                {
                    props.label &&
                    <InputLabel>{props.label}</InputLabel>
                }
                <Select
                    variant="outlined"
                    value={Reflect.get(props.editObject, props.propertyName) ?? props.parentDefaultValue}
                    label={props.label}
                    style={{width: '100%'}}
                    onChange={onChange}
                >
                    {
                        props.options.map((item, index) => {
                            return (
                                <option value={item} key={index}>{item}</option>
                            );
                        })
                    }
                </Select >
            </FormControl>
            
        </>
    );
}
