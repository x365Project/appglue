import {BaseExpression} from "../BaseExpression";
import {ExpressionValue} from "../ExpressionValue";
import {ExpressionValueRenderer} from "../ExpressionValueRenderer";
import {ExpressionEditContext} from "./ExpressionEditContext";
import {IBaseExpressionElement} from "./IBaseExpressionElement";
import React from "react";

// this one should not be registered as it cannot be added
export class RootExpression extends BaseExpression {
    expressionRoot: ExpressionValue;
    readonly canSelect: boolean = false;

    constructor() {
        super({}, {});

        this.expressionRoot = new ExpressionValue();
    }

    render() {
        return <ExpressionValueRenderer el={this.expressionRoot!}/>
    }

    setEditContext(selection: ExpressionEditContext, owner: IBaseExpressionElement): void {
        super.setEditContext(selection, owner);
        this.expressionRoot.setEditContext(selection, this);
    }

}