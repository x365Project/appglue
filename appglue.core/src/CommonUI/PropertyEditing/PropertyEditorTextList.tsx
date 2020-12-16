import React, { useState } from "react";
import { Input, InputLabel, ClickAwayListener } from "@material-ui/core";

import styled from "styled-components";

const StyledTextList = styled("div")<{
    active: boolean;
    label?: string;
    empty: boolean;
}>`
    width: 100%;

    .TextList-TextBox {
        display: flex;
        flex-direction: column;
        border: solid 1px ${props => props.active ? '#93A9BF' :'#D8E4EE'};
        border-radius: 4px;
        font-family: Mulish;
        padding: 6px 12px;
    
        transition: all .3s;

        .MuiInputBase-input {
            color: ${props => props.active ? '#677C95': '#93A9BF'};
            font-family: Mulish;
            font-style: normal;
            font-weight: 600;
            font-size: 14px;
            line-height: 20px;
            padding: 0;
        }
    }

    .TextList-Label {
        color: #677C95;
        font-family: Mulish;
        font-style: normal;
        font-weight: 600;
        font-size: 14px;
        line-height: 20px;
        ${props => props.empty && `
            transform: translate(10px, 24px);
        `}
    }

`;

export interface PropertyEditorTextListInterface{
    editObject: object,
    propertyName: string | number,
    label?: string,
    updateCallback : () => void,
}


export const PropertyEditorTextList : React.FC<PropertyEditorTextListInterface> = (props: PropertyEditorTextListInterface) => {

    const [selectedLine, setSelectedLine] = useState<number>(-1);
    const values = Reflect.get(props.editObject, props.propertyName) || [];


    const update = (vals: string[]) => {
        Reflect.set(props.editObject, props.propertyName, vals);
        props.updateCallback();
    }


    if (values.length === 0) {
        values.push('')
        update(values);
    }


    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (selectedLine >= 0) {
            values[selectedLine] = event.target.value;
            update(values);
        }
    }

    const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.keyCode === 13) {
            if (selectedLine === values.length - 1) {
                values.push('');
                update(values);
            }
            setSelectedLine(selectedLine + 1);
        }
    }

    const onFocus = (index: number) => {
        setSelectedLine(index);
    }

    const onClickAway = () => {
        setSelectedLine(-1);
    }

    return (
        <ClickAwayListener onClickAway={onClickAway}>
            <StyledTextList className="TextList-Wrapper" active={selectedLine !== -1} label={props.label} empty={values.length === 1 && values[0] === ''}>
                {
                    props.label && (
                        <InputLabel classes={{root: 'TextList-Label'}}>{props.label}</InputLabel>
                    )
                }
                <div className="TextList-TextBox">
                {
                    values && values.map((val: string, idx: number) => (
                        <Input value={val} key={idx} onChange={onChange} disableUnderline onFocus={() => onFocus(idx)} onKeyDown={onKeyDown} autoFocus={idx === selectedLine} />
                    ))
                }
                </div>
            </StyledTextList>
        </ClickAwayListener>
    );
}


