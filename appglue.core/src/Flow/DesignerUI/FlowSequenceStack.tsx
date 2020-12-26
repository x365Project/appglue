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
import MovementSvg from "../../assets/images/icons/movement_white.svg";
import {UpIcon} from "../../CommonUI/Icon/UpIcon";
import {DownIcon} from "../../CommonUI/Icon/DownIcon";
import {MoveIcon} from "../../CommonUI/Icon/MoveIcon";
import { Collapse, Typography } from "@material-ui/core";

const FlowSequenceDiv = styled('div')<{
	width:number;
	height?: number;
	x: number;
	y: number;
	isDragging: boolean;
	index: number;
	selected: boolean;
}>`
	top: ${props => props.isDragging ? 0 : props.y}px;
	left: ${props => props.isDragging ? 0 : props.x}px;
    background: #fff;
	position: absolute;
	border-radius: 5px;
	margin-bottom: 10px;
	min-width: ${props => props.width}px;
	height: ${props => props.height ? `${props.height}px` : 'auto'};
	border: 1px solid ${props => props.selected ? 'blue': 'darkgray'};

	${props => !props.isDragging && `
		transform: none !important;
	`}

	> * {
		cursor: initial;
	}

	> div.stack {
		position: relative;
		padding: 15px 10px 10px;

		${props => props.index > 0 && `
			&.stack-move {
				cursor: url(${MovementSvg}), auto;
			}
		`}

	}

	.button-group {
		display: flex;
		opacity: 0;
		position: absolute;
		right: 5px;
		top: -20px;

		transition: opacity .1s;
	
		> *:first-child {
			margin-right: 5px;
		}
	}

	&:hover .button-group {
		opacity: 1;

	}
`;

const FlowSequenceSummary = styled.div`
	display: flex;
	flex-direction: column;
`;

const TitleDiv = styled("div")<{content?:string;}>`
	margin-top: -32px;
	
	background: transparent;
	min-width: 100px;
	min-height: 37px;;
	margin-bottom: 15px; 
	margin-right: 65px;
	display: flex;

	.InlineEdit {
		min-width: 100px;
		max-width: 100%;
		height: 37px;
		overflow: hidden;
		border: solid 1px darkgray;
		background: #fff;
		border-top-right-radius: 4px;
		border-top-left-radius: 4px;
	}

	.InlineEdit-label {
		font-family: Mulish;
		font-style: normal;
		font-weight: 600;
		font-size: 15px;
		line-height: 25px;
		color: #677C95;
		padding: 6px;
		max-width: 100%;
		letter-spacing: .5px;
	}

	.InlineEdit-input {
		position: relative;
		display: inline-block;
		.MuiInputBase-input {
			padding: 6px;
			max-width: 100%;
			font-size: 15px;
			font-family: Mulish;
			font-style: normal;
			font-weight: 600;
			border: none;
			line-height: 25px;
			letter-spacing: .5px;
			position: absolute;
			top: 0;
			left: 0;
		}

		&::before {
			content: "${props => props.content || ''}";
			font-size: 15px;
			display: block;
			font-family: Mulish;
			font-style: normal;
			font-weight: 600;
			padding: 0 6px;
			letter-spacing: .5px;
			opacity: 0;
		}
	}

`;


const StyledIconButton = styled.div`
	display: flex;
	background: #fff;
	border-radius: 4px;
	padding: 5px;
	border: solid 1px darkgray;
	cursor: initial;

	img {
		width: 15px;
		height: 15px;
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


export class FlowSequenceStack extends React.Component<IFlowSequenceStack, {isDragging: boolean; isCollapsed: boolean;}> {
	
	width: number = 275;

	collapsedWidth: number = 120;
	collapsedHeight: number = 120;

	constructor(props: IFlowSequenceStack) {
		super(props);

		this.state = {
			isDragging: false,
			isCollapsed: false
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
		if (newValue.length <= 30) {
			this.props.sequence.name = newValue;
			StateManager.propertyChanged(this.props.sequence, 'name');
		}
	}

	setCollapsed = (isCollapsed: boolean) => {
		this.setState({
			isCollapsed: isCollapsed
		})
	}

	onToggleCollapsed = (_event: React.MouseEvent<HTMLDivElement>) => {
		this.setState({
			isCollapsed: !this.state.isCollapsed
		})
	}

	onTitleClick = (event: React.MouseEvent<HTMLElement>) => {
		event.stopPropagation();
		event.preventDefault();
	}

    render() {
        return (
            <ReactDraggable
				bounds="parent"
				disabled={this.props.index === 0}
                defaultPosition={{x: this.props.sequence.x, y: this.props.sequence.y}}
				onStop={this.onDragStop}
				onStart={this.onDragStart}
				handle={`.stack-move`}
				cancel=".inline-editor"
            >
                <FlowSequenceDiv
					width={this.state.isCollapsed ? this.collapsedWidth : this.width}
					height={this.state.isCollapsed? this.collapsedHeight: undefined}
					x={this.props.sequence.x}
					y={this.props.sequence.y}
					isDragging={this.state.isDragging}
					index={this.props.index}
					onClick={(_e: React.MouseEvent<HTMLDivElement>) => {
						this.props.editContext.setSelection(this.props.sequence);
					}}
					selected={this.props.editContext.selection === this.props.sequence._id}
				>
					<div className={`stack${this.state.isCollapsed ? ' stack-move': ''}`}>
						<ObserveState
							listenTo={this.props.sequence}
							control={
								() => <TitleDiv className="inline-editor" content={this.props.sequence.name}>
									<InlineTextEdit
										text={this.props.sequence.name || (this.props.index  === 0 ? 'primary' : '')}
										placeholder={this.props.index > 0 ? 'unnamed' : 'primary'}
										onEdit={this.onUpdateStackName}
									/>
								</TitleDiv>
							}
						/>
						
						<div className="button-group">
							<StyledIconButton onClick={this.onToggleCollapsed} data-testid="btn-stack-collapse">
								{
									this.state.isCollapsed ? <UpIcon /> : <DownIcon />
								}
							</StyledIconButton>
							{
								!this.state.isCollapsed && this.props.index !== 0 && <StyledIconButton className="stack-move">
									<MoveIcon />
								</StyledIconButton>
							}
						</div>
						<Droppable droppableId={this.props.sequence._id}>
							{(
								provided: DroppableProvided, snapshot: DroppableStateSnapshot) => {
									if (snapshot.isDraggingOver && this.state.isCollapsed) {
										this.setCollapsed(false);
									}
									return (
										<ObserveState
											listenTo={this.props.sequence}
											properties={["steps"]}
											control={() => (
												<>
													<Collapse in={this.state.isCollapsed}>
														<FlowSequenceSummary>
															<Typography align="center">
																Steps
															</Typography>
															<Typography align="center" variant="h4" data-testid="steps-count">
																{this.props.sequence.steps.length}
															</Typography>
														</FlowSequenceSummary>
													</Collapse>
													<Collapse in={!this.state.isCollapsed}>
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
																		index={i}
																	>
																		{
																			(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => {

																				return (

																					<div
																						onContextMenu={(e: React.MouseEvent<HTMLDivElement>) => {
																							e.preventDefault();
																							this.props.editContext.contextControl = {
																								selectedId: step._id,
																								mouseX: e.clientX,
																								mouseY: e.clientY
																							}
																						}}
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
													</Collapse>
												</>
											)}
										/>
										
									);
								}
							}
						</Droppable>
					</div>
                </FlowSequenceDiv>
            </ReactDraggable>
        );
    }

    renderAltPath(sequence: FlowStepSequence, step: BaseFlowStep, stepOutput: FlowStepOutput, editContext: FlowEditContext) {
        return (
            <div onClick={(_event: React.MouseEvent<HTMLDivElement>) => {
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
            <StepSurround selected={editContext.selection === step._id} invalid={false} onClick={(event: React.MouseEvent<HTMLDivElement>) => {
				event.stopPropagation();
                editContext.setSelection(step);
            }}>
                {step.render()}
            </StepSurround>
        );
    }
}

export class FakeFlowSequenceStack extends React.Component<{ flow: XFlowConfiguration, show: boolean }, {}> {

	getDefaultPosition = () => {
		let y = this.props.flow.sequences[0].y;
		let x = Math.max(
			...this.props.flow.sequences
				.filter((s) => {
					return s.y < y + 150;
				})
				.map((s) => s.x + (s.isCollapsed ? 150 : 300))
		);

		return {
			x, y
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