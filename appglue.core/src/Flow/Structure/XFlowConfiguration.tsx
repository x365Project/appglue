import React from "react";
import {BaseFlowStep} from "../Steps/BaseFlowStep";
import {FlowStepSequence} from "./FlowStepSequence";
import {IFlowElement} from "./IFlowElement";
import {DataUtilities} from "../../Common/DataUtilities";

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

    find(stepId: string): BaseFlowStep | null {
        return null;
    }

    add(step: BaseFlowStep, sequenceId : string, index?: number): void {
        let sequence = this.getSequence(sequenceId);

        if (!sequence) {
            sequence = new FlowStepSequence();
            sequence._id = sequenceId;
            this.sequences.push(sequence);
        }
        if (!index){
            sequence.steps.push(step);
        }
        else {
            sequence.steps.splice(index, 0, step)
        }
    }

    moveInSequence(step: BaseFlowStep, sequence : string, index?: number): void {
    }

    moveToSequence(step: BaseFlowStep,fromSequence : string, toSequence : string, index?: number): void {
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






