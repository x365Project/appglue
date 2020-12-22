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
import {FlowStepDesignWrapper} from "../Utilities/FlowStepDesignWrapper";
import {Button} from "@material-ui/core";
import {FlowEditContext} from "../XFlowEditor";
import {BaseFlowStep} from "../Steps/BaseFlowStep";
import {FlowStepSequence} from "../Structure/FlowStepSequence";
import {FlowStepOutput} from "../Structure/FlowStepOutput";

const FlowSequenceDiv = styled('div')<{width:number}>`
    display: flex;
    flex-direction: column;
    width: ${props => props.width}px;
    min-height: 100px;
    background: white;
    position: relative;
    border: 1px solid darkgray;
    border-radius: 5px;
    padding: 10px;
    margin-bottom: 10px;
`;

const StepSurround = styled('div')<{selected: boolean, invalid: boolean}>`
  border: 2px solid ${props => props.selected ? 'blue': 'gray'};
  border-radius: 5px;
  display: flex;
`;

const StepConnectSection = styled.div`
  display: flex;
  flex-direction: row;
  float: left;
  min-height: 20px;
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


export class FlowSequenceStack extends React.Component<{ flow: XFlowConfiguration, sequence: FlowStepSequence, editContext: FlowEditContext }, {}> {
    width: number = 275;

    onDragStop = (_e: DraggableEvent, data: DraggableData) => {
        this.props.sequence.x = data.x;
        this.props.sequence.y = data.y;
    }

    render() {
        return (
            <ReactDraggable
                bounds="parent"
                defaultPosition={{x: this.props.sequence.x, y: this.props.sequence.y}}
                onStop={this.onDragStop}
            >
                <div style={{width: this.width}}>
                    <Droppable
                        droppableId={this.props.sequence._id}>
                        {(
                            provided: DroppableProvided, snapshot: DroppableStateSnapshot) => {

                            return (
                                <FlowSequenceDiv
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                    width={this.width}
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
                                                                {(!isLast || otherPaths.length !== 0) && (
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
                                    {provided.placeholder}
                                </FlowSequenceDiv>
                            );
                        }
                        }
                    </Droppable>
                </div>
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