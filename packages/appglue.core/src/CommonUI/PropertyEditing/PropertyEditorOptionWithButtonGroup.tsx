import React from "react";
import {InputLabel} from '@material-ui/core';
import {ToggleButtonGroup, ToggleButton}  from '@material-ui/lab';
import { DefaultOnOff } from "../../Form/Utilities/DefaultOnOff";

export interface PropertyEditorOptionWithButtonGroupInterface{
    editObject: object,
    propertyName: string,
    label?: string,
    options?: string[],
    color?: 'primary' | 'secondary' | 'default',
    name?: string,
    updateCallback : CallableFunction,
    size?: 'large' | 'medium' | 'small'
}

export const PropertyEditorOptionWithButtonGroup : React.FC<PropertyEditorOptionWithButtonGroupInterface> = (props: PropertyEditorOptionWithButtonGroupInterface) => {
    const onChange = (_event: React.MouseEvent<HTMLElement>, newValue: any) => {
        Reflect.set(props.editObject, props.propertyName, newValue);
        props.updateCallback();
    }

    const { label } = props

    const value = Reflect.get(props.editObject, props.propertyName) ;

    const options = props.options || [DefaultOnOff.DEFAULT, DefaultOnOff.Off, DefaultOnOff.On]

    return (
        <>
            {
                label && <InputLabel>{label}</InputLabel>
            }
            <ToggleButtonGroup
                value={value}
                exclusive
                onChange={onChange}
                size={props.size || 'small'}
            >
                {
                    options.map((option) => (
                        <ToggleButton key={option} value={option} aria-label={option}>{option}</ToggleButton>
                    ))
                }
            </ToggleButtonGroup>
        </>
    );
}


