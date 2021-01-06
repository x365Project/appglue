import React from "react";
import {BaseFlowStep} from "../Steps/BaseFlowStep";
import {FlowStepSequence} from "./FlowStepSequence";
import {IFlowElement} from "./IFlowElement";
import {DataUtilities} from "../../Common/DataUtilities";
import { StateManager } from "../../CommonUI/StateManagement/StateManager";

export class XFlowConfiguration implements IFlowElement{
    _id: string = DataUtilities.generateUniqueId();
   private _sequences : FlowStepSequence[];

    constructor() {
        this._sequences = [];
        let initialSeq = new FlowStepSequence();
        initialSeq.x = 20;
        initialSeq.y = 20;

        this._sequences.push(initialSeq);
       // this.connections = [];
    }

    get sequences(): readonly FlowStepSequence[] {
        return this._sequences;
    }

    find(id: string): IFlowElement | null {
        for (let s of this._sequences) {
            if (s._id === id) return s;
            for (let step of s.steps) {
                if (step._id === id) return step;
            }
        }
        return null;
    }

    findSequenceByStepId(stepId: string) {
        for (let s of this._sequences) {
            if (s.find(stepId)) return s;
        }
        return null;
    }

    add(step: BaseFlowStep, sequenceId : string, index?: number): void {
        let sequence = this.getSequence(sequenceId);

        if (!sequence) {
            sequence = new FlowStepSequence();
            sequence._id = sequenceId;
            this.addSequence(sequence);
        }

        sequence.addStep(step, index);

    }

    remove(step: BaseFlowStep, sequenceId?: string): void {
        if (sequenceId) {
            let sequence = this.getSequence(sequenceId);
            if (sequence) {
                sequence.remove(step as BaseFlowStep);
            }
        } else {
            for (let s of this._sequences) {
                s.remove(step as BaseFlowStep);
            }
        }
    }

    moveInSequence(step: BaseFlowStep, sequence : string, index: number): void {
        let s = this.getSequence(sequence);

        if (s) {
            s.moveStep(step, index);
        }


    }

    moveToSequence(step: BaseFlowStep, fromSequence : string, toSequence : string, index?: number): void {
        let fromS = this.getSequence(fromSequence);
        let toS = this.getSequence(toSequence);

        if (!fromS || !toS) return;
        fromS.remove(step);

        this.add(step, toSequence, index);
    }

    getSequence(id: string): FlowStepSequence | null {
        for (let s of this._sequences) {
            if (s._id === id)
                return s;
        }
        return null;
    }

    renderEditUI(): JSX.Element | null {
        return (
            <div>edit flow</div>
        );
    }

    addSequence(newSeq: FlowStepSequence) {
        this._sequences.push(newSeq)

        console.log('adding sequence' + newSeq.x + console.trace());
        // add listener
    }

    deleteSequenceByIndex(idx: number) {
        this._sequences.splice(idx, 1)
    }
}




