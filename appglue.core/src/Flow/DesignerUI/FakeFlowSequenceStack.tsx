import React from "react";
import { Droppable, DroppableProvided, DroppableStateSnapshot } from "react-beautiful-dnd";
import ReactDraggable, { DraggableEvent, DraggableData } from "react-draggable";


import {FlowConstants} from "../CommonUI/FlowConstants";
import {FlowEditContext} from "../FlowEditContext";
import styled from "styled-components";
import { IPosition } from "../CommonUI/IPosition";
import { CandidateSequence } from "../Structure/CandidateSequence";

export const FakeFlowSequenceDiv = styled("div")<{
	show: boolean;
	isDragging: boolean;
	position: IPosition;
}>`
	position: absolute;
	top: ${props => props.isDragging ? 0 : props.position.y}px;
	left: ${props => props.isDragging ? 0 : props.position.x}px;
	opacity: ${props => props.show ? 1: 0};
	display: ${props => props.show ? 'block': 'none'};
	background: transparent;
	border-radius: 4px;
	${props => !props.isDragging && `transform: none !important;`}
`;

export const FakeFlowSequenceDropDiv = styled("div")<{
	isDroppingOver: boolean;
	isNew: boolean;
}>`
	${props => props.isDroppingOver &&
		`border: dotted 2px ${FlowConstants.DROPPING_COLOR};`
	}

	${props => !props.isNew && `
		width: ${FlowConstants.DEFAULT_STACK_WIDTH}px;
		min-height: ${FlowConstants.DEFAULT_STACK_HEIGHT}px;
		${!props.isDroppingOver && `border: dotted 2px darkgray`};	
	`}

	${props => props.isNew && `
		width: ${FlowConstants.PATH_CANDIDATE_WIDTH}px;
		min-height: ${FlowConstants.PATH_CANDIDATE_HEIGHT}px;
		${!props.isDroppingOver && `border: dotted 2px darkgray`};
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
	candiate: CandidateSequence;
}


export class FakeFlowSequenceStack extends React.Component<IFakeFlowSequenceStack, {isDragging: boolean;}> {


	constructor(props: IFakeFlowSequenceStack) {
		super(props);

		this.state = {
			isDragging: false
		}
	}


	getDefaultPosition = (): IPosition => {
		return {x: this.props.candiate.x, y: this.props.candiate.y};
	};

	onDragStart = (_e: DraggableEvent, _data: DraggableData) => {
		this.props.editContext.clearSelection();
		this.setState({
			isDragging: true
		})
	}

    onDragStop = (_e: DraggableEvent, data: DraggableData) => {
		this.props.candiate.x = data.x;
		this.props.candiate.y = data.y;
		this.props.editContext.updateLineByCandidate(this.props.candiate);
		this.setState({
			isDragging: false
		});
	}

	onDrag = (_e: DraggableEvent, data: DraggableData) => {
		this.props.candiate.x = data.x;
		this.props.candiate.y = data.y;
		this.props.editContext.updateLineByCandidate(this.props.candiate);
	}

	render() {
		let droppableId = this.props.candiate ? this.props.candiate._id : `${FlowConstants.FakeStackId}`;

        return (
			<ReactDraggable
				bounds="parent"
				disabled={!this.props.candiate.forStepId}
				onStop={this.onDragStop}
				onDrag={this.onDrag}
				onStart={this.onDragStart}
				defaultPosition={this.getDefaultPosition()}
			>
				<FakeFlowSequenceDiv
					position={this.getDefaultPosition()}
					isDragging={this.state.isDragging}
					show={!!this.props.candiate.forStepId || this.props.editContext.isDraggingControl}
				>
					<Droppable droppableId={droppableId}>
						{
							(dropProvided: DroppableProvided, dropSnapshot: DroppableStateSnapshot) => {
								return <FakeFlowSequenceDropDiv
									isNew={!!this.props.candiate.forStepId}
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