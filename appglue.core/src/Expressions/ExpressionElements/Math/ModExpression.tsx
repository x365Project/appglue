import {BaseExpression} from "../../BaseExpression";
import {ExpressionValue} from "../../ExpressionValue";
import {ExpressionExpectedType} from "../../ExpressionExpectedType";
import {ExpressionValueRenderer} from "../../ExpressionValueRenderer";
import React from "react";
import {RegisterExpression} from "../../Utilities/RegisterExpression";
import {BracketedDiv, ExpressionPiece} from "../../ExpressionStyles";
import {ModIcon} from "../../../CommonUI/Icon/ModIcon"
import { ObserveState } from "../../../CommonUI/StateManagement/ObserveState";

@RegisterExpression('Math', 'Mod', <ModIcon />, ExpressionExpectedType.NUMBER)
export class ModExpression extends BaseExpression {
    value1: ExpressionValue;

    constructor() {
        super({}, {});

        this.expressionValueType = ExpressionExpectedType.NUMBER;
        this.value1 = ExpressionValue.createExpressionValue(this, 'modValue', ExpressionExpectedType.NUMBER_LIST);
    }

    render() {
        return (
            <ExpressionPiece>
                mod
                <BracketedDiv>
                    <ExpressionValueRenderer el={this.value1!}/>
                </BracketedDiv>
            </ExpressionPiece>
        );
    }
}