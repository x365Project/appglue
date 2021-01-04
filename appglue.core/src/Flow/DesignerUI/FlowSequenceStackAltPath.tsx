import React from "react";
import styled from "styled-components";
import { Select } from "@material-ui/core";
import {FlowStepSequence} from "../Structure/FlowStepSequence";
import {BaseFlowStep} from "../Steps/BaseFlowStep";
import { FlowStepOutputInstructions, FlowStepOutputInstructionType } from "../Structure/FlowStepOutputInstructions";
import { ObserveState } from "../../CommonUI/StateManagement/ObserveState";
import {FakeFlowSequenceStack} from "./FakeFlowSequenceStack";
import {FlowEditContext} from "../FlowEditContext";
import { CandidateSequence } from "../Structure/CandidateSequence";


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



interface IFlowSequenceStackAltPath {
	sequence: FlowStepSequence;
	step: BaseFlowStep;
	stepOutput: FlowStepOutputInstructions;
	editContext: FlowEditContext;
}

export class FlowSequenceStackAltPath extends React.Component<IFlowSequenceStackAltPath, {}> {
	containerRef: React.RefObject<HTMLDivElement> = React.createRef<HTMLDivElement>();

	render() {
		let childSequence:FlowStepSequence | null = null;
		let {stepOutput, editContext, sequence, step} = this.props;
		if (stepOutput.strategy === FlowStepOutputInstructionType.BRANCH) {
			if (this.containerRef && this.containerRef.current) {
				let point1 = {
					x: this.containerRef.current.offsetLeft + (sequence.width - 40) + sequence.x,
					y: this.containerRef.current.offsetTop + sequence.y
				};
				if (stepOutput.connectedSequenceId) {
					childSequence = editContext.flow.find(stepOutput.connectedSequenceId) as FlowStepSequence;
					if (this.containerRef && this.containerRef.current) {
						editContext.drawLine(
							point1,
							{
								x: childSequence.x,
								y: childSequence.y
							}
						);
					}
				} else if (stepOutput.pathName) {
					let candidateSequence = editContext.getCandidateSequenceForPath(step._id, stepOutput.pathName);
					if (candidateSequence) {
						editContext.drawLine(
							point1,
							{
								x: candidateSequence.x,
								y: candidateSequence.y
							}
						)
					} else {
						candidateSequence = new CandidateSequence(point1.x + 150, point1.y, step._id, stepOutput.pathName);
						editContext.addCandidateSequence(candidateSequence);
					}
				}
			}
			
		}
		return (
			<>
				<StepPathConnectDiv />
				<StepPathWrapper ref={this.containerRef}>
					<ObserveState listenTo={childSequence}
						properties={["stackColor"]}
						control={
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

								<Select
									disableUnderline
									native
									value={stepOutput.strategy}
									onChange={(event: React.ChangeEvent<{name?: string | null, value: unknown}>) => {
										stepOutput.strategy = event.target.value as FlowStepOutputInstructionType;										
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