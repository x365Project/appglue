import React from "react";
import {BaseFlowStep} from "../Steps/BaseFlowStep";
import {FlowStepSequence} from "./FlowStepSequence";
import {IFlowElement} from "./IFlowElement";
import {DataUtilities} from "../../Common/DataUtilities";
import { StateManager } from "../../CommonUI/StateManagement/StateManager";

export class XFlowConfiguration implements IFlowElement{
    _id: string = DataUtilities.generateUniqueId();
   sequences : FlowStepSequence[];
  // connections: FlowStepSequenceConnection[];

    constructor() {
        this.sequences = [];
        let initialSeq = new FlowStepSequence();
        initialSeq.x = 20;
        initialSeq.y = 20;

        this.sequences.push(initialSeq);
       // this.connections = [];
    }

    find(id: string): IFlowElement | null {
        for (let s of this.sequences) {
            if (s._id === id) return s;
            for (let step of s.steps) {
                if (step._id === id) return step;
            }
        }
        return null;
    }

    findSequenceByStepId(stepId: string) {
        for (let s of this.sequences) {
            if (s.find(stepId)) return s;
        }
        return null;
    }

    add(step: BaseFlowStep, sequenceId : string, index?: number): void {
        let sequence = this.getSequence(sequenceId);

        if (!sequence) {
            sequence = new FlowStepSequence();
            sequence._id = sequenceId;
            this.sequences.push(sequence);
        }
        if (index === undefined || index === null){
            sequence.steps.push(step);
        }
        else {
            sequence.steps.splice(index, 0, step)
        }

        StateManager.propertyChanged(sequence, "steps");
    }

    remove(step: BaseFlowStep, sequenceId?: string): void {
        if (sequenceId) {
            let sequence = this.getSequence(sequenceId);
            if (sequence) {
                sequence.remove(step as BaseFlowStep);
            }
        } else {
            for (let s of this.sequences) {
                s.remove(step as BaseFlowStep);
            }
        }
    }

    moveInSequence(step: BaseFlowStep, sequence : string, index?: number): void {
        let s = this.getSequence(sequence);
        if (!s) return;
        let originIdx = s.steps.indexOf(step);
        if (originIdx < 0) return;
        s.steps.splice(originIdx, 1);
        if (index !== undefined && index !== null) {
            s.steps.splice(index, 0, step);
        } else {
            s.steps.push(step);
        }

        StateManager.propertyChanged(s, "steps");
    }

    moveToSequence(step: BaseFlowStep, fromSequence : string, toSequence : string, index?: number): void {
        let fromS = this.getSequence(fromSequence);
        let toS = this.getSequence(toSequence);

        if (!fromS || !toS) return;
        fromS.remove(step);

        this.add(step, toSequence, index);
    }

    getSequence(id: string): FlowStepSequence | null {
        for (let s of this.sequences) {
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

}

// export class FlowStepSequenceConnection implements IFlowElement{
//     name?: string;
//     _id: string = generateUniqueId();
//
//     fromSequence: string;
//     fromSequencePort: string;
//     toSequence: string;
//
//
//     constructor(fromSequence: string, fromSequencePort: string, toSequence: string) {
//         this.fromSequence = fromSequence;
//         this.fromSequencePort = fromSequencePort;
//         this.toSequence = toSequence;
//     }
//
//     renderEditUI(): JSX.Element | null {
//         return (
//             <div>edit connectio</div>
//         );
//     }
//
// }






