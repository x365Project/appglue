import React from "react";
import styled from "styled-components";

const TextIconDiv = styled.div`
    font-family: Mulish;
    font-size: 10px;
    border: 1px solid black;
    border-radius: 5px;
    padding: 5px;
    background: darkgray;
    color: white;
    width: 30px;
    height: 30px;
    min-width: 30px;
    min-height: 30px;
    max-height: 30px;
    text-align: center;
    justify-content: center;
    align-content: center;
`;

export const TextIcon = function (props: {name: string}) {
    return (
        <TextIconDiv>
            {props.name}
        </TextIconDiv>
    );
}