import {BaseFlowStep} from "../Steps/BaseFlowStep";
import React from "react";
import {IFlowElement} from "./IFlowElement";
import {DataUtilities} from "../../Common/DataUtilities";
import { StateManager } from "../../CommonUI/StateManagement/StateManager";

export class FlowStepSequence implements IFlowElement {
    _id: string = DataUtilities.generateUniqueId();
    name?: string;

    x: number = -1;
    y: number = -1;

    steps: BaseFlowStep[] = [];

    get width(): number {
        // set some size defaults
        return 275;
    }

    get ports(): string[] {
        return [];
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
            <div>edit sequence</div>
        );
    }

}