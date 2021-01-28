import React from "react";
import styled from "styled-components";
import { Select } from "@material-ui/core";
import {FlowStepSequence} from "../Structure/FlowStepSequence";
import {BaseFlowStep} from "../Steps/BaseFlowStep";
import { FlowStepOutputInstructions, FlowStepOutputInstructionType } from "../Structure/FlowStepOutputInstructions";
import {FlowEditContext} from "../FlowEditContext";
import {IFlowStepSequence} from "../Structure/IFlowStepSequence";
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
	instruction: FlowStepOutputInstructions;
	editContext: FlowEditContext;
	width: number;
	targetSequence: IFlowStepSequence | undefined;

}

export class FlowSequenceStackAltPath extends React.Component<IFlowSequenceStackAltPath, {}> {
	containerRef: React.RefObject<HTMLDivElement> = React.createRef<HTMLDivElement>();

	markPathPosition = () => {
		// if (!this.props.instruction.hasBeenRendered)
		// {
		// 	this.props.instruction.hasBeenRendered = true;
		// 	this.props.editContext.onPathPositionInitialChange(this.props.instruction);
		// }
		if (this.props.instruction.strategy === FlowStepOutputInstructionType.BRANCH) {


			// if (this.containerRef && this.containerRef.current) {
			// 	let point1 = {
			// 		x: this.containerRef!.current!.offsetLeft + (this.props.width - 40) + this.props.sequence.x + FlowConstants.PATH_CANDIDATE_SHIFT,
			// 		y: this.containerRef!.current!.offsetTop + this.props.sequence.y + 18 - (FlowConstants.PATH_CANDIDATE_HEIGHT/2)
			// 	};
			//
			// 	// this.props.instruction.candidateStackX = point1.x;
			// 	// this.props.instruction.candidateStackY = point1.y;
			//
			// 	this.props.instruction.postionHistory.push({x: point1.x, y: point1.y, from: 'mount'});
			//
			// 	// if its initial, call set
			// //	this.props.editContext.onPathPositionInitialChange(this.props.instruction);
			//
			// }
		}
	}

	componentDidMount() {
		this.markPathPosition();


	}

	render() {
		let {instruction, sequence, step} = this.props;

		
		return (
			<>
				<StepPathConnectDiv />
				<StepPathWrapper ref={this.containerRef} >
					<ObserveMultiState listenTo={[sequence, instruction]}
						control={
							() => <StepPathDiv
								id={this.props.instruction.getElementId()}
								key={instruction.pathName}
								width={
									instruction.strategy === FlowStepOutputInstructionType.BRANCH
									? this.props.width - 40
									: this.props.width - 73
								}
							>
								{instruction.pathName}

								<Select
									disableUnderline
									native
									value={instruction.strategy}
									onChange={(event: React.ChangeEvent<{name?: string | null, value: unknown}>) => {
										instruction.strategy = event.target.value as FlowStepOutputInstructionType;
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