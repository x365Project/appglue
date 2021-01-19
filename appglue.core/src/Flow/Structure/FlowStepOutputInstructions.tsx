import {DataUtilities} from "../../Common/DataUtilities";
import {StateManager} from "../../CommonUI/StateManagement/StateManager";

export class FlowStepOutputInstructions {
    private _strategy: FlowStepOutputInstructionType = FlowStepOutputInstructionType.BRANCH;
    connectedSequenceId?: string;
    pathName: string;
    stepId: string;

    candidateStackX: number = 0;
    candidateStackY: number = 0;


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

}

export enum FlowStepOutputInstructionType {
    END_FLOW = 'end flow',
    THROW_EXCEPTION = 'throw',
    CONTINUE = 'continue',
    BRANCH = 'branch'
}