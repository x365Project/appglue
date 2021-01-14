import {DataUtilities} from "../../Common/DataUtilities";

export class FlowStepOutputInstructions {
    private _strategy: FlowStepOutputInstructionType = FlowStepOutputInstructionType.BRANCH;
    connectedSequenceId?: string;
    pathName?: string;

    constructor(name?: string) {
        this.pathName = name;
    }

    get strategy(): FlowStepOutputInstructionType {
        return this._strategy;
    }

    set strategy(value: FlowStepOutputInstructionType) {
        this._strategy = value;

        if (value !== FlowStepOutputInstructionType.BRANCH)
            this.connectedSequenceId = DataUtilities.generateUniqueId();
    }

}

export enum FlowStepOutputInstructionType {
    END_FLOW = 'end flow',
    THROW_EXCEPTION = 'throw',
    CONTINUE = 'continue',
    BRANCH = 'branch'
}