import {BaseExpression} from "../../BaseExpression";
import {ExpressionValue} from "../../ExpressionValue";
import {ExpressionExpectedType} from "../../ExpressionExpectedType";
import {ExpressionValueRenderer} from "../../ExpressionValueRenderer";
import React from "react";
import {RegisterExpression} from "../../Utilities/RegisterExpression";
import {BracketedDiv, ExpressionPiece} from "../../ExpressionStyles";
import {TextIcon} from "../../../CommonUI/TextIcon";

@RegisterExpression('Logic', 'Exists', <TextIcon name={'[-]'}/>, ExpressionExpectedType.BOOLEAN, true )
export class ExistsExpression extends BaseExpression {
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
                <ExpressionPiece> {' exists'} </ExpressionPiece>
            </BracketedDiv>
        );
    }
}