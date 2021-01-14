import React from "react";
import {ExpressionExpectedType} from "./ExpressionExpectedType";
import {BaseExpression} from "./BaseExpression";
import {ExpressionValueType} from "./ExpressionValueType";
import {IBaseExpressionElement} from "./Utilities/IBaseExpressionElement";
import {ExpressionEditContext} from "./Utilities/ExpressionEditContext";
import {RootExpression} from "./Utilities/RootExpression";
import {DataUtilities} from "../Common/DataUtilities";

export class XExpressionDefinition
    implements IBaseExpressionElement  {

    readonly canSelect: boolean = true;

    _id : string = DataUtilities.generateUniqueId();
    private rootExpression: RootExpression = new RootExpression();
    editContext?: ExpressionEditContext ;


    constructor() {
        this.editContext = new ExpressionEditContext();
        this.rootExpression.setEditContext(this.editContext, this);
        this.editContext.definition = this;
    }


    setEditContext(selection: ExpressionEditContext, owner: IBaseExpressionElement): void {
        this.editContext = selection;
        this.rootExpression.setEditContext(this.editContext, this);
    }


    render() : JSX.Element | undefined {
        return (
            this.rootExpression.render()
        );
    }

    get expressionValueType(): ExpressionExpectedType {
        return this.rootExpression.expressionValueType;
    }

    set expressionValueType(value: ExpressionExpectedType) {
        this.rootExpression.expressionValueType = value;
    }

    get expression(): BaseExpression | undefined {
        return this.rootExpression.expressionRoot.subExpression;
    }

    set expression(value: BaseExpression | undefined) {
        this.rootExpression.expressionRoot.subExpression = value;
    }

    get variableName(): string | undefined {
        return this.rootExpression.expressionRoot.variableName;
    }

    set variableName(value: string | undefined) {
        this.rootExpression.expressionRoot.variableName = value;
    }

    get value(): any {
        return this.rootExpression.expressionRoot.value;
    }

    set value(value: any) {
        this.rootExpression.expressionRoot.value = value;
    }

    get valueType(): ExpressionValueType {
        return this.rootExpression.expressionRoot.valueType;
    }

    set valueType(value: ExpressionValueType) {
        this.rootExpression.expressionRoot.valueType = value;
    }

}