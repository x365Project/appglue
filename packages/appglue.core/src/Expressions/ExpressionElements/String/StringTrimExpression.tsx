import {BaseExpression} from "../../BaseExpression";
import {ExpressionValue} from "../../ExpressionValue";
import {ExpressionExpectedType} from "../../ExpressionExpectedType";
import {ExpressionValueRenderer} from "../../ExpressionValueRenderer";
import React from "react";
import {RegisterExpression} from "../../Utilities/RegisterExpression";
import {BracketedDiv, ExpressionPiece} from "../../ExpressionStyles";
import {TrimIcon} from "../../../CommonUI/Icon/TrimIcon";

@RegisterExpression('Text', 'String Trim', <TrimIcon />, ExpressionExpectedType.STRING)
export class StringTrimExpression extends BaseExpression {
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
                    text.trim
                    <BracketedDiv>
                        <ExpressionValueRenderer el={this.value1!}/>
                    </BracketedDiv>
                </ExpressionPiece>
            </>
        );
    }
}