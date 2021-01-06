import {IFlowStepSequence} from "./IFlowStepSequence";
import {DataUtilities} from "../../Common/DataUtilities";
import {FlowStepSequence} from "./FlowStepSequence";
import {FlowConstants} from "../CommonUI/FlowConstants";


export class CandidateSequence implements IFlowStepSequence {
    _id: string = DataUtilities.generateUniqueId();
    desiredX: number;
    desiredY: number;
    x: number;
    y: number;

    forStepId?: string;
    forPath?: string;


    constructor(desiredX: number, desiredY: number, forStepId?: string, forPath?: string) {
        this.desiredX = desiredX;
        this.desiredY = desiredY;

        this.x = desiredX;
        this.y = desiredY;
        this.forPath = forPath;
        this.forStepId = forStepId;
    }

    name?: string | undefined;


    renderEditUI(): JSX.Element | null {
        return null;
    }

    createSequence() : FlowStepSequence {
        let s = new FlowStepSequence();
        s.x = this.x;
        s.y = this.y;
        s._id = this._id === FlowConstants.DEFAULT_CANDIDATE_SEQ_ID ? DataUtilities.generateUniqueId() : this._id;
        return s;
    }
}