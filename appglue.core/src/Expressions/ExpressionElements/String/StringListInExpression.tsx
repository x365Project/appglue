import React from "react";
import {BaseExpression} from "../../BaseExpression";
import {ExpressionValue} from "../../ExpressionValue";
import {ExpressionValueRenderer} from "../../ExpressionValueRenderer";
import {RegisterExpression} from "../../Utilities/RegisterExpression";
import {ExpressionExpectedType} from "../../ExpressionExpectedType";
import {BracketedDiv, ExpressionPiece} from "../../ExpressionStyles";
import {TextContainsIcon} from "../../../CommonUI/Icon/TextContainsIcon"
import { ObserveMultiState } from "../../../CommonUI/StateManagement/ObserveMultiState";


@RegisterExpression('Text', 'String Is In List', <TextContainsIcon />, ExpressionExpectedType.BOOLEAN, true)
export class StringListInExpression extends BaseExpression {
    value1: ExpressionValue;
    value2: ExpressionValue;

    constructor() {
        super({}, {});
        this.value1 = ExpressionValue.createExpressionValue(this, 'value1', ExpressionExpectedType.STRING);
        this.value2 = ExpressionValue.createExpressionValue(this, 'value2', ExpressionExpectedType.STRING_LIST);
    }

    render() {
        return (
            <BracketedDiv>
                <ExpressionPiece>
                    <ExpressionValueRenderer el={this.value1!}/>
                </ExpressionPiece>
                <ExpressionPiece> in </ExpressionPiece>
                <ExpressionPiece>
                    <ExpressionValueRenderer el={this.value2!}/>
                </ExpressionPiece>
            </BracketedDiv>
        );
    }
}