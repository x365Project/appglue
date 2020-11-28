import React, {useState} from "react";
import {Label} from "mdi-material-ui";
import {Menu, Input, InputLabel, TextField, ClickAwayListener, MenuItem, MenuList} from "@material-ui/core";
import styled from "styled-components";
import {InheritLabel} from "./InlineTextEdit";

export interface InlineOptionsProps {
    text: string;
    options: string[]
    onEdit: (newValue: string) => void;
}

export function InlineOptionSelect(props: InlineOptionsProps) {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event : any) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    function renderMenuItem(option: string) {
        return (
            <MenuItem
                onClick={() => {
                    setAnchorEl(null);
                    if (props.onEdit)
                        props.onEdit(option);
                }
            }>
                {option}
            </MenuItem>
        );
    }

    return (
        <>
            <InheritLabel onClick={handleClick}>
                {props.text}
            </InheritLabel>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                keepMounted
                onClose={handleClose}
            >
                {
                    props.options.map((option: string, index: number) => {
                        return renderMenuItem(option);
                    })
                }
            </Menu>
        </>
    );

}