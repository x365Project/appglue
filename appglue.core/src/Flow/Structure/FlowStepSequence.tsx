import {BaseFlowStep} from "../Steps/BaseFlowStep";
import React from "react";
import {DataUtilities} from "../../Common/DataUtilities";
import {StateManager} from "../../CommonUI/StateManagement/StateManager";
import {PropertyEditorColor} from "../../CommonUI/PropertyEditing/PropertyEditorColor";
import {ObserveState} from "../../CommonUI/StateManagement/ObserveState";
import {IFlowStepSequence} from "./IFlowStepSequence";
import {FlowConstants} from "../CommonUI/FlowConstants";
import { IPosition } from "../CommonUI/IPosition";

export class FlowStepSequence implements IFlowStepSequence {
    
    _id: string = DataUtilities.generateUniqueId();
    name?: string;

    x: number = -1;
    y: number = -1;
    width: number = FlowConstants.DEFAULT_STACK_WIDTH;
    height: number = FlowConstants.DEFAULT_STACK_HEIGHT;

    getDestination(): IPosition {
        return {x: this.x, y: this.y};
    }
    private _stackColor?: string;

    private _canDelete: boolean = true;
    get canDelete(): boolean {
        return this._canDelete;
    }

    set canDelete(d: boolean) {
        this._canDelete = d;
    }

    private _canCopy: boolean = true;

    get canCopy(): boolean {
        return this._canCopy;
    }

    set canCopy(c: boolean) {
        this._canCopy = c;
    }

    steps: BaseFlowStep[] = [];
    
    get ports(): string[] {
        return [];
    }

    private _isCollapsed: boolean = false;
    get isCollapsed() {
        return this._isCollapsed;
    }

    set isCollapsed(collapsed: boolean) {
        this._isCollapsed = collapsed;
        StateManager.propertyChanged(this, 'isCollapsed');
    }

    get stackColor(): string | undefined {
        return this._stackColor;
    }

    set stackColor(color: string | undefined) {
        this._stackColor = color;
    }

    remove(step: BaseFlowStep): void {
        let index = this.steps.indexOf(step);
        if (index >= 0) {
            this.steps.splice(index, 1);
            StateManager.propertyChanged(this, 'steps');
        }
    }

    find(stepId: string): BaseFlowStep | null {
        for (let s of this.steps) {
            if (s._id === stepId) return s;
        }
        return null;
    }

    renderEditUI(): JSX.Element | null {

        return (
            <ObserveState listenTo={this}
                properties={["stackColor"]}
                control={
                    () => <PropertyEditorColor editObject={this} propertyName="stackColor" label="Stack Color" updateCallback={() => {
                       StateManager.propertyChanged(this, 'stackColor');
                    }} />
                }
            />
            
        );
    }

}