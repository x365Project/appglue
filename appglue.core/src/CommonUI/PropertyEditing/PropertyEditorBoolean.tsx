import {FormControlLabel, Checkbox, Switch} from '@material-ui/core';
import React from "react";

import {StyledFormControlForSwitch} from "./PropertyEditorStyles";

export interface PropertyEditorBooleanInterface{
    editObject: object,
    propertyName: string | number,
    label?: string,
    color?: 'primary' | 'secondary' | 'default',
    name?: string,
    updateCallback : CallableFunction
}

export const PropertyEditorBoolean : React.FC<PropertyEditorBooleanInterface> = (props: PropertyEditorBooleanInterface) => {
    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        Reflect.set(props.editObject, props.propertyName, event.target.checked);
        props.updateCallback();
    }

    return (
        <>
            {
                props.label &&
                <StyledFormControlForSwitch
                    control={
                        <Switch
                            name={props.name || 'test'}
                            color={props.color || 'primary'}
                            checked={Reflect.get(props.editObject, props.propertyName) || false}
                            onChange={onChange}
                        />
                    }
                    label={props.label}
                />
            }
            {
                !props.label && 
                <Checkbox
                    name={props.name || 'test'}
                    color={props.color || 'primary'}
                    checked={Reflect.get(props.editObject, props.propertyName) || false}
                    onChange={onChange}
                />
            }
        </>
    );
}


