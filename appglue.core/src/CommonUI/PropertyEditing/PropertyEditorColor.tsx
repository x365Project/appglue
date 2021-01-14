import React, { useState, useRef } from "react";
import { SketchPicker, ColorResult } from 'react-color'
import { Popover, TextField, Input } from '@material-ui/core';

export interface PropertyEditorColorInterface{
    editObject: object,
    propertyName: string | number,
    label?: string,
    color?: 'primary' | 'secondary' | 'default',
    name?: string,
    updateCallback : CallableFunction,
    parentDefaultValue? : string | null
}

export const PropertyEditorColor : React.FC<PropertyEditorColorInterface> = (props: PropertyEditorColorInterface) => {

    const [open, setOpen] = useState(false);

    const onChange = (data: ColorResult) => {
        Reflect.set(props.editObject, props.propertyName, data.hex);
        props.updateCallback();
    }

    const value = Reflect.get(props.editObject, props.propertyName) ?? props.parentDefaultValue;
    let textRef = useRef<HTMLInputElement>(null);

    return (
        <>
            {
                props.label && (
                    <TextField
                        value={value || ''}
                        label={props.label}
                        onClick={() => setOpen(true)}
                        variant="outlined"
                        inputProps={{
                            ref: textRef,
                            readOnly: true,
                        }}
                        inputRef={input => (textRef = input)}
                    />
                )
            }
            {
                !props.label && (
                    <Input
                        value={value || ''}
                        onClick={() => setOpen(true)}
                        ref={textRef}
                        readOnly
                        autoFocus
                    />
                )
            }
            <Popover open={open} anchorEl={textRef.current} onClose={() => setOpen(false)}>
                <SketchPicker onChange={onChange} color={value || ''} />
            </Popover>
        </>
    );
}


