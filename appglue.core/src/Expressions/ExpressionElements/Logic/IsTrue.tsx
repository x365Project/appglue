import {BaseExpression} from "../../BaseExpression";
import {ExpressionValue} from "../../ExpressionValue";
import {ExpressionExpectedType} from "../../ExpressionExpectedType";
import {ExpressionValueRenderer} from "../../ExpressionValueRenderer";
import React from "react";
import {RegisterExpression} from "../../Utilities/RegisterExpression";
import {BracketedDiv, ExpressionPiece} from "../../ExpressionStyles";
import {TextIcon} from "../../../CommonUI/TextIcon";
import { ObserveState } from "../../../CommonUI/StateManagement/ObserveState";

@RegisterExpression('Logic', 'Is True', <TextIcon name={'T'}/>, ExpressionExpectedType.BOOLEAN, true )
export class IsTrueExpression extends BaseExpression {
    value1: ExpressionValue;

    constructor() {
        super({}, {});
        this.value1 = ExpressionValue.createExpressionValue(this, 'value1', ExpressionExpectedType.BOOLEAN);
        this.expressionValueType = ExpressionExpectedType.BOOLEAN;
    }

    render() {
        return (
            <ObserveState listenTo={this.value1!} control={() => (
                <BracketedDiv hasChild={!!this.value1!.subExpression}>
                    <ExpressionPiece hasChild={!!this.value1!.subExpression}>
                        <ExpressionValueRenderer el={this.value1!}/>
                    </ExpressionPiece>
                    <ExpressionPiece> {' is true'} </ExpressionPiece>
                </BracketedDiv>
            )} />
        );
    }
}