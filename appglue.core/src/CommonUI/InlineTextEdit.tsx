import React, {useState} from "react";
import {Label} from "mdi-material-ui";
import {Input, InputLabel, TextField, ClickAwayListener} from "@material-ui/core";
import styled from "styled-components";

export interface InlineInputProps {
    text: string;
    onEdit: (newValue: string) => void;
}

export const InheritLabel = styled.label`
    font: inherit;
    &:hover {
      border-bottom: 2px solid darkgray;
      background-color: white;
    }

`;

export function InlineTextEdit(props: InlineInputProps) {


    let [editing, setEditing] = useState(false);

    function clickAway() {
        editing = false;
        setEditing(false);
    }

    function renderInput() {
        return (
            <ClickAwayListener onClickAway={clickAway}>
                <TextField
                    size={'small'}
                    value={props.text}
                    variant={'outlined'}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                       // props.text = event.target.value;
                        if (props.onEdit){
                            props.onEdit(event.target.value);
                        }
                    }}
                    onBlur={ clickAway }
                    onKeyDown={(event: React.KeyboardEvent) => {
                        if (event.key === 'Enter') {
                            clickAway();
                        }
                    }}

                ></TextField>
            </ClickAwayListener>
        );
    }

    function renderLabel() {
        return (
            <InheritLabel onClick={() => {
                editing = true;
                setEditing( true);
            }}>{props.text}</InheritLabel>
        );
    }

    return (
        editing
            ? renderInput()
            : renderLabel()
    );

}