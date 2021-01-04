import React from "react";
import { Droppable, DroppableProvided, DroppableStateSnapshot } from "react-beautiful-dnd";
import ReactDraggable from "react-draggable";


import {FlowConstants} from "../CommonUI/FlowConstants";
import {IDraggingElementType} from "../CommonUI/IDraggingElementType";
import {FlowEditContext} from "../FlowEditContext";
import styled from "styled-components";
import { IPosition } from "../CommonUI/IPosition";
import { CandidateSequence } from "../Structure/CandidateSequence";

export const FakeFlowSequenceDropDiv = styled("div")<{
	position: IPosition;
	show: boolean;
	isNew: boolean;
	isDroppingOver: boolean;
}>`
	background: transparent;
	border-radius: 4px;
	position: absolute;

	opacity: ${props => props.show ? 1: 0};
	transition: opacity .1s;
	top: ${props => props.position.y}px;
	left: ${props => props.position.x}px;

	${props => !props.isNew && `
		width: 275px;
		min-height: 152px;
		${!props.isDroppingOver && `border: dotted 2px darkgray`};	
	`}

	${props => props.isDroppingOver &&
		`border: dotted 2px ${FlowConstants.DROPPING_COLOR};`
	}

	${props => props.isNew && `
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
	candiate: CandidateSequence;
}


export class FakeFlowSequenceStack extends React.Component<IFakeFlowSequenceStack, {}> {

	getDefaultPosition = (): IPosition => {
		return {x: this.props.candiate.x, y: this.props.candiate.y};
	};

	render() {
		let droppableId = this.props.candiate ? this.props.candiate._id : `${FlowConstants.FakeStackId}`;

        return (
			<ReactDraggable bounds="parent">
				<Droppable droppableId={droppableId}>
					{
						(dropProvided: DroppableProvided, dropSnapshot: DroppableStateSnapshot) => {
							return <FakeFlowSequenceDropDiv
								position={this.getDefaultPosition()}
								show={!!this.props.candiate.forStepId || this.props.editContext.isDraggingControl}
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
			</ReactDraggable>
		)
	}
}