import {BaseExpression} from "../../BaseExpression";
import {ExpressionValue} from "../../ExpressionValue";
import {ExpressionExpectedType} from "../../ExpressionExpectedType";
import {ExpressionValueRenderer} from "../../ExpressionValueRenderer";
import React from "react";
import {RegisterExpression} from "../../Utilities/RegisterExpression";
import {BracketedDiv, ExpressionPiece} from "../../ExpressionStyles";
import {AsPercentageIcon} from "../../../CommonUI/Icon/AsPercentageIcon"
import { ObserveState } from "../../../CommonUI/StateManagement/ObserveState";

@RegisterExpression('Math', 'As Percentage', <AsPercentageIcon />, ExpressionExpectedType.NUMBER)
export class AsPercentageExpression extends BaseExpression {
    value1: ExpressionValue;

    constructor() {
        super({}, {});

        this.expressionValueType = ExpressionExpectedType.NUMBER;
        this.value1 = ExpressionValue.createExpressionValue(this, 'value1');
    }

    render() {
        return (
            <ExpressionPiece>
                as percentage
                <BracketedDiv>
                    <ExpressionValueRenderer el={this.value1!}/>
                </BracketedDiv>
            </ExpressionPiece>
        );
    }
}