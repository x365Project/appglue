import {IEditable} from "../../CommonUI/IEditable";

export interface IFlowElement extends IEditable {
    name?: string;
    _id: string;
}