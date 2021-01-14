import React from "react";


import {StyledFormControlForSwitch, StyledSwitch} from "./PropertyEditorStyles";


export interface PropertyEditorBooleanInterface {
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
                        <StyledSwitch
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
                <StyledSwitch
                    name={props.name || 'test'}
                    color={props.color || 'primary'}
                    checked={Reflect.get(props.editObject, props.propertyName) || false}
                    onChange={onChange}
                />
            }
        </>
    );
}


