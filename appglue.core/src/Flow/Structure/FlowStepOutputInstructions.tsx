
export class FlowStepOutputInstructions {
    strategy: FlowStepOutputInstructionType = FlowStepOutputInstructionType.BRANCH;
    branchToSequence?: string;
}

export enum FlowStepOutputInstructionType {
    END_FLOW = 'end flow',
    THROW_EXCEPTION = 'throw',
    CONTINUE = 'continue',
    BRANCH = 'branch'
}