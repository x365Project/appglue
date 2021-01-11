import {IFlowStepSequence} from "./IFlowStepSequence";
import {DataUtilities} from "../../Common/DataUtilities";
import {FlowStepSequence} from "./FlowStepSequence";
import {FlowConstants} from "../CommonUI/FlowConstants";


export class CandidateSequence implements IFlowStepSequence {
    _id: string = DataUtilities.generateUniqueId();
    x: number;
    y: number;

    desiredX: number;
    desiredY: number;

    forStepId?: string;
    forPath?: string;


    constructor(x: number, y: number, forStepId?: string, forPath?: string) {
        this.x = x;
        this.y = y;
        this.desiredX = x;
        this.desiredY = y;
        this.forPath = forPath;
        this.forStepId = forStepId;
    }

    reset() : void {
        this.x = this.desiredX;
        this.y = this.desiredY;
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
}