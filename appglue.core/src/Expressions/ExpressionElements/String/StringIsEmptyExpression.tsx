import {BaseExpression} from "../../BaseExpression";
import {ExpressionValue} from "../../ExpressionValue";
import {ExpressionExpectedType} from "../../ExpressionExpectedType";
import {ExpressionValueRenderer} from "../../ExpressionValueRenderer";
import React from "react";
import {RegisterExpression} from "../../Utilities/RegisterExpression";
import {BracketedDiv, ExpressionPiece} from "../../ExpressionStyles";
import {TextEmptyIcon} from "../../../CommonUI/Icon/TextEmptyIcon";

@RegisterExpression('Text', 'String Is Empty', <TextEmptyIcon />, ExpressionExpectedType.BOOLEAN, true)
export class StringIsEmptyExpression extends BaseExpression {
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
                    text.isEmpty
                    <BracketedDiv>
                        <ExpressionValueRenderer el={this.value1!}/>
                    </BracketedDiv>
                </ExpressionPiece>
            </>
        );
    }
}