import React from "react";
import {ExpressionExpectedType} from "./ExpressionExpectedType";
import {ExpressionValue} from "./ExpressionValue";
import {IBaseExpressionElement} from "./Utilities/IBaseExpressionElement";
import {generateUniqueId} from "../Common/DataUtilities";
import {ExpressionEditContext} from "./Utilities/ExpressionEditContext";

export abstract class BaseExpression
    extends React.Component<{}, {}>
    implements IBaseExpressionElement{

    readonly canSelect: boolean = true;
    expressionValueType: ExpressionExpectedType = ExpressionExpectedType.NUMBER;
    _id : string = generateUniqueId();
    private values : ExpressionValue[] = [];


    // non serialized 
    editContext?: ExpressionEditContext ;

    setEditContext(editContext: ExpressionEditContext, owner: IBaseExpressionElement): void {
        this.editContext = editContext;

        for (let v of this.values) {
            v.setEditContext(editContext, this);
        }
    }

    getExpressionValues() : ExpressionValue[] {
        return this.values;
    }

    createExpressionValue(name: string,  createValueType: ExpressionExpectedType = ExpressionExpectedType.NUMBER) {
        this.getExpressionValue(name, true, createValueType);
    }

    getExpressionValue(name: string, createIfMissing : boolean = true, createValueType: ExpressionExpectedType | null = null) : ExpressionValue | null {
        for (let v of this.values) {
            if (v.name === name) {
                return v;
            }
        }

        if (createIfMissing) {
            let v = new ExpressionValue();
            v.name = name;
            if (createValueType)
                v.expectedType = createValueType;

            this.values.push(v);
            return v;
        }

        return null;
    }

    registerExpressionValue(expressionValue : ExpressionValue): void {
        this.values.push(expressionValue);
        if (this.editContext) {
            this.editContext.register(expressionValue._id, this);
            expressionValue.setEditContext(this.editContext, this);
        }
    }

}