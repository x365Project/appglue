import {BaseExpression} from "../../BaseExpression";
import {ExpressionValue} from "../../ExpressionValue";
import {ExpressionExpectedType} from "../../ExpressionExpectedType";
import {ExpressionValueRenderer} from "../../ExpressionValueRenderer";
import React from "react";
import {RegisterExpression} from "../../Utilities/RegisterExpression";
import {BracketedDiv, ExpressionPiece} from "../../ExpressionStyles";
import {NotEmptyIcon} from "../../../CommonUI/Icon/NotEmptyIcon";

@RegisterExpression('Text', 'String Is Not Empty', <NotEmptyIcon />, ExpressionExpectedType.BOOLEAN)
export class StringIsNotEmptyExpression extends BaseExpression {
    value1: ExpressionValue;

    constructor() {
        super({}, {});

        this.expressionValueType = ExpressionExpectedType.STRING;
        this.value1 = ExpressionValue.createExpressionValue(this, 'stringValue', ExpressionExpectedType.STRING);
    }

    render() {
        return (
            <>
                <ExpressionPiece>
                    text.isNotEmpty
                    <BracketedDiv>
                        <ExpressionValueRenderer el={this.value1!}/>
                    </BracketedDiv>
                </ExpressionPiece>
            </>
        );
    }
}