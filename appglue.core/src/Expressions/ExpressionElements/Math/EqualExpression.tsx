import React from "react";
import {BaseExpression} from "../../BaseExpression";
import {ExpressionValue} from "../../ExpressionValue";
import {ExpressionValueRenderer} from "../../ExpressionValueRenderer";
import {RegisterExpression} from "../../Utilities/RegisterExpression";
import {ExpressionExpectedType} from "../../ExpressionExpectedType";
import {BracketedDiv, ExpressionDiv, ExpressionPiece} from "../../ExpressionStyles";
import {EqualIcon} from "../../../CommonUI/Icon/EqualIcon"
import { ObserveMultiState } from "../../../CommonUI/StateManagement/ObserveMultiState";


@RegisterExpression('Math', 'Equal', <EqualIcon />, ExpressionExpectedType.NUMBER)
export class EqualExpression extends BaseExpression {
    value1: ExpressionValue;
    value2: ExpressionValue;

    constructor() {
        super({}, {});
        this.value1 = ExpressionValue.createExpressionValue(this, 'value1');
        this.value2 = ExpressionValue.createExpressionValue(this,'value2');
    }

    render() {
        return (
                <BracketedDiv>
                    <ExpressionPiece>
                        <ExpressionValueRenderer el={this.value1!}/>
                    </ExpressionPiece>
                    <ExpressionPiece> = </ExpressionPiece>
                    <ExpressionPiece>
                        <ExpressionValueRenderer el={this.value2 !}/>
                    </ExpressionPiece>
                </BracketedDiv>
        );
    }
}