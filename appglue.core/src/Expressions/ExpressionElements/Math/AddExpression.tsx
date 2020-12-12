import React from "react";
import {BaseExpression} from "../../BaseExpression";
import {ExpressionValue} from "../../ExpressionValue";
import {ExpressionValueRenderer} from "../../ExpressionValueRenderer";
import {RegisterExpression} from "../../Utilities/RegisterExpression";
import {ExpressionExpectedType} from "../../ExpressionExpectedType";
import {BracketedDiv, ExpressionDiv, ExpressionPiece} from "../../ExpressionStyles";
import {AddOutlined} from "@material-ui/icons";


@RegisterExpression('Math', 'Add', <AddOutlined fontSize={'small'}/>, ExpressionExpectedType.NUMBER, true)
export class AddExpression extends BaseExpression {
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
                <ExpressionPiece> + </ExpressionPiece>
                <ExpressionPiece>
                    <ExpressionValueRenderer el={this.value2 !}/>
                </ExpressionPiece>
            </BracketedDiv>
        );
    }
}