import React from "react";
import {Draggable, DraggableProvided, DraggableStateSnapshot} from "react-beautiful-dnd";
import {OverlapDiv} from "../../Form/Containers/XBaseStackContainer";
import {XFlowConfiguration} from "../Structure/XFlowConfiguration";
import {BaseFlowStep} from "../Steps/BaseFlowStep";
import {FlowStepSequence} from "../Structure/FlowStepSequence";

export class FlowStepDraggableData {
    id: string;
    index: number;
    step: BaseFlowStep;
    flow: XFlowConfiguration;
    sequence: FlowStepSequence;


    constructor(id: string, index: number, step: BaseFlowStep, flow: XFlowConfiguration, sequence: FlowStepSequence) {
        this.id = id;
        this.index = index;
        this.step = step;
        this.flow = flow;
        this.sequence = sequence;
    }
}


export class FlowStepDesignWrapper extends React.Component<FlowStepDraggableData> {

    wrapped: BaseFlowStep;
    innerComponentRef: HTMLDivElement | null = null;

    constructor(value: FlowStepDraggableData) {
        super(value);
        this.wrapped = value.step;

    }

    render() {
        return (
            <>
            <Draggable
                key={this.props.step._id}
                draggableId={this.props.id}
                index={this.props.index}>
                {
                    (provided: DraggableProvided, snapshot: DraggableStateSnapshot) => {
                        return (
                            <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                            >
                                <div
                                    ref={(ref) => this.innerComponentRef = ref}
                                    style={{position: 'relative'}}
                                >
                                    {this.props.step.render()}
                                </div>
                            </div>
                        );
                    }
                }
            </Draggable>
                </>
        );
    }
}
