import React, {useState} from "react";
import {Input, ClickAwayListener} from "@material-ui/core";
import styled from "styled-components";

export interface InlineInputProps {
    text: string;
    placeholder?: string;
    onEdit: (newValue: string) => void;
}

export const InheritLabel = styled.label`
    border-bottom: 2px solid transparent;
    &:hover {
        border-bottom: 2px solid #93A9BF;
        background-color: white;
    }
`;

export const EditInput = styled(Input)`
    && {
        .MuiInputBase-input {
            border: 1px solid #93A9BF;
            box-sizing: border-box;
            border-radius: 4px;
            height: auto;
    
            font-family: Mulish;
            font-style: normal;
            font-weight: 600;
            font-size: 14px;
            line-height: 20px;
            color: #677C95;
            padding: 6px 12px;
        }
    }
`;

export function InlineTextEdit(props: InlineInputProps) {

    const [editing, setEditing] = useState(false);

    function clickAway() {
        setEditing(false);
    }

    function renderInput() {
        return (
            <ClickAwayListener onClickAway={clickAway}>
                <EditInput
                    value={props.text}
                    disableUnderline
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        props.onEdit(event.target.value);
                    }}
                    onBlur={ clickAway }
                    onKeyDown={(event: React.KeyboardEvent) => {
                        if (event.key === 'Enter') {
                            clickAway();
                        }
                    }}
                    className="InlineEdit InlineEdit-input"
                    placeholder={props.placeholder}
                    autoFocus
                />
            </ClickAwayListener>
        );
    }

    function renderLabel() {
        return (
            <InheritLabel
                className="InlineEdit InlineEdit-label"
                onClick={(event: React.MouseEvent<HTMLLabelElement>) => {
                    setEditing(true);
                }}
            >
                {props.text || props.placeholder}
            </InheritLabel>
        );
    }

    return (
        editing
            ? renderInput()
            : renderLabel()
    );

}