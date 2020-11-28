import {ExpressionValue} from "../ExpressionValue";
import {BaseExpression} from "../BaseExpression";
import {IBaseExpressionElement} from "./IBaseExpressionElement";
import {XExpressionEditor} from "../XExpressionEditor";
import {XExpressionDefinition} from "../XExpressionDefinition";
import {AutoBind} from "../../Common/AutoBind";

export class ExpressionEditContext {
    private ownership: {[id: string] :  IBaseExpressionElement}  = {};
    private selected? : string;

    expressionEditor? : XExpressionEditor;
    definition? : XExpressionDefinition;

    clearSelection() : void {
        this.selected = undefined;
        this.refresh();
    }

    setSelection(id: string): void {
        this.selected = id;
        this.refresh();
    }

    getSelection() : string | null | undefined{
        return this.selected;
    }

    register(id: string, owner : IBaseExpressionElement) : void {
        this.ownership[id] = owner;
    }

    getParent(id: string) : IBaseExpressionElement | null {
        return this.ownership[id];
    }


    canSelectParent(id: string) : boolean {
        let parent = this.getParent(id);

        while (parent != null) {
            if (parent.canSelect)
                return true;

            parent = this.getParent(parent._id);
        }

        return false;
    }

    selectParent(id: string) {
        let parent = this.getParent(id);

        while (parent != null) {
            if (parent.canSelect) {
                this.setSelection(parent._id);
            }

            parent = this.getParent(parent._id);
        }

    }

    @AutoBind
    refresh() {
        this.expressionEditor?.forceUpdate();
    }

    getParentExpressionValue(id: string) : ExpressionValue | null {
        let thisId = id;

        console.log('owners');
        console.log(this.ownership);

        console.log(thisId);
        let parentEv = this.ownership[thisId] as ExpressionValue;
        let parent = this.ownership[thisId];

        console.log('parent');
        console.log(parent);
        console.log('parent as expression value');
        console.log(parentEv);

        if (!parent) {
            // no parent
            console.log('could not find parent')
            return null;
        }

        if (parent instanceof ExpressionValue)
            return parent;

        return this.getParentExpressionValue(parent._id);


    }

}