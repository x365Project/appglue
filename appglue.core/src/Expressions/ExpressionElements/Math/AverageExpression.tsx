import {BaseExpression} from "../../BaseExpression";
import {ExpressionValue} from "../../ExpressionValue";
import {ExpressionExpectedType} from "../../ExpressionExpectedType";
import {ExpressionValueRenderer} from "../../ExpressionValueRenderer";
import React from "react";
import {RegisterExpression} from "../../Utilities/RegisterExpression";
import {BracketedDiv, ExpressionPiece} from "../../ExpressionStyles";
import {AverageIcon} from "../../../CommonUI/Icon/AverageIcon"

@RegisterExpression('Math', 'Average', <AverageIcon />, ExpressionExpectedType.NUMBER, true)
export class AverageExpression extends BaseExpression {
    value1: ExpressionValue;

    constructor() {
        super({}, {});

        this.expressionValueType = ExpressionExpectedType.NUMBER;
        this.value1 = ExpressionValue.createExpressionValue(this, 'averageValue', ExpressionExpectedType.NUMBER_LIST);
    }

    render() {
        return (
                <ExpressionPiece>
                    average
                    <BracketedDiv>
                        <ExpressionValueRenderer el={this.value1!}/>
                    </BracketedDiv>
                </ExpressionPiece>
        );
    }
}