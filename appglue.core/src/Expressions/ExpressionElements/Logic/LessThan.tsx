import {BaseExpression} from "../../BaseExpression";
import {ExpressionValue} from "../../ExpressionValue";
import {ExpressionExpectedType} from "../../ExpressionExpectedType";
import {ExpressionValueRenderer} from "../../ExpressionValueRenderer";
import React from "react";
import {RegisterExpression} from "../../Utilities/RegisterExpression";
import {BracketedDiv, ExpressionPiece} from "../../ExpressionStyles";
import {LessThanIcon} from "../../../CommonUI/Icon/LessThanIcon";
import { ObserveMultiState } from "../../../CommonUI/StateManagement/ObserveMultiState";

@RegisterExpression('Logic', 'Less Than', <LessThanIcon />, ExpressionExpectedType.BOOLEAN, true )
export class LessThanExpression extends BaseExpression {
    value1: ExpressionValue;
    value2: ExpressionValue;

    constructor() {
        super({}, {});
        this.value1 = ExpressionValue.createExpressionValue(this, 'value1', ExpressionExpectedType.NUMBER);
        this.value2 = ExpressionValue.createExpressionValue(this,'value2', ExpressionExpectedType.NUMBER);
        this.expressionValueType = ExpressionExpectedType.BOOLEAN;
    }

    render() {
        return (
            <ObserveMultiState listenTo={[this.value1!, this.value2!]} control={() => (
                <BracketedDiv hasChild={!!this.value1!.subExpression || !!this.value2.subExpression}>
                    <ExpressionPiece hasChild={!!this.value1!.subExpression}>
                        <ExpressionValueRenderer el={this.value1!}/>
                    </ExpressionPiece>
                    <ExpressionPiece> {'<'} </ExpressionPiece>
                    <ExpressionPiece hasChild={!!this.value2!.subExpression}>
                        <ExpressionValueRenderer el={this.value2 !}/>
                    </ExpressionPiece>
                </BracketedDiv>
            )} />
        );
    }
}