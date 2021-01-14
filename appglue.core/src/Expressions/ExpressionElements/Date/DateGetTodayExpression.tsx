import {BaseExpression} from "../../BaseExpression";
import {ExpressionValue} from "../../ExpressionValue";
import {ExpressionExpectedType} from "../../ExpressionExpectedType";
import React from "react";
import {RegisterExpression} from "../../Utilities/RegisterExpression";
import {ExpressionPiece} from "../../ExpressionStyles";
import {TextIcon} from "../../../CommonUI/TextIcon"
import { ObserveState } from "../../../CommonUI/StateManagement/ObserveState";

@RegisterExpression('Date', 'Get Today', <TextIcon name="s" />, ExpressionExpectedType.NUMBER)
export class DateGetTodayExpression extends BaseExpression {
    value1: ExpressionValue;

    constructor() {
        super({}, {});

        this.expressionValueType = ExpressionExpectedType.NUMBER;
        this.value1 = ExpressionValue.createExpressionValue(this, 'dateValue', ExpressionExpectedType.DATE);
    }

    render() {
        return (
            <ObserveState listenTo={this.value1!} control={() => (
                <ExpressionPiece hasChild={!!this.value1!.subExpression}>
                    get today
                </ExpressionPiece>
            )} />
        );
    }
}