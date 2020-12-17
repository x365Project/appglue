import {BaseExpression} from "../../BaseExpression";
import {ExpressionValue} from "../../ExpressionValue";
import {ExpressionExpectedType} from "../../ExpressionExpectedType";
import {ExpressionValueRenderer} from "../../ExpressionValueRenderer";
import React from "react";
import {RegisterExpression} from "../../Utilities/RegisterExpression";
import {BracketedDiv, ExpressionPiece} from "../../ExpressionStyles";
import {RoundIcon} from "../../../CommonUI/Icon/RoundIcon"
import { ObserveState } from "../../../CommonUI/StateManagement/ObserveState";

@RegisterExpression('Math', 'Round', <RoundIcon />, ExpressionExpectedType.NUMBER)
export class RoundExpression extends BaseExpression {
    value1: ExpressionValue;

    constructor() {
        super({}, {});

        this.expressionValueType = ExpressionExpectedType.NUMBER;
        this.value1 = ExpressionValue.createExpressionValue(this, 'value1');
    }

    render() {
        return (
            <ObserveState listenTo={this.value1!} control={() => (
                <ExpressionPiece hasChild={!!this.value1!.subExpression}>
                    round
                    <BracketedDiv hasChild={!!this.value1!.subExpression}>
                        <ExpressionValueRenderer el={this.value1!}/>
                    </BracketedDiv>
                </ExpressionPiece>
            )} />
        );
    }
}