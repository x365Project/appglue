import React from "react";
import styled from "styled-components";
import { Select } from "@material-ui/core";
import {FlowStepSequence} from "../Structure/FlowStepSequence";
import {BaseFlowStep} from "../Steps/BaseFlowStep";
import { FlowStepOutputInstructions, FlowStepOutputInstructionType } from "../Structure/FlowStepOutputInstructions";
import { ObserveState } from "../../CommonUI/StateManagement/ObserveState";
import {FlowEditContext} from "../FlowEditContext";
import { CandidateSequence } from "../Structure/CandidateSequence";
import {FlowConstants} from "../CommonUI/FlowConstants";
import {IFlowStepSequence} from "../Structure/IFlowStepSequence";
import {StateManager} from "../../CommonUI/StateManagement/StateManager";
import {ObserveMultiState} from "../../CommonUI/StateManagement/ObserveMultiState";


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
`;

const StepPathConnectDiv = styled.div`
	border-left: 2px solid black;
	margin-left: 25px;
	display: flex;
	min-height: 5px;
	width: 100%;
`;

interface IFlowSequenceStackAltPath {
	sequence: FlowStepSequence;
	step: BaseFlowStep;
	stepOutput: FlowStepOutputInstructions;
	editContext: FlowEditContext;
	width: number;
	targetSequence: IFlowStepSequence | undefined;
}

export class FlowSequenceStackAltPath extends React.Component<IFlowSequenceStackAltPath, {}> {
	containerRef: React.RefObject<HTMLDivElement> = React.createRef<HTMLDivElement>();

	manageCandidateSequence = () => {
		let {stepOutput, editContext, sequence, step, targetSequence} = this.props;

		if (stepOutput.strategy === FlowStepOutputInstructionType.BRANCH) {
			if (this.containerRef && this.containerRef.current) {
				if (stepOutput.pathName) {
					let point1 = {
						x: this.containerRef!.current!.offsetLeft + (this.props.width - 40) + sequence.x + FlowConstants.PATH_CANDIDATE_SHIFT,
						y: this.containerRef!.current!.offsetTop + sequence.y + 18 - (FlowConstants.PATH_CANDIDATE_HEIGHT/2)
					};
					if (!targetSequence) {
						let candidateSequence = new CandidateSequence(point1.x, point1.y, step._id, stepOutput.pathName);
						stepOutput.connectedSequenceId = candidateSequence._id;
						editContext.addCandidateSequence(candidateSequence);
					} else if (targetSequence instanceof CandidateSequence) {
						if (targetSequence.forPath !== stepOutput.pathName) {
							targetSequence.forPath = stepOutput.pathName;
							StateManager.changed(targetSequence);
						} else if ((targetSequence.desiredX !== point1.x || targetSequence.desiredY !== point1.y)) {
							// sequence is moved
							targetSequence.desiredX = point1.x;
							targetSequence.desiredY = point1.y;
							editContext.positionCandidateSequences();
						}
					}
					// else
					// 	{
					// 	// todo: this seems wrong.  why are we positioning inside render.
					// 	if (candidateSequence.desiredX !== point1.x + FlowConstants.PATH_CANDIDATE_SHIFT || point1.y !== candidateSequence.desiredY) {
					// 		candidateSequence.desiredX = point1.x + FlowConstants.PATH_CANDIDATE_SHIFT;
					// 		candidateSequence.desiredY = point1.y;
					// 		editContext.positionCandidateSequences();
					// 	}
					// }

				} else if (targetSequence && targetSequence instanceof CandidateSequence) {
					editContext.purgeCandidateSequences();
				}
			} else {
				this.forceUpdate();
			}
		} else if (targetSequence && targetSequence instanceof CandidateSequence) {
			editContext.positionCandidateSequences();
		}
		
	}

	componentDidMount() {
		this.manageCandidateSequence();
	}

	render() {
		let {stepOutput, sequence, step} = this.props;
		
		return (
			<>
				<StepPathConnectDiv />
				<StepPathWrapper ref={this.containerRef}>
					<ObserveMultiState listenTo={[sequence, stepOutput]}
						control={
							() => <StepPathDiv
								id={step._id + '-' + stepOutput.pathName}
								key={stepOutput.pathName}
								width={
									stepOutput.strategy === FlowStepOutputInstructionType.BRANCH 
									? this.props.width - 40
									: this.props.width - 73
								}
							>
								{stepOutput.pathName}

								<Select
									disableUnderline
									native
									value={stepOutput.strategy}
									onChange={(event: React.ChangeEvent<{name?: string | null, value: unknown}>) => {
										stepOutput.strategy = event.target.value as FlowStepOutputInstructionType;
										StateManager.changed(stepOutput);
									}}
								>
									<option value={FlowStepOutputInstructionType.CONTINUE}>Continue</option>
									<option value={FlowStepOutputInstructionType.THROW_EXCEPTION}>Throw</option>
									<option value={FlowStepOutputInstructionType.END_FLOW}>End</option>
									<option value={FlowStepOutputInstructionType.BRANCH}>Branch</option>
								</Select>
							</StepPathDiv>
						}
					/>
				</StepPathWrapper>
			</>
		);
	}
}