import React from "react";
import {XFlowConfiguration} from "../Structure/XFlowConfiguration";
import {
    Draggable,
    DraggableProvided,
    DraggableStateSnapshot,
    Droppable,
    DroppableProvided,
    DroppableStateSnapshot
} from "react-beautiful-dnd";
import ReactDraggable, { DraggableData, DraggableEvent } from "react-draggable";
import styled from "styled-components";
import {FlowEditContext, FlowConstants} from "../XFlowEditor";
import {BaseFlowStep} from "../Steps/BaseFlowStep";
import {FlowStepSequence} from "../Structure/FlowStepSequence";
import {FlowStepOutput} from "../Structure/FlowStepOutput";
import { InlineTextEdit } from "../../CommonUI/InlineTextEdit";
import { StateManager } from "../../CommonUI/StateManagement/StateManager";
import { ObserveState } from "../../CommonUI/StateManagement/ObserveState";
import MovementIcon from "../../assets/images/icons/movement.svg";

const FlowSequenceDiv = styled('div')<{width:number; x: number; y: number; isDragging: boolean;}>`
	width: ${props => props.width}px;
	top: ${props => props.isDragging ? 0 : props.y}px;
	left: ${props => props.isDragging ? 0 : props.x}px;
    background: white;
    position: absolute;
    border: 1px solid darkgray;
    border-radius: 5px;
    padding: 10px;
	margin-bottom: 10px;
	${props => !props.isDragging && `
		transform: none !important;
	`}
`;


const FlowSequenceHeader = styled.div`
	display: flex;
	align-items: center;
	min-height: 20px;

	border-bottom: solid 1px darkgray;
	margin-bottom: 10px;
	position: relative;

	&:hover {
		cursor: url(${MovementIcon}), auto;
	}
`;

const TitleDiv = styled.div`
	position: absolute;
	right: -10px;
	top: -20px;
	border: dotted 2px darkgray;
	background: #fff;
	min-width: 100px;
	min-height: 20px;
	display: flex;

	.InlineEdit {
		min-width: 100px;
		min-height: 20px;
	}

	.InlineEdit-label {
		font-family: Mulish;
		font-style: normal;
		font-weight: 600;
		font-size: 14px;
		line-height: 20px;
		color: #677C95;
		text-align: right;
	}

	.InlineEdit-input .MuiInputBase-input {
		padding: 0;
		width: auto;
	}
`;

const FlowSequenceContent = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
    min-height: 100px;
`

const StepSurround = styled('div')<{selected: boolean, invalid: boolean}>`
	border: 2px solid ${props => props.selected ? 'blue': 'gray'};
	border-radius: 5px;
	display: flex;
`;

const StepConnectSection = styled.div`
	display: flex;
	flex-direction: row;
	float: left;
	min-height: 10px;
	min-width: 50px;
	max-width: 50px;
`;


const StepConnect = styled.div`
	border-left: 2px solid black;
	margin-left: 25px;
	display: flex;
	min-height: 8px;
	min-width: 25px;
	max-width: 25px;
`;

const StepConnectOtherPaths = styled.div`
	display: flex;
	flex-direction: column;
	float: top;
	margin-bottom: 5px;
`;

const StepPathDiv = styled('div')<{width: number}>`
	border: 2px solid lightgray;
	border-radius: 5px;
	padding-left: 7px;
	float: left;
	height: 25px;
	width: ${props => props.width}px;
	background: white;
`;

const StepPathConnectDiv = styled.div`
	border-left: 2px solid black;
	margin-left: 25px;
	display: flex;
	min-height: 5px;
	width: 100%;
`;

export const FakeFlowSequenceDiv = styled("div")<{
	x: number;
	y: number;
	show: boolean;
}>`
	width: 275px;
	background: transparent;
	border: dotted 2px darkgray;
	min-height: 152px;
	border-radius: 4px;
	position: absolute;
	top: ${props => props.y}px;
	left: ${props => props.x}px;
	opacity: ${props => props.show ? 1: 0};
	transition: opacity .1s;
`;

interface IFlowSequenceStack {
	flow: XFlowConfiguration;
	sequence: FlowStepSequence;
	editContext: FlowEditContext;
	index: number;
}


export class FlowSequenceStack extends React.Component<IFlowSequenceStack, {isDragging: boolean;}> {
	
	width: number = 275;
	
	constructor(props: IFlowSequenceStack) {
		super(props);

		this.state = {
			isDragging: false
		}
	}

    onDragStop = (_e: DraggableEvent, data: DraggableData) => {
        this.props.sequence.x = data.x;
		this.props.sequence.y = data.y;
		this.setState({
			isDragging: false
		})
	}

	onDragStart = (_e: DraggableEvent, _data: DraggableData) => {
		this.props.editContext.clearSelection();
		this.setState({
			isDragging: true
		})
	}
	
	onUpdateStackName = (newValue: string) => {
		this.props.sequence.name = newValue;
		StateManager.propertyChanged(this.props.sequence, 'name');
	}

    render() {
        return (
            <ReactDraggable
				bounds="parent"
				disabled={this.props.index === 0}
                defaultPosition={{x: this.props.sequence.x, y: this.props.sequence.y}}
				onStop={this.onDragStop}
				onStart={this.onDragStart}
				handle={`.stack-header`}
            >
                <FlowSequenceDiv width={this.width} x={this.props.sequence.x} y={this.props.sequence.y} isDragging={this.state.isDragging}>
					<FlowSequenceHeader className={`stack-header`}>
						<ObserveState
							listenTo={this.props.sequence}
							control={
								() => <TitleDiv>
									<InlineTextEdit
										text={this.props.sequence.name || ''}
										onEdit={this.onUpdateStackName}
									/>
								</TitleDiv>
							}
						/>
					</FlowSequenceHeader>
                    <Droppable
                        droppableId={this.props.sequence._id}>
                        {(
                            provided: DroppableProvided, snapshot: DroppableStateSnapshot) => {
								return (
									<ObserveState
										listenTo={this.props.sequence}
										properties={["steps"]}
										control={() => (
											<FlowSequenceContent
												{...provided.droppableProps}
												ref={provided.innerRef}
											>
												{this.props.sequence.steps.length === 0 && <>put steps here</> }
												{this.props.sequence.steps.map((step: BaseFlowStep, i: number) => {
													let isLast = this.props.sequence.steps.length === i + 1;

													let otherPaths: FlowStepOutput[] = [];
													if (step.outputs && Array.isArray(step.outputs) && step.outputs.length > 1) {
														otherPaths = [...step.outputs]
														// removes first item
														otherPaths.shift();

													} else if (step.outputs && Array.isArray(step.outputs) && isLast) {
														otherPaths = [...step.outputs]
													}

													return (
														<Draggable
															key={step._id}
															draggableId={step._id}
															index={i}>
															{
																(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => {

																	return (

																		<div
																			ref={provided.innerRef}
																			{...provided.draggableProps}
																			{...provided.dragHandleProps}
																		>
																			{this.renderStep(step, this.props.editContext)}
																			{(!isLast || otherPaths.length !== 0) && !snapshot.isDragging && (
																				<StepConnectSection>
																					<StepConnect/>
																					{otherPaths.length !== 0 && (
																						<StepConnectOtherPaths>
																							{otherPaths.map((stepOutput: FlowStepOutput, i: number) => {
																								return (
																									<div key={'path'+stepOutput.name}>
																										{this.renderAltPath(this.props.sequence, step, stepOutput, this.props.editContext)}
																									</div>
																								);
																							})}
																						</StepConnectOtherPaths>
																					)}
																				</StepConnectSection>
																			)}
																		</div>
																	);
																}
															}
														</Draggable>
													);
												})}
												{ provided.placeholder }
											</FlowSequenceContent>
										)}
									/>
									
								);
                        	}
						}
                    </Droppable>
                </FlowSequenceDiv>
            </ReactDraggable>
            

        );
    }

    renderAltPath(sequence: FlowStepSequence, step: BaseFlowStep, stepOutput: FlowStepOutput, editContext: FlowEditContext) {
        return (
            <div onClick={() => {
                    editContext.setSelection(step);
                }}>
                <StepPathConnectDiv/>
                <StepPathDiv key={stepOutput.name} width={sequence.width - 40}>
                    <>{stepOutput.name}</>
                </StepPathDiv>
            </div>
        );
    }

    private renderStep(step: BaseFlowStep, editContext: FlowEditContext) {
        return (
            <StepSurround selected={editContext.selection === step._id} invalid={false} onClick={() => {
                editContext.setSelection(step);
            }}>
                {step.render()}
            </StepSurround>
        );
    }
}

export class FakeFlowSequenceStack extends React.Component<{ flow: XFlowConfiguration, show: boolean }, {}> {

	getDefaultPosition = () => {
		return {
			y: this.props.flow.sequences[this.props.flow.sequences.length - 1].y,
			x: this.props.flow.sequences[this.props.flow.sequences.length - 1].x + 300
		};
	}

	render() {
        return (
			<Droppable droppableId={FlowConstants.FakeStackId} >
				{
					(provided: DroppableProvided, snapshot: DroppableStateSnapshot) => {
						return <FakeFlowSequenceDiv
							{...this.getDefaultPosition()}
							show={this.props.show}
							{...provided.droppableProps}
							ref={provided.innerRef}
						>
							{provided.placeholder}
						</FakeFlowSequenceDiv>
					}
				}
			</Droppable>
		)
	}
}