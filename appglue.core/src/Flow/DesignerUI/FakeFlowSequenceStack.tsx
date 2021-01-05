import React from "react";
import { Droppable, DroppableProvided, DroppableStateSnapshot } from "react-beautiful-dnd";
import ReactDraggable, { DraggableEvent, DraggableData } from "react-draggable";


import {FlowConstants} from "../CommonUI/FlowConstants";
import {FlowEditContext} from "../FlowEditContext";
import styled from "styled-components";
import { IPosition } from "../CommonUI/IPosition";
import { CandidateSequence } from "../Structure/CandidateSequence";
import { StateManager } from "../../CommonUI/StateManagement/StateManager";

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
		width: 275px;
		min-height: 152px;
		${!props.isDroppingOver && `border: dashed 1px darkgray`};	
	`}

	${props => props.isNew && `
		min-height: 35px;
		width: 150px;
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
	candiate: CandidateSequence;
}


export class FakeFlowSequenceStack extends React.Component<IFakeFlowSequenceStack, {}> {

	getDefaultPosition = (): IPosition => {
		return {x: this.props.candiate.x, y: this.props.candiate.y};
	};

    onDragStop = (_e: DraggableEvent, data: DraggableData) => {
		this.props.candiate.x = data.x;
		this.props.candiate.y = data.y;
		this.props.editContext.clearSelection();
	}

	onDragStart = (_e: DraggableEvent, _data: DraggableData) => {
		this.props.editContext.clearCanvas();
	}

	onDrag = (_e: DraggableEvent, data: DraggableData) => {
		this.props.candiate.x = data.x;
		this.props.candiate.y = data.y;
		StateManager.changed(this.props.candiate);
	}

	render() {
		let droppableId = this.props.candiate ? this.props.candiate._id : `${FlowConstants.FakeStackId}`;

        return (
			<ReactDraggable
				bounds="parent"
				disabled={!this.props.candiate.forStepId}
				onStop={this.onDragStop}
				onStart={this.onDragStart}
				onDrag={this.onDrag}
				defaultPosition={this.getDefaultPosition()}
			>
				<FakeFlowSequenceDiv
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