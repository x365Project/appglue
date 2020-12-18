import React from "react";
import styled from "styled-components";

const TextIconDiv = styled("div")<{
    height?: number;
    width?: number;
}>`
    font-family: Mulish;
    font-size: 10px;
    border: 1px solid #1D6295;
    border-radius: 5px;
    background: #fff;
    color: #1D6295;
    width: ${props => props.width || 24}px;
    height: ${props => props.height || 24}px;
    line-height: ${props => props.height ? props.height - 2 : 22}px;
    text-align: center;
    justify-content: center;
    align-content: center;
`;

export const TextIcon = function (props: {name: string; height?: number; width?: number }) {
    return (
        <TextIconDiv height={props.height} width={props.width}>
            {props.name}
        </TextIconDiv>
    );
}