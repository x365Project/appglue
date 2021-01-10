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
	${props => props.isDragging && `z-index: 1;`}
	${props => !props.isDragging && `transform: none !important;`}
`;

export const CandidateSequenceDropDiv = styled("div")<{
	isDroppingOver: boolean;
	isPathCandidate: boolean;
}>`
	border-radius: 5px;

	${props => props.isDroppingOver &&
		`border: dashed 1px ${FlowConstants.DROPPING_COLOR};`
	}

	${props => !props.isPathCandidate && `
		width: ${FlowConstants.DEFAULT_STACK_WIDTH}px;
		min-height: ${FlowConstants.DEFAULT_STACK_HEIGHT}px;
		${props.isDroppingOver
			? `background: ${FlowConstants.DROPPING_COLOR};`
			: `border: dashed 1px gray;`
		};
	`}

	${props => props.isPathCandidate && `
		width: ${FlowConstants.PATH_CANDIDATE_WIDTH}px;
		min-height: ${FlowConstants.PATH_CANDIDATE_HEIGHT}px;
		border: dashed 1px ${FlowConstants.PATH_DROPPING_COLOR};
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

	onDrag = (_e: DraggableEvent, data: DraggableData) => {
		let sequence = this.props.editContext.getTarget(data.x, data.y);
		if (sequence) {
			this.props.editContext.dragOverSequence = sequence;
		} else {
			this.props.editContext.dragOverSequence = null;
		}
	}

    onDragStop = (_e: DraggableEvent, data: DraggableData) => {
		let sequence = this.props.editContext.getTarget(data.x, data.y);
		if (sequence) {
			this.props.editContext.combineSequences(this.props.candidate, sequence);
		} else {
			this.props.editContext.dragOverSequence = null;
		}

		this.setState({
			isDragging: false
		});
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
									isPathCandidate={!!this.props.candidate.forStepId}
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