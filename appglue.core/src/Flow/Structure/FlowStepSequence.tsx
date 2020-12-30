import {BaseFlowStep} from "../Steps/BaseFlowStep";
import React from "react";
import {DataUtilities} from "../../Common/DataUtilities";
import {StateManager} from "../../CommonUI/StateManagement/StateManager";
import {PropertyEditorColor} from "../../CommonUI/PropertyEditing/PropertyEditorColor";
import {ObserveState} from "../../CommonUI/StateManagement/ObserveState";
import {IFlowStepSequence} from "./IFlowStepSequence";

export class FlowStepSequence implements IFlowStepSequence {
    _id: string = DataUtilities.generateUniqueId();
    name?: string;

    x: number = -1;
    y: number = -1;


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

    get width(): number {
        return 275;
    }
    
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

    private _stackColor?: string;
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