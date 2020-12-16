import React, { useState } from "react";
import { Checkbox, InputLabel, ClickAwayListener, Button } from "@material-ui/core";

import styled from "styled-components";

const StyledBooleanList = styled.div`
    width: 100%;

    .BooleanList {
        display: flex;
        flex-direction: column;
        max-width: 50px;
    }
    .BooleanList-Label {
        color: #677C95;
        font-family: Mulish;
        font-style: normal;
        font-weight: 600;
        font-size: 14px;
        line-height: 20px;
    }

    .BooleanListAdd-button .MuiButtonBase-root {
        background: #49A0D5;
        border-radius: 4px;
        padding: 8px 12px;
        color: #fff;
        font-family: Mulish;
        font-style: normal;
        font-weight: bold;
        font-size: 14px;
        line-height: 24px;

        &:hover {
            background: #0C4385;
        }
    }

`;

export interface PropertyEditorBooleanListInterface{
    editObject: object,
    propertyName: string | number,
    label?: string,
    updateCallback : () => void,
}


export const PropertyEditorBooleanList : React.FC<PropertyEditorBooleanListInterface> = (props: PropertyEditorBooleanListInterface) => {

    const values = Reflect.get(props.editObject, props.propertyName) || [];

    const update = (vals: boolean[]) => {
        Reflect.set(props.editObject, props.propertyName, vals);
        props.updateCallback();
    }


    const onChange = (event: React.ChangeEvent<HTMLInputElement>, selectedLine: number) => {
        if (selectedLine >= 0) {
            values[selectedLine] = event.target.checked;
            update(values);
        }
    }

    const add = () => {
        values.push(false);
        update(values);
    }

    return (
        <StyledBooleanList className="BooleanList-Wrapper">
            {
                props.label && (
                    <InputLabel classes={{root: 'BooleanList-Label'}}>{props.label}</InputLabel>
                )
            }
            <div className="BooleanListAdd-button">
                <Button onClick={add}>Add</Button>
            </div>
            <div className="BooleanList">
            {
                values && values.map((val: boolean, idx: number) => (
                    <Checkbox
                        value={val}
                        key={idx}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e, idx)}
                    />
                ))
            }
            </div>
        </StyledBooleanList>
    );
}


