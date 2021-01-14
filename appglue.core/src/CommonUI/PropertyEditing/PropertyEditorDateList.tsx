import React from "react";
import { InputLabel } from "@material-ui/core";

import styled from "styled-components";
import { StyledTextField } from "./PropertyEditorStyles";
import { PlusWhiteIcon } from "../Icon/PlusWhiteIcon";
import { StyledIconButton } from "../CommonStyles";

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
        color: rgba(0, 0, 0, 0.54);
        font-family: Mulish;
        font-style: normal;
        font-weight: 600;
        margin-bottom: 5px;
    }

    .DateList-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

`;

export interface PropertyEditorDateListInterface{
    editObject: object;
    propertyName: string | number;
    label?: string;
    autFocus?: boolean;
    updateCallback : () => void;
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
                <StyledIconButton onClick={add} color="primary"><PlusWhiteIcon /></StyledIconButton>
            </div>
            <div className="DateList">
            {
                values && values.map((val: boolean, idx: number) => (
                    <StyledTextField
                        value={val}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e, idx)}
                        type="date"
                        key={idx}
                        autoFocus={props.autFocus && idx === 0}
                    />
                ))
            }
            </div>
        </StyledDateList>
    );
}


