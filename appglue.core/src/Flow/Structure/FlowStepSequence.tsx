import {BaseFlowStep} from "../Steps/BaseFlowStep";
import React from "react";
import {IFlowElement} from "./IFlowElement";
import {DataUtilities} from "../../Common/DataUtilities";

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

    renderEditUI(): JSX.Element | null {
        return (
            <div>edit sequence</div>
        );
    }

}