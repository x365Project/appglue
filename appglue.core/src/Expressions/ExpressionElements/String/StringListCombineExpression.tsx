import React from "react";
import {BaseExpression} from "../../BaseExpression";
import {ExpressionValue} from "../../ExpressionValue";
import {ExpressionValueRenderer} from "../../ExpressionValueRenderer";
import {RegisterExpression} from "../../Utilities/RegisterExpression";
import {ExpressionExpectedType} from "../../ExpressionExpectedType";
import {BracketedDiv, ExpressionPiece} from "../../ExpressionStyles";
import {CombineIcon} from "../../../CommonUI/Icon/CombineIcon"
import { ObserveMultiState } from "../../../CommonUI/StateManagement/ObserveMultiState";


@RegisterExpression('Text', 'String List Combine', <CombineIcon />, ExpressionExpectedType.STRING_LIST)
export class StringListCombineExpression extends BaseExpression {
    value1: ExpressionValue;
    value2: ExpressionValue;

    constructor() {
        super({}, {});
        this.value1 = ExpressionValue.createExpressionValue(this, 'value1', ExpressionExpectedType.STRING_LIST);
        this.value2 = ExpressionValue.createExpressionValue(this,'value2', ExpressionExpectedType.STRING_LIST);
    }

    render() {
        return (
            <ObserveMultiState listenTo={[this.value1!, this.value2!]} control={() => (
                <BracketedDiv hasChild={!!this.value1!.subExpression || !!this.value2!.subExpression}>
                    <ExpressionPiece hasChild={!!this.value1!.subExpression}>
                        <ExpressionValueRenderer el={this.value1!}/>
                    </ExpressionPiece>
                    <ExpressionPiece> combine </ExpressionPiece>
                    <ExpressionPiece hasChild={!!this.value2!.subExpression}>
                        <ExpressionValueRenderer el={this.value2 !}/>
                    </ExpressionPiece>
                </BracketedDiv>
            ) }/>
        );
    }
}