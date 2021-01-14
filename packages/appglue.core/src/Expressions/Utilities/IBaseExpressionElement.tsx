import {XExpressionDefinition} from "../XExpressionDefinition";
import {ExpressionEditContext} from "./ExpressionEditContext";
import {IDesignValidationProvider, ValidationIssue} from "../../Common/IDesignValidationProvider";


export interface IBaseExpressionElement  {
    _id : string;
    readonly canSelect : boolean;
    setEditContext(editContext: ExpressionEditContext, owner: IBaseExpressionElement) : void;
}