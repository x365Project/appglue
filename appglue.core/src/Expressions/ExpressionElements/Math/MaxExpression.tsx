import {BaseExpression} from "../../BaseExpression";
import {ExpressionValue} from "../../ExpressionValue";
import {ExpressionExpectedType} from "../../ExpressionExpectedType";
import {ExpressionValueRenderer} from "../../ExpressionValueRenderer";
import React from "react";
import {RegisterExpression} from "../../Utilities/RegisterExpression";
import {BracketedDiv, ExpressionPiece} from "../../ExpressionStyles";
import {MaxIcon} from "../../../CommonUI/Icon/MaxIcon"
import { ObserveState } from "../../../CommonUI/StateManagement/ObserveState";

@RegisterExpression('Math', 'Max', <MaxIcon />, ExpressionExpectedType.NUMBER)
export class MaxExpression extends BaseExpression {
    value1: ExpressionValue;

    constructor() {
        super({}, {});

        this.expressionValueType = ExpressionExpectedType.NUMBER;
        this.value1 = ExpressionValue.createExpressionValue(this, 'maxValue', ExpressionExpectedType.NUMBER_LIST);
    }

    render() {
        return (
            <ObserveState listenTo={this.value1!} control={() => (
                <ExpressionPiece hasChild={!!this.value1!.subExpression}>
                    Max
                    <BracketedDiv hasChild={!!this.value1!.subExpression}>
                        <ExpressionValueRenderer el={this.value1!}/>
                    </BracketedDiv>
                </ExpressionPiece>
            )} />
        );
    }
}