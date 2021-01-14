import {BaseExpression} from "../../BaseExpression";
import {ExpressionValue} from "../../ExpressionValue";
import {ExpressionExpectedType} from "../../ExpressionExpectedType";
import {ExpressionValueRenderer} from "../../ExpressionValueRenderer";
import React from "react";
import {RegisterExpression} from "../../Utilities/RegisterExpression";
import {BracketedDiv, ExpressionPiece} from "../../ExpressionStyles";
import {IsFalseIcon} from "../../../CommonUI/Icon/IsFalseIcon";

@RegisterExpression('Logic', 'Is False', <IsFalseIcon />, ExpressionExpectedType.BOOLEAN, true )
export class IsFalseExpression extends BaseExpression {
    value1: ExpressionValue;

    constructor() {
        super({}, {});
        this.value1 = ExpressionValue.createExpressionValue(this, 'value1', ExpressionExpectedType.BOOLEAN);
        this.expressionValueType = ExpressionExpectedType.BOOLEAN;
    }

    render() {
        return (
            <BracketedDiv>
                <ExpressionPiece>
                    <ExpressionValueRenderer el={this.value1!}/>
                </ExpressionPiece>
                <ExpressionPiece> {' is false'} </ExpressionPiece>
            </BracketedDiv>
        );
    }
}