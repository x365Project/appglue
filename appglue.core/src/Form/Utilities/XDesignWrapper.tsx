import React from "react";
import { Draggable, DraggableProvided, DraggableStateSnapshot } from "react-beautiful-dnd";
import styled from "styled-components";
import {Popover} from "@material-ui/core";
import { XBaseControl } from "../Controls/XBaseControl";
import { OverlapDiv } from "../Containers/XBaseStackContainer";
import { FormMode } from "../FormDesignConstants";
import { XBaseContainer } from "../Containers/XBaseContainer";
import { FormDesignConstants } from '../FormDesignConstants'
import {FormEditContext} from "./FormEditContext";
import { ValidationIssue, ValidationLevel } from "../../Common/IDesignValidationProvider";
import { ExclamationRedIcon } from "../../CommonUI/Icon/ExclamationRedIcon";
import { WarningRedIcon } from "../../CommonUI/Icon/WarningRedIcon";

const ErrorDiv = styled.div`
    position: absolute;
    top: 8px;
    right: 8px;
`;

const ErrorButton = styled.div`
    z-index: 101;
    cursor: pointer;
`;

const ValidationList = styled("div")<{background?: string, borderColor?: string}>`
    background: ${props => props.background || '#FFEEED'};
    border: solid 1px ${props => props.borderColor || '#F65C66'};
    border-radius: 3px; 
    padding: 0 6px;
`;

const ValidationItem = styled.div`
    font-size: 9px;
    line-height: 11px;
    margin: 3px 0;
`;

export class XDraggableData {
    id: string;
    index: number;
    innerComponent: XBaseControl;
    editContext: FormEditContext;

    constructor(id: string,
        index: number,
        innerComponent: XBaseControl,
        editContext: FormEditContext) {
        this.id = id;
        this.index = index;
        this.innerComponent = innerComponent;
        this.editContext = editContext;
    }
}

export class XContainerDesignWrapper extends React.Component<XDraggableData> {
    wrapped: XBaseContainer;
    innerComponentRef: HTMLDivElement | null = null;

    constructor(value: XDraggableData) {
        super(value);
        this.wrapped = value.innerComponent as XBaseContainer;
    }

    onSelect = (event: React.MouseEvent<HTMLDivElement>) => {
        event.preventDefault();
        this.props.innerComponent.selectInDesigner();
    }

    render() {
        if (!this.props.editContext ||
            this.props.editContext.mode === FormMode.Runtime ||
            this.props.editContext.mode === FormMode.FormDesign) {
            return (
                <div>
                    {this.props.innerComponent.render()}
                </div>
            );
        } else {
            return (
                <Draggable
                    draggableId={this.props.id}
                    index={this.props.index}
                >
                    {
                        (provided: DraggableProvided) => {
                            return (
                                <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                >
                                    <div
                                        data-testid={this.props.innerComponent.id}
                                        ref={(ref) => this.innerComponentRef = ref}
                                        style={{position: 'relative'}}
                                    >
                                        {this.props.innerComponent.render()}
                                        <OverlapDiv
                                            data-test="container-click-div"
                                            onClick={this.onSelect}
                                            selected={this.props.innerComponent.isDesignSelected()}
                                            border={`solid ${FormDesignConstants.SELECTED_CONTROL_BORDER_WIDTH} ${FormDesignConstants.SELECTED_CONTROL_BORDER_COLOR}`}
                                        />
                                    </div>
                                </div>
                            );
                        }
                    }
                </Draggable>
            );
        }
    }
}

export class XDesignWrapper extends React.Component<XDraggableData, {open: boolean}> {

    wrapped: XBaseControl;
    innerComponentRef: HTMLDivElement | null = null;

    constructor(value: XDraggableData) {
        super(value);
        this.wrapped = value.innerComponent;
        this.state = {
            open: false
        }
    }

    onSelect = (event: React.MouseEvent<HTMLDivElement>) => {
        event.preventDefault();
        this.props.editContext.addToEventLog('Selected:'+ this.props.innerComponent.id);
        this.props.innerComponent.selectInDesigner();
    }

    onClickValidationIcon = (event: React.MouseEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();
        this.setState({open: true})
    }

    render() {

        let validationIssue: ValidationIssue | undefined = undefined;
        const validationIssues: ValidationIssue[] = this.props.editContext.getDesignValidationIssuesForControl(this.props.innerComponent);
        if (validationIssues.length > 0) {
            let issues = validationIssues.filter((v) => 
                v.level === ValidationLevel.ERROR
            );

            if (issues.length > 0) {
                validationIssue = issues[0]
            } else {
                validationIssue = validationIssues[0];
            }
        }


        if (!this.props.editContext ||
            this.props.editContext.mode === FormMode.Runtime ||
            this.props.editContext.mode === FormMode.LayoutDesign) {
            return (
                this.props.innerComponent.render()
            );
        } else {
            let border = `solid ${FormDesignConstants.SELECTED_CONTROL_BORDER_WIDTH} ${FormDesignConstants.SELECTED_CONTROL_BORDER_COLOR}`;

            if (!this.props.innerComponent.isDesignSelected()) {
                if (validationIssue?.level === ValidationLevel.ERROR) {
                    border = `solid ${FormDesignConstants.ERROR_CONTROL_BORDER_WIDTH} ${FormDesignConstants.ERROR_CONTROL_BORDER_COLOR}`;
                } else if (validationIssue && validationIssue.level === ValidationLevel.WARNING) {
                    border = 'none';
                }
            }

            return (
                <Draggable
                    isDragDisabled={this.props.editContext && this.props.editContext.mode !== FormMode.FormDesign}
                    key={this.props.innerComponent.id}
                    draggableId={this.props.id}
                    index={this.props.index}>
                    {
                        (provided: DraggableProvided, snapshot: DraggableStateSnapshot) => {
                            return (
                                <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                >
                                    <div
                                        ref={(ref) => this.innerComponentRef = ref}
                                        style={{position: 'relative'}}
                                    >
                                        {this.props.innerComponent.render()}
                                        <OverlapDiv
                                            data-testid="control-click-div"
                                            onClick={this.onSelect}
                                            aria-describedby={this.props.innerComponent.id}
                                            selected={this.props.innerComponent.isDesignSelected() || validationIssue?.level === ValidationLevel.ERROR}
                                            border={border}
                                        >
                                            {
                                                validationIssue && <ErrorDiv>
                                                    
                                                    <ErrorButton onClick={this.onClickValidationIcon} data-testid={ validationIssue?.level === ValidationLevel.ERROR ? 'control-error-validation' : 'control-warn-validation'}>
                                                        {
                                                            validationIssue?.level === ValidationLevel.ERROR && 
                                                            <ExclamationRedIcon />
                                                        }
                                                        {
                                                            validationIssue?.level === ValidationLevel.WARNING && 
                                                            <WarningRedIcon />
                                                        }
                                                    </ErrorButton>
                                                    <Popover
                                                        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                                                        open={this.state.open}
                                                        onClose={() => this.setState({open: false})}
                                                        anchorEl={this.innerComponentRef}
                                                    >
                                                        <ValidationList borderColor={validationIssue?.level === ValidationLevel.WARNING ? '#F69D5C' : undefined}>
                                                            <ValidationItem data-testid="validation-item">{validationIssue.issue}</ValidationItem>
                                                        </ValidationList>
                                                    </Popover>
                                                </ErrorDiv>
                                            }
                                        </OverlapDiv>
                                    </div>
                                </div>
                            );
                        }
                    }
                </Draggable>
            );
        }
    }
}
