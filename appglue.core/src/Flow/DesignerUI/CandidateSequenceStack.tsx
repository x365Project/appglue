import React from "react";
import { Droppable, DroppableProvided, DroppableStateSnapshot } from "react-beautiful-dnd";
import ReactDraggable, { DraggableEvent, DraggableData } from "react-draggable";


import {FlowConstants} from "../CommonUI/FlowConstants";
import {FlowEditContext} from "../FlowEditContext";
import styled from "styled-components";
import { IPosition } from "../CommonUI/IPosition";
import {CandidateSequence} from "../Structure/CandidateSequence";
import { StateManager } from "../../CommonUI/StateManagement/StateManager";

export const CandidateSequenceDiv = styled("div")<{
	show: boolean;
	isDragging: boolean;
	position: IPosition;
}>`
	position: absolute;
	top: ${props => props.isDragging ? 0 : props.position.y}px;
	left: ${props => props.isDragging ? 0 : props.position.x}px;
	opacity: ${props => props.show ? 1: 0};
	background: transparent;
	border-radius: 4px;
	${props => !props.isDragging && `transform: none !important;`}
`;

export const CandidateSequenceDropDiv = styled("div")<{
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

export const CandidateSequenceDragDiv = styled("div")<{showBoarder: boolean;}>`
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


interface ICandidateSequenceStack {
	editContext: FlowEditContext;
	candidate: CandidateSequence;
}


export class CandidateSequenceStack extends React.Component<ICandidateSequenceStack, {isDragging: boolean;}> {


	constructor(props: ICandidateSequenceStack) {
		super(props);

		this.state = {
			isDragging: false
		}
	}


	getDefaultPosition = (): IPosition => {
		return {x: this.props.candidate.x, y: this.props.candidate.y};
	};

	onDragStart = (_e: DraggableEvent, _data: DraggableData) => {
		this.props.editContext.clearSelection();
		this.setState({
			isDragging: true
		})
	}

    onDragStop = (_e: DraggableEvent, data: DraggableData) => {
		this.props.candidate.x = data.x;
		this.props.candidate.y = data.y;
		this.props.candidate.wasDragged = true;

		StateManager.changed(this.props.candidate);
		this.setState({
			isDragging: false
		});
	}

	onDrag = (_e: DraggableEvent, data: DraggableData) => {
		this.props.candidate.x = data.x;
		this.props.candidate.y = data.y;

		StateManager.changed(this.props.candidate);
	}

	render() {
		let droppableId = this.props.candidate._id;

		return (
			<ReactDraggable
				bounds="parent"
				disabled={!this.props.candidate.forStepId}
				onStop={this.onDragStop}
				onDrag={this.onDrag}
				onStart={this.onDragStart}
				position={this.getDefaultPosition()}
				defaultPosition={this.getDefaultPosition()}
			>
				<CandidateSequenceDiv
					id={this.props.candidate._id}
					position={this.getDefaultPosition()}
					isDragging={this.state.isDragging}
					show={!!this.props.candidate.forStepId || this.props.editContext.isDraggingControl}
				>
					<Droppable droppableId={droppableId}>
						{
							(dropProvided: DroppableProvided, dropSnapshot: DroppableStateSnapshot) => {
								return <CandidateSequenceDropDiv
									isNew={!!this.props.candidate.forStepId}
									isDroppingOver={dropSnapshot.isDraggingOver}
									{...dropProvided.droppableProps}
									ref={dropProvided.innerRef}
								>
									{
										dropProvided.placeholder
									}
								</CandidateSequenceDropDiv>
							}
						}
					</Droppable>
				</CandidateSequenceDiv>
			</ReactDraggable>
			
		)
	}
}