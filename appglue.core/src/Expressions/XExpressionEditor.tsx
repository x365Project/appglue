import React from "react";
import {XExpressionDefinition} from "./XExpressionDefinition";
import styled from "styled-components";

const WholeExpression = styled.div`
    font-family:    monospace;
    font-size:      28px;
`;

const Expression = styled.div`
  float: left;
  display: flex;
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
  float: left;
  padding-top: 15px;
  padding-right: 5px;
  padding-bottom: 15px;
  padding-left: 5px;
  clear: left;
  font-family:    default;
  font-size:      12px;
`;


export class XExpressionEditor extends React.Component<{expression: XExpressionDefinition}> {


    constructor(props: { expression: XExpressionDefinition }) {
        super(props);
        props.expression.editContext!.expressionEditor = this;
    }

    render() {
        return (
            <WholeExpression >
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



