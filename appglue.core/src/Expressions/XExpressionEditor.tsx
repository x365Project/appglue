import React from "react";
import {XExpressionDefinition} from "./XExpressionDefinition";
import styled from "styled-components";
import {doRegister} from "./registerElements";

const WholeExpression = styled.div`
    font-family:    Mulish;
    font-size:      28px;
    color: #677C95;
`;

const Expression = styled.div`
  align-items: center;
  border: 2px solid lightgray;
  border-radius: 5px;
  padding-top: 15px;
  padding-right: 15px;
  padding-bottom: 15px;
  padding-left: 15px;
  width:     100%;
`;

const Expects = styled.div`
  padding-top: 15px;
  padding-right: 5px;
  padding-bottom: 15px;
  padding-left: 5px;
  clear: left;
  font-family:    Mulish;
  font-size:      12px;
`;


export class XExpressionEditor extends React.Component<{expression: XExpressionDefinition}> {


    constructor(props: { expression: XExpressionDefinition }) {
        super(props);
        props.expression.editContext!.expressionEditor = this;

        // ensure first registration
        doRegister();
    }

    render() {
        return (
            <WholeExpression>
                <Expression>
                    {
                        this.props.expression.render()
                    }
                </Expression>
                <Expects>
                    <i>expects <u>{this.props.expression.expressionValueType}</u></i> result
                </Expects>
            </WholeExpression>
                
        );
    }

}



