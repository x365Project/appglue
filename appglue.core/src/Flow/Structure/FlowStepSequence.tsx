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

    private _x: number = -1;
    private _y: number = -1;
    private _desiredY: number = -1;
    private _desiredX: number = -1;
    width: number = FlowConstants.DEFAULT_STACK_WIDTH;
    private _height: number = FlowConstants.DEFAULT_STACK_HEIGHT;

    private _stackColor?: string;
    private _canDelete: boolean = true;
    private _isCollapsed: boolean = false;
    private _canCopy: boolean = true;
    private _steps: BaseFlowStep[] = [];

    getElementId(): string {
        return this._id;
    }


    get x(): number {
        return this._x;
    }

    set x(value: number) {
        this._x = value;
    }

    get y(): number {
        return this._y;
    }

    set y(value: number) {
        if (this._id === FlowConstants.PRIMARY_SEQUENCE && value !== FlowConstants.PRIMARY_SEQUENCE_POSITION.y)
            throw 'you cannot move the primary sequence'

        this._y = value;
    }

    get desiredY(): number {
        return this._desiredY;
    }

    set desiredY(value: number) {
        this._desiredY = value;
        this._y = value;
    }

    get desiredX(): number {
        return this._desiredX;
    }

    set desiredX(value: number) {
        this._desiredX = value;
        this._x = value;

    }

    get height(): number {
        return this._height;
    }

    set height(value: number) {
        //let oldVal = this._height;
        this._height = value;
    }

    reset() : void {
        this._x = this.desiredX;
        this._y = this.desiredY;
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

    removeStep(step: BaseFlowStep): void {
        let index = this._steps.indexOf(step);
        if (index >= 0) {
            step.sequence = undefined;
            this._steps.splice(index, 1);
        }

        this.flow?.context?.onStepRemoved(this, step);
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

        this.flow?.context?.onStepAdded(this, step);

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