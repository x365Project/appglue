import React from "react";
import {BaseExpression} from "../../BaseExpression";
import {ExpressionValue} from "../../ExpressionValue";
import {ExpressionValueRenderer} from "../../ExpressionValueRenderer";
import styled from "styled-components";
import {RegisterExpression} from "../../Utilities/RegisterExpression";
import {ExpressionExpectedType} from "../../ExpressionExpectedType";
import {ExpressionPiece} from "../../ExpressionStyles";
import {DevideIcon} from "../../../CommonUI/Icon/DevideIcon";

const DivisionDiv = styled.div`
    font-size:      18px;
    border-left: 1px solid darkgray;
    border-right: 1px solid darkgray;
    border-radius: 10px;
    padding-left: 10px;
    padding-right: 10px;
    padding-top: 2px;
    padding-bottom: 2px;
    margin-left: 10px;
    margin-right: 10px;
`;



const TopDiv = styled.div`
  border-bottom: 3px solid #677C95;
  margin-top: 5px;
  margin-bottom: 5px;
  margin-left: 5px;
  margin-right: 5px;
  padding-bottom: 5px;
  display: flex;
  width: 100%; 
  align-items: center;
  justify-content: center;
  
`;
const BottomDiv = styled.div`
  display: flex;
  margin: 5px;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

@RegisterExpression('Math', 'Divide', <DevideIcon />, ExpressionExpectedType.NUMBER, true)
export class DivideExpression extends BaseExpression {
    divideValue: ExpressionValue;
    divideBy: ExpressionValue;

    constructor() {
        super({}, {});
        this.divideValue = ExpressionValue.createExpressionValue(this, 'divideValue');
        this.divideBy = ExpressionValue.createExpressionValue(this, 'divideBy');
    }

    render() {
        return (
            <ExpressionPiece>
                <DivisionDiv>
                    <TopDiv>
                        <ExpressionValueRenderer el={this.divideValue!}/>
                    </TopDiv>
                    <BottomDiv>
                        <ExpressionValueRenderer el={this.divideBy !}/>
                    </BottomDiv>
                </DivisionDiv>
            </ExpressionPiece>
        );
    }
}