import React from "react";
import { Draggable, Droppable, DroppableProvided, DroppableStateSnapshot, DraggableProvided, DraggableStateSnapshot } from "react-beautiful-dnd";


import {FlowEditContext, FlowConstants} from "../XFlowEditor";
import {IDraggingElementType} from "../CommonUI/IDraggingElementType";
import { FakeFlowSequenceDropDiv, FakeFlowSequenceDragDiv } from "./FlowSequenceStack";

interface IFakeFlowSequenceStack {
	editContext: FlowEditContext;
	show: boolean;
	parent?: string; 
}



export class FakeFlowSequenceStack extends React.Component<IFakeFlowSequenceStack, {}> {

	getDefaultPosition = (): {x: number; y: number} => {
		return this.props.editContext.newStackPosition;
	};

	render() {
		let droppableId = `${FlowConstants.FakeStackId}${this.props.parent ? '_' + this.props.parent : ''}`;
		let draggableId = `${FlowConstants.FakeStackId}${this.props.parent ? '_' + this.props.parent : ''}_related`;

        return (
			<Droppable droppableId={droppableId}
				isDropDisabled={this.props.editContext.draggingElemType !== IDraggingElementType.Step}
			>
				{
					(dropProvided: DroppableProvided, dropSnapshot: DroppableStateSnapshot) => {
						return <FakeFlowSequenceDropDiv
							position={this.getDefaultPosition()}
							show={this.props.show}
							parent={this.props.parent}
							isDroppingOver={dropSnapshot.isDraggingOver}
							{...dropProvided.droppableProps}
							ref={dropProvided.innerRef}
						>
							{
								this.props.parent && <Draggable
									draggableId={draggableId}
									index={0}
								>
									{
										(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => {
											return <FakeFlowSequenceDragDiv
												showBoarder={snapshot.isDragging || !dropSnapshot.isDraggingOver}
												ref={provided.innerRef}
												{...provided.draggableProps}
												{...provided.dragHandleProps}
											>
											</FakeFlowSequenceDragDiv>
										}
									}
								</Draggable>
							}
							{

								!this.props.parent && dropProvided.placeholder
							}

						</FakeFlowSequenceDropDiv>
					}
				}
			</Droppable>
		)
	}
}