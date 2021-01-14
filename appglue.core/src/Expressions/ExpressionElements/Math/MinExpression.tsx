import {BaseExpression} from "../../BaseExpression";
import {ExpressionValue} from "../../ExpressionValue";
import {ExpressionExpectedType} from "../../ExpressionExpectedType";
import {ExpressionValueRenderer} from "../../ExpressionValueRenderer";
import React from "react";
import {RegisterExpression} from "../../Utilities/RegisterExpression";
import {BracketedDiv, ExpressionPiece} from "../../ExpressionStyles";
import {MinIcon} from "../../../CommonUI/Icon/MinIcon"
import { ObserveState } from "../../../CommonUI/StateManagement/ObserveState";

@RegisterExpression('Math', 'Min', <MinIcon />, ExpressionExpectedType.NUMBER)
export class MinExpression extends BaseExpression {
    value1: ExpressionValue;

    constructor() {
        super({}, {});

        this.expressionValueType = ExpressionExpectedType.NUMBER;
        this.value1 = ExpressionValue.createExpressionValue(this, 'minValue', ExpressionExpectedType.NUMBER_LIST);
    }

    render() {
        return (
            <ExpressionPiece>
                min
                <BracketedDiv>
                    <ExpressionValueRenderer el={this.value1!}/>
                </BracketedDiv>
            </ExpressionPiece>
        );
    }
}