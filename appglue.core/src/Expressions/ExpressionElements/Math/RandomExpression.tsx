import React from "react";
import {BaseExpression} from "../../BaseExpression";
import {RegisterExpression} from "../../Utilities/RegisterExpression";
import {ExpressionExpectedType} from "../../ExpressionExpectedType";
import {BracketedDiv} from "../../ExpressionStyles";
import {RandomIcon} from "../../../CommonUI/Icon/RandomIcon"


@RegisterExpression('Math', 'Random Number', <RandomIcon />, ExpressionExpectedType.NUMBER)
export class RandomExpression extends BaseExpression {

    constructor() {
        super({}, {});
    }

    render() {
        return (
            <BracketedDiv>
                Random Number
            </BracketedDiv>
        );
    }
}