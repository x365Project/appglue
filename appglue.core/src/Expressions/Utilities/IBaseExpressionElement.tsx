import {XExpressionDefinition} from "../XExpressionDefinition";
import {ExpressionEditContext} from "./ExpressionEditContext";


export interface IBaseExpressionElement {
    _id : string;
    readonly canSelect : boolean;
    setEditContext(editContext: ExpressionEditContext, owner: IBaseExpressionElement) : void;
}