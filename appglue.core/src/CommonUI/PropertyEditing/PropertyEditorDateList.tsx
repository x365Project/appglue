import React from "react";
import { InputLabel, IconButton } from "@material-ui/core";

import styled from "styled-components";
import { StyledTextField } from "./PropertyEditorStyles";
import { PlusWhiteIcon } from "../Icon/PlusWhiteIcon";

const StyledDateList = styled.div`
    width: 100%;

    .DateList {
        display: flex;
        flex-direction: column;

        > * {
            margin-top: 10px;
        }
    }
    .DateList-Label {
        color: #677C95;
        font-family: Mulish;
        font-style: normal;
        font-weight: 600;
        font-size: 14px;
        line-height: 20px;
    }

    .DateList-header {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .MuiButtonBase-root {
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
    }

`;

export interface PropertyEditorDateListInterface{
    editObject: object,
    propertyName: string | number,
    label?: string,
    updateCallback : () => void,
}


export const PropertyEditorDateList : React.FC<PropertyEditorDateListInterface> = (props: PropertyEditorDateListInterface) => {

    const values = Reflect.get(props.editObject, props.propertyName) || [];

    const update = (vals: boolean[]) => {
        Reflect.set(props.editObject, props.propertyName, vals);
        props.updateCallback();
    }


    const onChange = (event: React.ChangeEvent<HTMLInputElement>, selectedLine: number) => {
        if (selectedLine >= 0) {
            values[selectedLine] = event.target.value;
            update(values);
        }
    }

    const add = () => {
        values.push(false);
        update(values);
    }

    return (
        <StyledDateList className="DateList-Wrapper">
            <div className="DateList-header">
                {
                    props.label && <InputLabel classes={{root: 'DateList-Label'}}>{props.label}</InputLabel>
                }
                <IconButton onClick={add}><PlusWhiteIcon /></IconButton>
            </div>
            <div className="DateList">
            {
                values && values.map((val: boolean, idx: number) => (
                    <StyledTextField
                        value={val}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e, idx)}
                        type="date"
                        key={idx}
                    />
                ))
            }
            </div>
        </StyledDateList>
    );
}


