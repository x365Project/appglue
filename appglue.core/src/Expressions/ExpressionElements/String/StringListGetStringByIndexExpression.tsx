import React from "react";
import {BaseExpression} from "../../BaseExpression";
import {ExpressionValue} from "../../ExpressionValue";
import {ExpressionValueRenderer} from "../../ExpressionValueRenderer";
import {RegisterExpression} from "../../Utilities/RegisterExpression";
import {ExpressionExpectedType} from "../../ExpressionExpectedType";
import {BracketedDiv, ExpressionPiece} from "../../ExpressionStyles";
import {CombineIcon} from "../../../CommonUI/Icon/CombineIcon"
import { ObserveMultiState } from "../../../CommonUI/StateManagement/ObserveMultiState";


@RegisterExpression('Text', 'String List Get String By Index', <CombineIcon />, ExpressionExpectedType.STRING)
export class StringListGetStringByIndexExpression extends BaseExpression {
    value1: ExpressionValue;
    value2: ExpressionValue;

    constructor() {
        super({}, {});
        this.value1 = ExpressionValue.createExpressionValue(this, 'value1', ExpressionExpectedType.NUMBER);
        this.value2 = ExpressionValue.createExpressionValue(this, 'value2', ExpressionExpectedType.STRING_LIST);
    }

    render() {
        return (
            <BracketedDiv>
                <ExpressionPiece>
                    <ExpressionValueRenderer el={this.value1!}/>
                </ExpressionPiece>
                <ExpressionPiece>th of</ExpressionPiece>
                <ExpressionPiece>
                    <ExpressionValueRenderer el={this.value2 !}/>
                </ExpressionPiece>
            </BracketedDiv>
        );
    }
}