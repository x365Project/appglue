import {BaseExpression} from "../../BaseExpression";
import {ExpressionValue} from "../../ExpressionValue";
import {ExpressionExpectedType} from "../../ExpressionExpectedType";
import {ExpressionValueRenderer} from "../../ExpressionValueRenderer";
import React from "react";
import {RegisterExpression} from "../../Utilities/RegisterExpression";
import {BracketedDiv, ExpressionPiece} from "../../ExpressionStyles";
import {SumIcon} from "../../../CommonUI/Icon/SumIcon"
import { ObserveState } from "../../../CommonUI/StateManagement/ObserveState";

@RegisterExpression('Math', 'Sum', <SumIcon />, ExpressionExpectedType.NUMBER, true)
export class SumExpression extends BaseExpression {
    value1: ExpressionValue;

    constructor() {
        super({}, {});

        this.expressionValueType = ExpressionExpectedType.NUMBER;
        this.value1 = ExpressionValue.createExpressionValue(this, 'sumValue', ExpressionExpectedType.NUMBER_LIST);
    }

    render() {
        return (
            <ObserveState listenTo={this.value1!} control={() => (
                <ExpressionPiece hasChild={!!this.value1!.subExpression}>
                    sum
                    <BracketedDiv hasChild={!!this.value1!.subExpression}>
                        <ExpressionValueRenderer el={this.value1!}/>
                    </BracketedDiv>
                </ExpressionPiece>
            )} />
        );
    }
}