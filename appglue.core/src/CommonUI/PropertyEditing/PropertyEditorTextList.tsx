import React, { useState } from "react";
import { Input, InputLabel, ClickAwayListener } from "@material-ui/core";

import styled from "styled-components";

const StyledTextList = styled("div")<{
    active: boolean;
    label?: string;
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

        min-height: 100px;

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
    }

`;

export interface PropertyEditorTextListInterface{
    editObject: object,
    propertyName: string | number,
    placeholder?: string;
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
            values.splice(selectedLine + 1, 0, '');
            update(values);
            setSelectedLine(selectedLine + 1);
        } else if (event.keyCode === 8 && values[selectedLine] === '' && selectedLine > 0) {
            event.preventDefault();
            let newline = selectedLine - 1;
            values.splice(newline + 1, 1);
            update(values);
            setSelectedLine(selectedLine - 1);
        } else if (event.keyCode === 38 && selectedLine > 0) {
            setSelectedLine(selectedLine - 1);
        } else if (event.keyCode === 40 && selectedLine < values.length - 1) {
            setSelectedLine(selectedLine + 1);
        }
    }

    const onFocus = (index: number) => {
        setSelectedLine(index);
    }

    const onClickAway = () => {
        setSelectedLine(-1);
    }

    const onClickWrapper = () => {
        setSelectedLine(values.length - 1);
    }

    const onClickInput = (event: React.MouseEvent<HTMLInputElement>) => {
        event.preventDefault();
        event.stopPropagation();
    }

    return (
        <ClickAwayListener onClickAway={onClickAway}>
            <StyledTextList className="TextList-Wrapper" active={selectedLine !== -1} label={props.label} empty={values.length === 1 && values[0] === ''}>
                {
                    props.label && (
                        <InputLabel classes={{root: 'TextList-Label'}}>{props.label}</InputLabel>
                    )
                }
                <div className="TextList-TextBox" onClick={onClickWrapper}>
                {
                    values && values.map((val: string, idx: number) => (
                        <Input
                            value={val}
                            key={idx}
                            onChange={onChange}
                            disableUnderline
                            onFocus={() => onFocus(idx)}
                            onKeyDown={onKeyDown}
                            placeholder={
                                idx === 0 ? props.placeholder || 'items...' : ''
                            }
                            onClick={onClickInput}
                            inputProps={
                                {
                                    ref: (element: HTMLInputElement) => {
                                        if (element) {
                                            if (selectedLine === idx) {
                                                element.focus();
                                            } else {
                                                element.blur();
                                            }
                                        }
                                    }
                                }
                            }
                        />
                    ))
                }
                </div>
            </StyledTextList>
        </ClickAwayListener>
    );
}

