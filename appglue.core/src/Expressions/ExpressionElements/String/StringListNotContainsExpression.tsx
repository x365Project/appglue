import React from "react";
import {BaseExpression} from "../../BaseExpression";
import {ExpressionValue} from "../../ExpressionValue";
import {ExpressionValueRenderer} from "../../ExpressionValueRenderer";
import {RegisterExpression} from "../../Utilities/RegisterExpression";
import {ExpressionExpectedType} from "../../ExpressionExpectedType";
import {BracketedDiv, ExpressionPiece} from "../../ExpressionStyles";
import {NotContainsIcon} from "../../../CommonUI/Icon/NotContainsIcon"


@RegisterExpression('Text', 'String List Not Contains', <NotContainsIcon />, ExpressionExpectedType.STRING)
export class StringListNotContainsExpression extends BaseExpression {
    value1: ExpressionValue;
    value2: ExpressionValue;

    constructor() {
        super({}, {});
        this.value1 = ExpressionValue.createExpressionValue(this, 'value1', ExpressionExpectedType.STRING_LIST);
        this.value2 = ExpressionValue.createExpressionValue(this, 'value2', ExpressionExpectedType.STRING);
    }

    render() {
        return (
            <BracketedDiv>
                <ExpressionPiece>
                    <ExpressionValueRenderer el={this.value1!}/>
                </ExpressionPiece>
                <ExpressionPiece> not contains </ExpressionPiece>
                <ExpressionPiece>
                    <ExpressionValueRenderer el={this.value2 !}/>
                </ExpressionPiece>
            </BracketedDiv>
        );
    }
}