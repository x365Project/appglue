import {BaseExpression} from "../../BaseExpression";
import {ExpressionValue} from "../../ExpressionValue";
import {ExpressionExpectedType} from "../../ExpressionExpectedType";
import {ExpressionValueRenderer} from "../../ExpressionValueRenderer";
import React from "react";
import {RegisterExpression} from "../../Utilities/RegisterExpression";
import {BracketedDiv, ExpressionPiece} from "../../ExpressionStyles";
import {EmailValidIcon} from "../../../CommonUI/Icon/EmailValidIcon";

@RegisterExpression('Text', 'Email Is Valid', <EmailValidIcon />, ExpressionExpectedType.BOOLEAN)
export class StringIsValidEmailExpression extends BaseExpression {
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
                    text.isEmail
                    <BracketedDiv>
                        <ExpressionValueRenderer el={this.value1!}/>
                    </BracketedDiv>
                </ExpressionPiece>
            </>
        );
    }
}