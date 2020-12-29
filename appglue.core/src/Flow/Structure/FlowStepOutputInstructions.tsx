
export class FlowStepOutputInstructions {
    strategy: FlowStepOutputInstructionType = FlowStepOutputInstructionType.BRANCH;
    connectedSequenceId?: string;
    pathName?: string;

    constructor(name?: string) {
        this.pathName = name;
    }
}

export enum FlowStepOutputInstructionType {
    END_FLOW = 'end flow',
    THROW_EXCEPTION = 'throw',
    CONTINUE = 'continue',
    BRANCH = 'branch'
}