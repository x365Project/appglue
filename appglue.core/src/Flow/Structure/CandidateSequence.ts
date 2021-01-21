import {IFlowStepSequence} from "./IFlowStepSequence";
import {DataUtilities} from "../../Common/DataUtilities";
import {FlowStepSequence} from "./FlowStepSequence";
import {FlowConstants} from "../CommonUI/FlowConstants";
import {FlowStepOutputInstructions} from "./FlowStepOutputInstructions";

export interface ICandidateSequence extends IFlowStepSequence {
    createSequence() : FlowStepSequence
    shouldRender() : boolean;
}

export class CandidateSequence implements ICandidateSequence {
    readonly sequenceType = "pathcandidate" ;

    _id: string = DataUtilities.generateUniqueId();
    x: number;
    y: number;


    instruction: FlowStepOutputInstructions;


    constructor(instruction: FlowStepOutputInstructions) {
        this.instruction = instruction;
        this.x = instruction.candidateStackX ;
        this.y = instruction.candidateStackY ;

    }

    name?: string | undefined;

    getElementId(): string {
        return this._id;
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
        return this.instruction.candidateStackX!;
    }

    set desiredX(value: number) {
        this.instruction.candidateStackX = value;
    }

    get desiredY(): number {
        return this.instruction.candidateStackY!;
    }

    set desiredY(value: number) {
        this.instruction.candidateStackY = value;
    }

    reset(): void {
        this.x = this.desiredX;
        this.y = this.desiredY;
    }

    shouldRender(): boolean {
        return this.desiredY > 0;
    }

}

export class NonPathCandidateSequence implements ICandidateSequence {
    readonly sequenceType = "candidate" ;
    _id: string = DataUtilities.generateUniqueId();
    desiredX: number;
    desiredY: number;
    x: number;
    y: number;
    name?: string | undefined;


    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.desiredX = x;
        this.desiredY = y;
    }

    shouldRender(): boolean {
        return true;
    }

    getElementId(): string {
        return this._id;
    }

    renderEditUI(): JSX.Element | null {
        return null;
    }

    reset(): void {
    }

    createSequence() : FlowStepSequence {
        let s = new FlowStepSequence();
        s.desiredX = this.x;
        s.desiredY = this.y;
        s._id = this._id === FlowConstants.DEFAULT_CANDIDATE_SEQ_ID ? DataUtilities.generateUniqueId() : this._id;
        return s;
    }


}