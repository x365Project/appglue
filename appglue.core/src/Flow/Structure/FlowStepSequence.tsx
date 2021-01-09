import {BaseFlowStep} from "../Steps/BaseFlowStep";
import React from "react";
import {DataUtilities} from "../../Common/DataUtilities";
import {StateManager} from "../../CommonUI/StateManagement/StateManager";
import {PropertyEditorColor} from "../../CommonUI/PropertyEditing/PropertyEditorColor";
import {ObserveState} from "../../CommonUI/StateManagement/ObserveState";
import {IFlowStepSequence} from "./IFlowStepSequence";
import {FlowConstants} from "../CommonUI/FlowConstants";
import {XFlowConfiguration} from "./XFlowConfiguration";

export class FlowStepSequence implements IFlowStepSequence {


    flow? : XFlowConfiguration;

    _id: string = DataUtilities.generateUniqueId();
    name?: string;

    x: number = -1;
    y: number = -1;
    private _desiredY: number = -1;
    private _desiredX: number = -1;
    width: number = FlowConstants.DEFAULT_STACK_WIDTH;
    height: number = FlowConstants.DEFAULT_STACK_HEIGHT;

    private _stackColor?: string;
    private _canDelete: boolean = true;
    private _isCollapsed: boolean = false;
    private _canCopy: boolean = true;
    private _steps: BaseFlowStep[] = [];

    get desiredY(): number {
        return this._desiredY;
    }

    set desiredY(value: number) {
        this._desiredY = value;
        this.y = value;
    }

    get desiredX(): number {
        return this._desiredX;
    }

    set desiredX(value: number) {
        this._desiredX = value;
        this.x = value;
    }

    reset() : void {
        this.x = this.desiredX;
        this.y = this.desiredY;
    }

    get steps(): readonly BaseFlowStep[] {
        return this._steps;
    }

    get canDelete(): boolean {
        return this._canDelete;
    }

    set canDelete(d: boolean) {
        this._canDelete = d;
    }

    get canCopy(): boolean {
        return this._canCopy;
    }

    set canCopy(c: boolean) {
        this._canCopy = c;
    }

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
        let index = this._steps.indexOf(step);
        if (index >= 0) {
            step.sequence = undefined;
            this._steps.splice(index, 1);
            StateManager.propertyChanged(this, 'steps');
        }
    }

    find(stepId: string): BaseFlowStep | null {
        for (let s of this._steps) {
            if (s._id === stepId) return s;
        }
        return null;
    }

    addStep(step: BaseFlowStep, index?: number) {
        if (index === undefined || index === null){
            this._steps.push(step);
        }
        else {
            this._steps.splice(index, 0, step)
        }

        step.sequence = this;

        StateManager.propertyChanged(this, "steps");

    }

    moveStep(step: BaseFlowStep, index: number) {
        let originIdx = this._steps.indexOf(step);
        if (originIdx < 0) return;
        this._steps.splice(originIdx, 1);
        if (index !== undefined && index !== null) {
            this._steps.splice(index, 0, step);
        } else {
            this._steps.push(step);
        }

        StateManager.propertyChanged(this, "steps");
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