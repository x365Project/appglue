import {ExpressionValue} from "../ExpressionValue";
import {BaseExpression} from "../BaseExpression";
import {IBaseExpressionElement} from "./IBaseExpressionElement";
import {XExpressionEditor} from "../XExpressionEditor";
import {XExpressionDefinition} from "../XExpressionDefinition";
import {AutoBind} from "../../Common/AutoBind";
import {StateManager} from "../../CommonUI/StateManagement/StateManager";

export class ExpressionEditContext {
    private ownership: {[id: string] :  {owned: IBaseExpressionElement, owner : IBaseExpressionElement} }  = {};
    private selected? : string;
    emptyExpressionText : string = 'Click To Edit';

    expressionEditor? : XExpressionEditor;
    definition? : XExpressionDefinition;
    onSelection? : (selectedId: string) => void;

    clearSelection() : void {
        this.selected = undefined;
        StateManager.propertyChanged(this, 'selected');
        // this.refresh();
    }

    setSelection(id: string): void {
        this.selected = id;
        StateManager.propertyChanged(this, 'selected');
        if (this.onSelection) {
            this.onSelection(this.selected);
        }
    }

    getSelection() : string | null | undefined{
        return this.selected;
    }

    register(owned: IBaseExpressionElement, owner : IBaseExpressionElement) : void {
        // console.log('owned')
        // console.log(owned)
        // console.log('owner')
        // console.log(owned)

        if (owned._id === owner._id)
            throw 'cannot set owner as owned';

        this.ownership[owned._id] = {owned: owned, owner: owner};
    }

    getParent(id: string) : IBaseExpressionElement | null {
        return this.ownership[id]?.owner;
    }

    getElement(id: string) : IBaseExpressionElement | null {
        console.log(this.ownership);
        return this.ownership[id]?.owned;
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
        StateManager.changed(this);
    }

    getParentExpressionValue(id: string) : ExpressionValue | null {
        let parent = this.ownership[id];

        if (!parent) {
            // no parent
            return null;
        }

        if (ExpressionValue.isExpressionValue(parent.owner)){
            return parent.owner;
        }

        return this.getParentExpressionValue(parent.owner._id);
    }

}