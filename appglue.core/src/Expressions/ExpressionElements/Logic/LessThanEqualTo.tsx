import {BaseExpression} from "../../BaseExpression";
import {ExpressionValue} from "../../ExpressionValue";
import {ExpressionExpectedType} from "../../ExpressionExpectedType";
import {ExpressionValueRenderer} from "../../ExpressionValueRenderer";
import React from "react";
import {RegisterExpression} from "../../Utilities/RegisterExpression";
import {BracketedDiv, ExpressionPiece} from "../../ExpressionStyles";
import {LessThanEqualIcon} from "../../../CommonUI/Icon/LessThanEqualIcon";
import { ObserveMultiState } from "../../../CommonUI/StateManagement/ObserveMultiState";

@RegisterExpression('Logic', 'Less Than-Equal To', <LessThanEqualIcon />, ExpressionExpectedType.BOOLEAN)
export class LessThanEqualToExpression extends BaseExpression {
    value1: ExpressionValue;
    value2: ExpressionValue;

    constructor() {
        super({}, {});
        this.value1 = ExpressionValue.createExpressionValue(this, 'value1', ExpressionExpectedType.NUMBER);
        this.value2 = ExpressionValue.createExpressionValue(this,'value2', ExpressionExpectedType.NUMBER);
        this.expressionValueType = ExpressionExpectedType.BOOLEAN;
    }

    render() {
        return (
            <BracketedDiv>
                <ExpressionPiece>
                    <ExpressionValueRenderer el={this.value1!}/>
                </ExpressionPiece>
                <ExpressionPiece> {'<='} </ExpressionPiece>
                <ExpressionPiece>
                    <ExpressionValueRenderer el={this.value2 !}/>
                </ExpressionPiece>
            </BracketedDiv>
        );
    }
}