import React, { useState } from "react";
import { Input, InputLabel, ClickAwayListener } from "@material-ui/core";

import styled from "styled-components";

const StyledTextList = styled("div")<{
    active: boolean;
    label?: string;
}>`
    width: 100%;

    .TextList-TextBox {
        position: relative;
        display: flex;
        flex-direction: column;
        ${props => props.active && `
            border: solid 1px rgb(63, 81, 181);
        `}
        ${props => !props.active && `
            border: solid 1px rgba(0, 0, 0, 0.23);
        `}
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
            padding: 0;
        }

        ${props => props.active && `
            &:before {
                position: absolute;
                content: "";
                border: solid 2px rgb(63, 81, 181);
                top: -1px;
                left: -1px;
                bottom: -1px;
                right: -1px;
                border-radius: 4px;
            }
        `}
    }

    .TextList-Label {
        color: ${props => props.active ? 'rgb(63, 81, 181)': 'rgba(0, 0, 0, 0.54)'};
        font-family: Mulish;
        font-style: normal;
        font-weight: 600;
        margin-bottom: 5px;
    }

    .TextList-hint {
        color: rgba(0, 0, 0, 0.54);
        font-family: Mulish;
        font-style: normal;
        font-weight: 600;
        font-size: 14px;
        line-height: 18px;
        margin-top: 5px;
        display: block;
    }
`;

export interface PropertyEditorTextListInterface{
    editObject: object,
    propertyName: string | number,
    placeholder?: string;
    label?: string;
    hint?: string;
    autoFocus?: boolean;
    updateCallback : () => void;
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
            <StyledTextList className="TextList-Wrapper" active={selectedLine !== -1} label={props.label}>
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
                            autoFocus={props.autoFocus && idx === 0}
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
                {
                    props.hint && <span className="TextList-hint">{props.hint}</span>
                }
            </StyledTextList>
        </ClickAwayListener>
    );
}

