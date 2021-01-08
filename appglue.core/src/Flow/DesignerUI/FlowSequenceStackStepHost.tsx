import React from "react";
import {
    Draggable,
    DraggableProvided,
    DraggableStateSnapshot
} from "react-beautiful-dnd";
import styled from "styled-components";

import {BaseFlowStep} from "../Steps/BaseFlowStep";
import {FlowStepSequence} from "../Structure/FlowStepSequence";

import { FlowStepOutputInstructions } from "../Structure/FlowStepOutputInstructions";
import {FlowSequenceStackAltPath} from "./FlowSequenceStackAltPath";


import {FlowEditContext} from "../FlowEditContext";
import { ObserveMultiState } from "../../CommonUI/StateManagement/ObserveMultiState";
import { IFlowStepSequence } from "../Structure/IFlowStepSequence";


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



interface IFlowSequenceStackStepHost {
	sequence: FlowStepSequence;
	editContext: FlowEditContext;
	index: number;
	width: number;
	step: BaseFlowStep;
}


export class FlowSequenceStackStepHost extends React.Component<IFlowSequenceStackStepHost, {isDragging: boolean; isCollapsed: boolean; isDroppingOver: boolean;}> {

    render() {
		let {step, index, width} = this.props;
		
		let isLast = this.props.sequence.steps.length === index + 1;

		let otherPaths: FlowStepOutputInstructions[] = step.getOutcomeInstructions();

		if (otherPaths.length !== 0) {
			// removes first item
			otherPaths.shift();
		}

        return (
			<Draggable
				key={step._id}
				draggableId={step._id}
				index={index}
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
										<StepConnect />
										{otherPaths.length !== 0 && (
											<StepConnectOtherPaths>
												{
													otherPaths.map((stepOutput: FlowStepOutputInstructions) => {
														return (
															<ObserveMultiState
																listenTo={[stepOutput]}
																key={'path'+stepOutput.pathName}
																control={() => {
																	let targetSequence : IFlowStepSequence | undefined = undefined;

																	if (stepOutput.connectedSequenceId) {
																		targetSequence = this.props.editContext.getTargetSequence(stepOutput.connectedSequenceId);
																	}

																	return <FlowSequenceStackAltPath
																		sequence={this.props.sequence}
																		step={step}
																		stepOutput={stepOutput}
																		editContext={this.props.editContext}
																		width={width}
																		targetSequence={targetSequence}
																	/>
																}}
																onWillUnmount={() => {
																	this.props.editContext.purgeCandidateSequences();
																}}
															/>
														)
													})
												}
											</StepConnectOtherPaths>
										)}
									</StepConnectSection>
								)}
							</div>
								
						);
					}
				}
			</Draggable>
		)
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
