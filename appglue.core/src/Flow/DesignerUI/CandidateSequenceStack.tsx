import React from "react";
import { Droppable, DroppableProvided, DroppableStateSnapshot } from "react-beautiful-dnd";
import ReactDraggable, { DraggableEvent, DraggableData } from "react-draggable";


import {FlowConstants} from "../CommonUI/FlowConstants";
import {FlowEditContext} from "../FlowEditContext";
import styled from "styled-components";
import { IPosition } from "../CommonUI/IPosition";
import { StateManager } from "../../CommonUI/StateManagement/StateManager";
import {CandidateSequence} from "../Structure/CandidateSequence";

export const FakeFlowSequenceDiv = styled("div")<{
	show: boolean;
}>`
	position: absolute;
	opacity: ${props => props.show ? 1: 0};
	display: ${props => props.show ? 'block': 'none'};
	background: transparent;
	border-radius: 4px;
`;

export const FakeFlowSequenceDropDiv = styled("div")<{
	isDroppingOver: boolean;
	isNew: boolean;
}>`
	border-radius: 5px;

	${props => props.isDroppingOver &&
		`border: dashed 1px ${FlowConstants.DROPPING_COLOR};`
	}
	
	${props => !props.isNew && `
		width: ${FlowConstants.DEFAULT_STACK_WIDTH}px;
		min-height: ${FlowConstants.DEFAULT_STACK_HEIGHT}px;
		${!props.isDroppingOver && `border: dashed 1px darkgray`};	
	`}

	${props => props.isNew && `
		width: ${FlowConstants.PATH_CANDIDATE_WIDTH}px;
		min-height: ${FlowConstants.PATH_CANDIDATE_HEIGHT}px;
		${!props.isDroppingOver && `border: dashed 1px darkgray`};
	`}

`;

export const FakeFlowSequenceDragDiv = styled("div")<{showBoarder: boolean;}>`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	border-radius: 5px;
	${props => props.showBoarder && `
		border: dashed 1px darkgray;
	`}
`;


interface IFakeFlowSequenceStack {
	editContext: FlowEditContext;
	candidate: CandidateSequence;
}


export class CandidateSequenceStack extends React.Component<IFakeFlowSequenceStack, {}> {

	getDefaultPosition = (): IPosition => {
		return {x: this.props.candidate.x, y: this.props.candidate.y};
	};

    onDragStop = (_e: DraggableEvent, data: DraggableData) => {
		this.props.candidate.x = data.x;
		this.props.candidate.y = data.y;
		StateManager.changed(this.props.candidate);
		this.props.editContext.clearSelection();
	}

	onDragStart = (_e: DraggableEvent, _data: DraggableData) => {
		this.props.editContext.clearCanvas();
	}

	onDrag = (_e: DraggableEvent, data: DraggableData) => {
		this.props.candidate.x = data.x;
		this.props.candidate.y = data.y;
		// StateManager.changed(this.props.candiate);
	}

	render() {
		let droppableId = this.props.candidate._id;

		console.log('it should render here ...' + this.getDefaultPosition());

        return (
			<ReactDraggable
				bounds="parent"
				disabled={!this.props.candidate.forStepId}
				onStop={this.onDragStop}
				onStart={this.onDragStart}
				onDrag={this.onDrag}
				defaultPosition={this.getDefaultPosition()}
				position={this.getDefaultPosition()}
			>
				<FakeFlowSequenceDiv
					show={!!this.props.candidate.forStepId || this.props.editContext.isDraggingControl}
				>
					<Droppable droppableId={droppableId}>
						{
							(dropProvided: DroppableProvided, dropSnapshot: DroppableStateSnapshot) => {
								return <FakeFlowSequenceDropDiv
									isNew={!!this.props.candidate.forStepId}
									isDroppingOver={dropSnapshot.isDraggingOver}
									{...dropProvided.droppableProps}
									ref={dropProvided.innerRef}
								>
									{
										dropProvided.placeholder
									}
								</FakeFlowSequenceDropDiv>
							}
						}
					</Droppable>
				</FakeFlowSequenceDiv>
			</ReactDraggable>
		)
	}
}