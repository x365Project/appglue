import React from "react";
import {XFlowConfiguration} from "../Structure/XFlowConfiguration";
import {
    Droppable,
    DroppableProvided,
    DroppableStateSnapshot
} from "react-beautiful-dnd";
import ReactDraggable, { DraggableData, DraggableEvent } from "react-draggable";
import styled from "styled-components";
import {FlowConstants} from "../CommonUI/FlowConstants";
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
import {FlowSequenceStackStepHost} from "./FlowSequenceStackStepHost";
import { IPosition } from "../CommonUI/IPosition";

import {FlowEditContext} from "../FlowEditContext";

const FlowSequenceDiv = styled('div')<{
	width:number;
	height?: number;
	position: IPosition,
	isDragging: boolean;
	index: number;
	selected: boolean;
	isDroppingOver: boolean;
	color?: string;
	isOver: boolean;
}>`
	top: ${props => props.isDragging ? 0 : props.position.y}px;
	left: ${props => props.isDragging ? 0 : props.position.x}px;
	position: absolute;
    background: ${props => props.isOver ? FlowConstants.OVER_SEQUENCE_COLOR : '#fff'};
	border-radius: 5px;
	margin-bottom: 10px;
	min-width: ${props => props.width}px;
	height: ${props => props.height ? `${props.height}px` : 'auto'};
	${props => props.isDroppingOver
		?`border: 1px dashed ${FlowConstants.DROPPING_COLOR};`
		:`border: 1px solid ${props.selected ? 'blue': (props.color || 'darkgray')};`
	}

	${props => props.isDragging && `z-index: 1;`}

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

interface IFlowSequenceStack {
	flow: XFlowConfiguration;
	sequence: FlowStepSequence;
	editContext: FlowEditContext;
	parent?: string,
	index: number;
}


export class FlowSequenceStack extends React.Component<IFlowSequenceStack, {isDragging: boolean; isCollapsed: boolean; isDroppingOver: boolean;}> {
	
	width: number = FlowConstants.DEFAULT_STACK_WIDTH;

	collapsedWidth: number = FlowConstants.DEFAULT_COLLAPSED_STACK_WIDTH;
	collapsedHeight: number = FlowConstants.DEFAULT_COLLAPSED_STACK_HEIGHT;

	containerRef: React.RefObject<HTMLDivElement> = React.createRef<HTMLDivElement>();

	constructor(props: IFlowSequenceStack) {
		super(props);

		this.state = {
			isDragging: false,
			isCollapsed: props.sequence.isCollapsed,
			isDroppingOver: false
		}
	}

	componentDidMount() {
		this.getSize();
	}

	getSize() {
		if (this.props.sequence.width !== this.containerRef!.current!.scrollWidth || this.props.sequence.height !== this.containerRef!.current!.scrollHeight) {
			this.props.sequence.width = this.containerRef!.current!.scrollWidth;
			this.props.sequence.height = this.containerRef!.current!.scrollHeight;
			this.props.editContext.positionCandidateSequences();
		}
	}

	componentDidUpdate(_prevProps: IFlowSequenceStack, prevState: {isDragging: boolean; isCollapsed: boolean; isDroppingOver: boolean;}) {
		if (this.state.isCollapsed !== prevState.isCollapsed) {

			if (!this.state.isCollapsed) {
				// I think we need to update this logic. For now, waiting for collapse completed
				setTimeout(() => {
					this.props.sequence.isCollapsed = this.state.isCollapsed;
					this.props.editContext.positionCandidateSequences();
				}, FlowConstants.COLLAPSE_TIMEOUT);

			} else {
				this.props.sequence.isCollapsed = this.state.isCollapsed;
			}
		}
		this.getSize();
	}

	getDefaultPosition = () : IPosition => {
		return {
			x: this.props.sequence.x,
			y: this.props.sequence.y
		}
	} 

    onDragStop = (_e: DraggableEvent, data: DraggableData) => {

		let sequence = this.props.editContext.getTarget(data.x, data.y);
		if (sequence) {
			this.props.editContext.dragOverSequence = sequence;
			this.props.editContext.combineSequences(this.props.sequence, sequence);
		} else {
			this.props.editContext.dragOverSequence = null;
		}

		this.props.sequence.desiredX = data.x;
		this.props.sequence.desiredY = data.y;
		this.props.editContext.positionCandidateSequences();

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
	
	onDrag = (_e: DraggableEvent, data: DraggableData) => {
		this.props.sequence.desiredX = data.x;
		this.props.sequence.desiredY = data.y;

		let sequence = this.props.editContext.getTarget(data.x, data.y);
		if (sequence) {
			this.props.editContext.dragOverSequence = sequence;
		} else {
			this.props.editContext.dragOverSequence = null;
		}
		StateManager.changed(this.props.sequence);
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
		this.setCollapsed(!this.state.isCollapsed);
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
				defaultPosition={this.getDefaultPosition()}
				position={this.getDefaultPosition()}
				onStop={this.onDragStop}
				onStart={this.onDragStart}
				onDrag={this.onDrag}
				handle={`.stack-move`}
				cancel=".inline-editor"
            >
                <FlowSequenceDiv
					id={this.props.sequence._id}
					width={this.state.isCollapsed ? this.collapsedWidth : this.width}
					height={this.state.isCollapsed? this.collapsedHeight: undefined}
					position={this.getDefaultPosition()}
					isOver={this.props.editContext.dragOverSequenceId === this.props.sequence._id}
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
					ref={this.containerRef}
				>
					<div className={`stack${this.state.isCollapsed ? ' stack-move': ''}`}>
						<ObserveState
							listenTo={this.props.sequence}
							properties={["name", "stackColor"]}
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
						<div className="button-group">
							<StyledIconButton onClick={this.onToggleCollapsed} data-testid="btn-stack-collapse">
								{
									this.state.isCollapsed ? <DownIcon /> : <UpIcon />
								}
							</StyledIconButton>
							{
								!this.state.isCollapsed && this.props.index !== 0 && <StyledIconButton className="stack-move">
									<MoveIcon />
								</StyledIconButton>
							}
						</div>
						<Droppable droppableId={this.props.sequence._id}>
							{
								(provided: DroppableProvided, snapshot: DroppableStateSnapshot) => {
									if (this.state.isCollapsed && snapshot.isDraggingOver) {
										this.setCollapsed(false);
									}
									return (
										<div  {...provided.droppableProps} ref={provided.innerRef}>
											<Collapse in={this.state.isCollapsed} timeout={FlowConstants.COLLAPSE_TIMEOUT}>
												<FlowSequenceSummary>
													<Typography align="center">
														Steps
													</Typography>
													<Typography align="center" variant="h4" data-testid="steps-count">
														{this.props.sequence.steps.length}
													</Typography>
												</FlowSequenceSummary>
											</Collapse>
											<Collapse in={!this.state.isCollapsed} timeout={FlowConstants.COLLAPSE_TIMEOUT}>
												<FlowSequenceContent>
													{this.props.sequence.steps.length === 0 && <>put steps here</> }
													{this.props.sequence.steps.map((step: BaseFlowStep, i: number) => {
														return <ObserveState
															listenTo={step}
															key={step._id}
															control={() => <FlowSequenceStackStepHost
																width={this.width}
																editContext={this.props.editContext}
																sequence={this.props.sequence}
																index={i}
																step={step}
															/>}
														/>
													})}
												</FlowSequenceContent>
											</Collapse>
											{  provided.placeholder }
										</div>
									);
								}
							}
						</Droppable>
					</div>
                </FlowSequenceDiv>
            </ReactDraggable>
        );
    }
}
