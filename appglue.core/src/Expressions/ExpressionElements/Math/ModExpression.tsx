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
            <ObserveState listenTo={this.value1!} control={() => (
                <ExpressionPiece hasChild={!!this.value1!.subExpression}>
                    mod
                    <BracketedDiv hasChild={!!this.value1!.subExpression}>
                        <ExpressionValueRenderer el={this.value1!}/>
                    </BracketedDiv>
                </ExpressionPiece>
            )} />
        );
    }
}