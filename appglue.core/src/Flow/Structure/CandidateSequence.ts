import {IFlowStepSequence} from "./IFlowStepSequence";
import {DataUtilities} from "../../Common/DataUtilities";
import {FlowStepSequence} from "./FlowStepSequence";
import {FlowConstants} from "../CommonUI/FlowConstants";
import {FlowStepOutputInstructions} from "./FlowStepOutputInstructions";


export class CandidateSequence implements IFlowStepSequence {
    _id: string = DataUtilities.generateUniqueId();
    x: number;
    y: number;


    instruction: FlowStepOutputInstructions;


    constructor(instruction: FlowStepOutputInstructions) {
        this.instruction = instruction;
        this.x = instruction.x ?? 0;
        this.y = instruction.y ?? 0;
    }


    renderEditUI(): JSX.Element | null {
        return null;
    }

    createSequence() : FlowStepSequence {
        let s = new FlowStepSequence();
        s.desiredX = this.x;
        s.desiredY = this.y;
        s._id = this._id === FlowConstants.DEFAULT_CANDIDATE_SEQ_ID ? DataUtilities.generateUniqueId() : this._id;
        return s;
    }

    get desiredX(): number {
        return this.instruction.x!;
    }

    set desiredX(value: number) {
        this.instruction.x = value;
    }

    get desiredY(): number {
        return this.instruction.y!;
    }

    set desiredY(value: number) {
        this.instruction.y = value;
    }

    reset(): void {
    }

}

export class NonPathCandidateSequence implements IFlowStepSequence {
    _id: string = DataUtilities.generateUniqueId();
    desiredX: number;
    desiredY: number;
    x: number;
    y: number;


    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.desiredX = x;
        this.desiredY = y;
    }

    renderEditUI(): JSX.Element | null {
        return null;
    }

    reset(): void {
    }

}