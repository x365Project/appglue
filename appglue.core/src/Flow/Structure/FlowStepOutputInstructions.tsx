import {DataUtilities} from "../../Common/DataUtilities";
import {StateManager} from "../../CommonUI/StateManagement/StateManager";
import {FlowStepSequence} from "./FlowStepSequence";

export class FlowStepOutputInstructions {
    private _strategy: FlowStepOutputInstructionType = FlowStepOutputInstructionType.BRANCH;
    connectedSequenceId?: string;
    pathName: string;
    stepId: string;

    candidateStackX: number = -1;
    candidateStackY: number = -1;

    // postionHistory: {x:number, y:number, from: string}[] = [];
    //
    // // not serialized
    // hasBeenRendered : boolean = false;


    constructor(pathName: string, stepId: string) {
        this.pathName = pathName;
        this.stepId = stepId;
        this.connectedSequenceId = DataUtilities.generateUniqueId();
    }

    get strategy(): FlowStepOutputInstructionType {
        return this._strategy;
    }

    set strategy(value: FlowStepOutputInstructionType) {
        this._strategy = value;

        if (value !== FlowStepOutputInstructionType.BRANCH)
            this.connectedSequenceId = DataUtilities.generateUniqueId();

        // todo: trigger refresh
        StateManager.changed(this);

    }

    getElementId(): string {
        return this.stepId + '-' + this.pathName;
    }

}

export enum FlowStepOutputInstructionType {
    END_FLOW = 'end flow',
    THROW_EXCEPTION = 'throw',
    CONTINUE = 'continue',
    BRANCH = 'branch'
}