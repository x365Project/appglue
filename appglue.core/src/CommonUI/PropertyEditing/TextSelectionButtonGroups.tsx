import {Button, ButtonGroup} from "@material-ui/core";
import React from "react";
import styled from "styled-components";

import {TextControlSize, TextControlStyle} from "../../Form/FormDesignConstants";
import {TextLabelIcon} from "../../CommonUI/Icon/TextLabelIcon";
import {TextOutlineIcon} from "../../CommonUI/Icon/TextOutlineIcon";
import {TextShadedIcon} from "../../CommonUI/Icon/TextShadedIcon";
import {TextUnderlineIcon} from "../../CommonUI/Icon/TextUnderlineIcon";


export interface TextStyleSelectionInterface {
    editObject: object,
    label?: string,
    propertyName: string | number,
    updateCallback : CallableFunction,
    parentDefaultValue? : string | null
}

const TextStyleButton = styled(Button)`
    && {
        width: 56px;
        height: 46px;
        padding: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        border: solid 1px #E6E9ED;
        border-radius: 4px;

        &:hover {
            background: #F2FAFE;
        }

        &.Mui-disabled {
			background: #F2FAFE;
		}
    }

`;



export const PropertyEditorTextStyleSelection : React.FC<TextStyleSelectionInterface> = (props: TextStyleSelectionInterface) => {

    function handleChangeStyle(newStyle: string) {
        if (props.parentDefaultValue && newStyle === props.parentDefaultValue) {
            Reflect.set(props.editObject, props.propertyName, null);
        } else {
            Reflect.set(props.editObject, props.propertyName, newStyle);
        }
        props.updateCallback();

    }

    const value = Reflect.get(props.editObject, props.propertyName) ?? props.parentDefaultValue;

    return (
        <ButtonGroup
            size="large"
            aria-label="large outlined primary button group"
            style={{height: "49px", width: "240px", marginTop:"10px"}}
        >
            <TextStyleButton
                onClick={() => {handleChangeStyle(TextControlStyle.LABELED)}}
                disabled={value === TextControlStyle.LABELED}
            >
                <TextLabelIcon alt={TextControlStyle.LABELED} />
            </TextStyleButton>
            <TextStyleButton
                onClick={() => {handleChangeStyle(TextControlStyle.OUTLINE)}}
                disabled={value === TextControlStyle.OUTLINE}
            >
                <TextOutlineIcon alt={TextControlStyle.OUTLINE} />
            </TextStyleButton>
            <TextStyleButton
                onClick={() => {handleChangeStyle(TextControlStyle.SHADED)}}
                disabled={value === TextControlStyle.SHADED}
            >
                <TextShadedIcon alt={TextControlStyle.SHADED} />
            </TextStyleButton>
            <TextStyleButton
                onClick={() => {handleChangeStyle(TextControlStyle.UNDERLINED)}}
                disabled={value === TextControlStyle.UNDERLINED}
            >
                <TextUnderlineIcon alt= {TextControlStyle.UNDERLINED}/>
            </TextStyleButton>
        </ButtonGroup>
    );
}

const TextSizeButton = styled(Button)`
    && {
        width: 120px;
        height: 46px;
        padding: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 4px;
        color: #01244E;
        border: 1px solid #E6E9ED

        &:hover {
            background: #F2FAFE;
        }

        &.Mui-disabled {
			background: #F2FAFE;
			color: black;
		}
    }

`;


export const PropertyEditorTextSizeSelection : React.FC<TextStyleSelectionInterface> = (props: TextStyleSelectionInterface) => {

    function handleChangeSize(newStyle: string) {
        if (props.parentDefaultValue && newStyle === props.parentDefaultValue) {
            Reflect.set(props.editObject, props.propertyName, null);
        } else {
            Reflect.set(props.editObject, props.propertyName, newStyle);
        }
        props.updateCallback();

    }

    const value = Reflect.get(props.editObject, props.propertyName) ?? props.parentDefaultValue;

    return (
        <ButtonGroup
            size="large"
            aria-label="large outlined primary button group"
            style={{height: "49px", width: "240px", marginTop:"10px"}}
        >
            <ButtonGroup
                size="large"
                aria-label="large outlined primary button group"
                style={{height: "49px", marginTop:"10px"}}
            >
                <TextSizeButton
                    onClick={() => {handleChangeSize(TextControlSize.STANDARD)}}
                    style={{textTransform: "lowercase"}}
                    disabled={value === TextControlSize.STANDARD}
                >Standard</TextSizeButton>
                <TextSizeButton
                    onClick={() => {handleChangeSize(TextControlSize.SMALL)}}
                    style={{textTransform: "lowercase"}}
                    disabled={value === TextControlSize.SMALL}
                >Small</TextSizeButton>
            </ButtonGroup>
        </ButtonGroup>
    );
}

