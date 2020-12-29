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
import { InlineTextEdit } from "../../CommonUI/InlineTextEdit";
import { StateManager } from "../../CommonUI/StateManagement/StateManager";
import { ObserveState } from "../../CommonUI/StateManagement/ObserveState";
import MovementSvg from "../../assets/images/icons/movement_white.svg";
import {UpIcon} from "../../CommonUI/Icon/UpIcon";
import {DownIcon} from "../../CommonUI/Icon/DownIcon";
import {MoveIcon} from "../../CommonUI/Icon/MoveIcon";
import { Collapse, Typography } from "@material-ui/core";
import { FlowStepOutputInstructions, FlowStepOutputInstructionType } from "../Structure/FlowStepOutputInstructions";
import { TextIcon } from "../../CommonUI/TextIcon";
import { StyledButtonGroup, IconButtonWithTitle } from "../../CommonUI/CommonStyles";
import {IDraggingElementType} from "../CommonUI/IDraggingElementType";

const FlowSequenceDiv = styled('div')<{
	width:number;
	height?: number;
	position: IPosition,
	isDragging: boolean;
	index: number;
	selected: boolean;
	isDroppingOver: boolean;
	color?: string;
}>`

	top: ${props => props.isDragging ? 0 : props.position.y}px;
	left: ${props => props.isDragging ? 0 : props.position.x}px;
	position: absolute;
    background: #fff;
	border-radius: 5px;
	margin-bottom: 10px;
	min-width: ${props => props.width}px;
	height: ${props => props.height ? `${props.height}px` : 'auto'};
	${props => props.isDroppingOver
		?`border: 1px dashed ${FlowConstants.DROPPING_COLOR};`
		:`border: 1px solid ${props.selected ? 'blue': (props.color || 'darkgray')};`
	}

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
	
		> *:last-child {
			margin-left: 5px;
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

const TitleDiv = styled("div")<{content?:string; color?: string;}>`
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
		border: solid 1px ${props => props.color || 'darkgray'};
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
		color: ${props => props.color || '#677C95'};
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

	&.stack-move {
		position: relative;

		&::after {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			content: "";
			height: 100%;
		}
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
	margin-bottom: 5px;
`;

const StepPathWrapper = styled.div`
	display: flex;
	flex-direction: row;
`;

const StepPathDiv = styled('div')<{width: number; color?: string;}>`
	border: 2px solid ${props => props.color || 'lightgray'};
	border-radius: 5px;
	color: ${props => props.color || 'lightgray'};
	padding-left: 7px;
	height: 35px;
	width: ${props => props.width}px;
	background: white;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding-right: 20px;
	transition: all .1s;

	.StepInstruction-buttonGroup {
		border: none;

		.MuiButtonBase-root {
			height: 25px;
			width: 25px;

			margin-left: 5px;
			&:first-child {
				margin-left: 0px;
			}

			&.TopbarIconButton-selected .MuiButton-label div {
				color: gray;
				border-color: gray;
			}
		}
	}
`;

const StepPathSequenceDiv = styled.div`
	width: 50px;
	display: flex;
	align-items: center;
	height: 35px;
`;

const LineDiv = styled("div")<{
	orientation?: 'vertical' | 'horizontal';
	direction?: 'top' | 'bottom' | 'right' | 'left';
}>`
	${props => (!props.orientation || props.orientation === 'horizontal') && `
		width: 100%;
		border: dashed 2px darkgray;
		height: 2px;
	`}
`;

const StepPathConnectDiv = styled.div`
	border-left: 2px solid black;
	margin-left: 25px;
	display: flex;
	min-height: 5px;
	width: 100%;
`;

export const FakeFlowSequenceDropDiv = styled("div")<{
	position: IPosition;
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

interface IPosition {
	x: number;
	y: number;
}

interface IFlowSequenceStack {
	flow: XFlowConfiguration;
	sequence: FlowStepSequence;
	editContext: FlowEditContext;
	parent?: string,
	index: number;
}


export class FlowSequenceStack extends React.Component<IFlowSequenceStack, {isDragging: boolean; isCollapsed: boolean; isDroppingOver: boolean;}> {
	
	width: number = 275;

	collapsedWidth: number = 120;
	collapsedHeight: number = 120;

	constructor(props: IFlowSequenceStack) {
		super(props);

		this.state = {
			isDragging: false,
			isCollapsed: false,
			isDroppingOver: false
		}
	}

	getDefaultPosition = () : IPosition => {
		return {
			x: this.props.sequence.x,
			y: this.props.sequence.y
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
				disabled={this.props.index === 0 || !!this.props.parent}
                defaultPosition={this.getDefaultPosition()}
				onStop={this.onDragStop}
				onStart={this.onDragStart}
				handle={`.stack-move`}
				cancel=".inline-editor"
            >
                <FlowSequenceDiv
					width={this.state.isCollapsed ? this.collapsedWidth : this.width}
					height={this.state.isCollapsed? this.collapsedHeight: undefined}
					position={this.getDefaultPosition()}
					isDragging={this.state.isDragging}
					index={this.props.index}
					onClick={(_e: React.MouseEvent<HTMLDivElement>) => {
						this.props.editContext.setSelection(this.props.sequence);
					}}
					selected={this.props.editContext.selection === this.props.sequence._id}
					onContextMenu={(e: React.MouseEvent<HTMLDivElement>) => {
						e.preventDefault();
						this.props.editContext.contextControl = {
							selectedId: this.props.sequence._id,
							mouseX: e.clientX,
							mouseY: e.clientY
						}
					}}
					isDroppingOver={this.state.isDroppingOver}
					color={this.props.sequence.stackColor}
				>
					<div className={`stack${this.state.isCollapsed ? ' stack-move': ''}`}>
						<Droppable droppableId={`${this.props.sequence._id}_header`}
							isDropDisabled={this.props.editContext.draggingElemType !== IDraggingElementType.Related && !this.state.isCollapsed}
						>
							{(provided: DroppableProvided, snapshot: DroppableStateSnapshot) => {

								if (snapshot.isDraggingOver && this.props.editContext.draggingElemType === IDraggingElementType.Related) {
									if (!this.state.isDroppingOver) {
										this.setState({
											isDroppingOver: true
										})
									}
								} else if (this.state.isDroppingOver) {
									this.setState({
										isDroppingOver: false
									})
								}

								if (this.props.editContext.draggingElemType !== IDraggingElementType.Related && this.state.isCollapsed) {
									if (snapshot.isDraggingOver) {
										this.setState({
											isCollapsed: false
										})
									}
								}
								
								return <div {...provided.droppableProps} ref={provided.innerRef}>
									<ObserveState
										listenTo={this.props.sequence}
										control={
											() => <TitleDiv className="inline-editor" content={this.props.sequence.name} color={this.props.sequence.stackColor}>
												<InlineTextEdit
													text={this.props.sequence.name || (this.props.index  === 0 ? 'primary' : '')}
													placeholder={this.props.index > 0 ? 'unnamed' : 'primary'}
													onEdit={this.onUpdateStackName}
												/>
											</TitleDiv>
										}
									/>

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
									{provided.placeholder}
								</div>
							}}
						</Droppable>
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
						<Droppable droppableId={this.props.sequence._id}
							isDropDisabled={this.props.editContext.draggingElemType !== IDraggingElementType.Step}
						>
							{
								(provided: DroppableProvided, snapshot: DroppableStateSnapshot) => {
									return (
										<ObserveState
											listenTo={this.props.sequence}
											properties={["steps"]}
											control={() => (
												<Collapse in={!this.state.isCollapsed} {...provided.droppableProps} ref={provided.innerRef} collapsedHeight={1}>
													<FlowSequenceContent>
														{this.props.sequence.steps.length === 0 && <>put steps here</> }
														{this.props.sequence.steps.map((step: BaseFlowStep, i: number) => {
															let isLast = this.props.sequence.steps.length === i + 1;

															let otherPaths: FlowStepOutputInstructions[] = [];
															if (step.outputs && step.outputs.length > 1) {
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
																						e.stopPropagation();
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
																									{otherPaths.map((stepOutput: FlowStepOutputInstructions) => {
																										return (
																											<React.Fragment key={'path'+stepOutput.pathName}>
																												{this.renderAltPath(this.props.sequence, step, stepOutput, this.props.editContext)}
																											</React.Fragment>
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

    renderAltPath(sequence: FlowStepSequence, step: BaseFlowStep, stepOutput: FlowStepOutputInstructions, editContext: FlowEditContext) {
		let childSequence:FlowStepSequence | null = null;
		if (stepOutput.connectedSequenceId && stepOutput.strategy === FlowStepOutputInstructionType.BRANCH) {
			childSequence = editContext.flow.find(stepOutput.connectedSequenceId) as FlowStepSequence;
		}

        return (
            <React.Fragment>
                <StepPathConnectDiv/>
				<StepPathWrapper>
					<ObserveState listenTo={childSequence}
						properties={["stackColor"]}
						control = {
							() => <StepPathDiv
								key={stepOutput.pathName}
								width={
									stepOutput.strategy === FlowStepOutputInstructionType.BRANCH 
									? sequence.width - 40
									: sequence.width - 73
								}
								color={stepOutput.strategy === FlowStepOutputInstructionType.BRANCH && !!childSequence ? childSequence.stackColor : undefined}
							>
								{stepOutput.pathName}
								<StyledButtonGroup
									variant="outlined"
									size="small"
									classes={{
										root: "StepInstruction-buttonGroup"
									}}
								>
									<IconButtonWithTitle
										title="Continue"
										icon={<TextIcon name="C" />}
										action={() => {
											stepOutput.strategy = FlowStepOutputInstructionType.CONTINUE;
										}}
										selected={stepOutput.strategy === FlowStepOutputInstructionType.CONTINUE}
									/>
									<IconButtonWithTitle
										title="Throw"
										icon={<TextIcon name="T" />}
										action={() => {
											stepOutput.strategy = FlowStepOutputInstructionType.THROW_EXCEPTION;
										}}
										selected={stepOutput.strategy === FlowStepOutputInstructionType.THROW_EXCEPTION}
									/>
									<IconButtonWithTitle
										title="End"
										icon={<TextIcon name="E" />}
										action={() => {
											stepOutput.strategy = FlowStepOutputInstructionType.END_FLOW;
										}}
										selected={stepOutput.strategy === FlowStepOutputInstructionType.END_FLOW}
									/>
									<IconButtonWithTitle
										title="Branch"
										icon={<TextIcon name="B" />}
										action={() => {
											stepOutput.strategy = FlowStepOutputInstructionType.BRANCH;
										}}
										selected={stepOutput.strategy === FlowStepOutputInstructionType.BRANCH}
									/>
								</StyledButtonGroup>
							</StepPathDiv>
						}
					/>
					{
						stepOutput.strategy === FlowStepOutputInstructionType.BRANCH
						&& !childSequence
						&& editContext.draggingElem !== step._id
						&& <>
							<StepPathSequenceDiv>
								<LineDiv />
							</StepPathSequenceDiv>
							<FakeFlowSequenceStack show parent={`${step._id}_${stepOutput.pathName}`} editContext={editContext} />
						</>
					}
				</StepPathWrapper>
            </React.Fragment>
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

interface IFakeFlowSequenceStack {
	editContext: FlowEditContext;
	show: boolean;
	parent?: string; 
}

export class FakeFlowSequenceStack extends React.Component<IFakeFlowSequenceStack, {}> {

	getDefaultPosition = (): IPosition => {
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