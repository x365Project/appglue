import {ExpressionExpectedType} from "./ExpressionExpectedType";
import {ExpressionValueType} from "./ExpressionValueType";
import {BaseExpression} from "./BaseExpression";
import {IBaseExpressionElement} from "./Utilities/IBaseExpressionElement";
import {ExpressionEditContext} from "./Utilities/ExpressionEditContext";
import {DataUtilities} from "../Common/DataUtilities";
import {StateManager} from "../CommonUI/StateManagement/StateManager";
import {ValidationIssue} from "../Common/IDesignValidationProvider";

export class ExpressionValue
    implements IBaseExpressionElement{

    _id : string = DataUtilities.generateUniqueId();
    name?: string;
    readonly canSelect: boolean = true;


    private expectedTypeValue: ExpressionExpectedType = ExpressionExpectedType.NUMBER;
    private valueTypeValue: ExpressionValueType = ExpressionValueType.UNSET;
    private subExpressionValue?: BaseExpression;
    private expressionValue: any;
    private variableNameValue?: string;

    editContext?: ExpressionEditContext ;

    static createExpressionValue(owner : BaseExpression, name: string, expectedType : ExpressionExpectedType = ExpressionExpectedType.NUMBER) : ExpressionValue{
        let v = new ExpressionValue();
        v.name = name;
        v.expectedTypeValue = expectedType;
        owner.registerExpressionValue(v);
        return v;
    }


    setEditContext(context: ExpressionEditContext, owner: IBaseExpressionElement): void {
        this.editContext = context;
        this.editContext.register(this, owner);

        if (this.subExpression) {
            this.subExpression.setEditContext(context, this);

        }
    }

    get variableName(): string | undefined {
        return this.variableNameValue;
    }

    set variableName(value: string | undefined) {
        this.variableNameValue = value;
        this.valueType = ExpressionValueType.VARIABLE;
    }
    get value(): any {
        return this.expressionValue;
    }

    set value(value: any) {
        this.expressionValue = value;
        this.valueType = ExpressionValueType.VALUE;

    }
    get subExpression(): BaseExpression | undefined {
        return this.subExpressionValue;
    }

    set subExpression(value: BaseExpression | undefined) {
        this.subExpressionValue = value;

        if (!value)
        {
            this.valueType = ExpressionValueType.UNSET;
        } else {
            this.valueType = ExpressionValueType.SUBEXPRESSION;
            if (this.editContext) {
                value.setEditContext(this.editContext, this)
            }
        }

    }

    clear() {
        this.valueType = ExpressionValueType.UNSET;
    }

    get valueType(): ExpressionValueType {
        return this.valueTypeValue;
    }

    set valueType(value: ExpressionValueType) {
        StateManager.propertyChanged(this, 'valueTypeValue');
        this.valueTypeValue = value;
    }

    get expectedType(): ExpressionExpectedType {
        return this.expectedTypeValue;
    }

    set expectedType(value: ExpressionExpectedType) {
        this.expectedTypeValue = value;
    }

    static isExpressionValue(item: any): item is ExpressionValue {
        return item instanceof ExpressionValue;
    }

    getValidationIssues(): ValidationIssue[] {
        // check type
        // check to see if unset

        let issues : ValidationIssue[] = [];

        if (this.valueTypeValue === ExpressionValueType.UNSET)
            issues.push(new ValidationIssue('Expression Value is Required', undefined, this._id));

        if (this.valueTypeValue === ExpressionValueType.VARIABLE && !this.variableName)
            issues.push(new ValidationIssue('Variable Name is Required', undefined, this._id));

        if (this.valueTypeValue === ExpressionValueType.VALUE && (this.value === null || this.value === undefined))
            issues.push(new ValidationIssue('Value is Required', undefined, this._id));

        if (this.valueTypeValue === ExpressionValueType.SUBEXPRESSION && !this.subExpression)
            issues.push(new ValidationIssue('Expression is Required', undefined, this._id));

        return issues;
    }



}