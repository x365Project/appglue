import React from "react";
import { Draggable, Droppable, DroppableProvided, DroppableStateSnapshot, DraggableProvided, DraggableStateSnapshot } from "react-beautiful-dnd";


import {FlowConstants} from "../XFlowEditor";
import {IDraggingElementType} from "../CommonUI/IDraggingElementType";
import {FlowEditContext} from "../FlowEditContext";
import styled from "styled-components";

export const FakeFlowSequenceDropDiv = styled("div")<{
	position: {x: number, y: number};
	show: boolean;
	parent?: string;
	isDroppingOver: boolean;
}>`
	background: transparent;
	border-radius: 4px;
	position: ${props => props.parent ? 'relative': 'absolute'};
	
	opacity: ${props => props.show ? 1: 0};
	transition: opacity .1s;

	${props => !props.parent && `
		width: 275px;
		top: ${props.position.y}px;
		left: ${props.position.x}px;
		min-height: 152px;
		${!props.isDroppingOver && `border: dotted 2px darkgray`};	
	`}

	${props => props.isDroppingOver &&
		`border: dotted 2px ${FlowConstants.DROPPING_COLOR};`
	}

	${props => props.parent && `
		min-height: 35px;
		width: 150px;
	`}

`;

export const FakeFlowSequenceDragDiv = styled("div")<{showBoarder: boolean;}>`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	${props => props.showBoarder && `
		border: dotted 2px darkgray;
	`}
`;


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