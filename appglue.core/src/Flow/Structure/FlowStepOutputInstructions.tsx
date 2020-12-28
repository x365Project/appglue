import { DataUtilities } from "../../Common/DataUtilities";

export class FlowStepOutputInstructions {
    _id : string = DataUtilities.generateUniqueId();
    strategy: FlowStepOutputInstructionType = FlowStepOutputInstructionType.BRANCH;
    branchToSequence?: string;
    name?: string;

    constructor(name?: string) {
        this.name = name;
    }
}

export enum FlowStepOutputInstructionType {
    END_FLOW = 'end flow',
    THROW_EXCEPTION = 'throw',
    CONTINUE = 'continue',
    BRANCH = 'branch'
}