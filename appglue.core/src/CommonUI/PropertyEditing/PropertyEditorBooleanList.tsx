import React from "react";
import { InputLabel, IconButton } from "@material-ui/core";

import styled from "styled-components";
import { PlusWhiteIcon } from "../Icon/PlusWhiteIcon";
import {StyledSwitch} from "./PropertyEditorStyles";
import { StyledIconButton } from "../CommonStyles";

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
        margin-bottom: 5px;
    }

    .BooleanList-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
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
            <div className="BooleanList-header">
                {
                    props.label && <InputLabel classes={{root: 'BooleanList-Label'}}>{props.label}</InputLabel>
                }
                <StyledIconButton color="primary" onClick={add}><PlusWhiteIcon /></StyledIconButton>
            </div>
            <div className="BooleanList">
            {
                values && values.map((val: boolean, idx: number) => (
                    <StyledSwitch value={val} key={idx} onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e, idx)} />
                ))
            }
            </div>
        </StyledBooleanList>
    );
}


