import React from "react";
import {Draggable, DraggableProvided, DraggableStateSnapshot} from "react-beautiful-dnd";
import styled from "styled-components";
import {Popover} from "@material-ui/core";
import {XBaseControl} from "../Controls/XBaseControl";
import {OverlapDiv} from "../Containers/XBaseStackContainer";
import {FormDesignConstants, FormMode} from "../FormDesignConstants";
import {FormContext} from "./FormContext";
import {ValidationLevel} from "../../Common/IDesignValidationProvider";
import {ExclamationRedIcon} from "../../CommonUI/Icon/ExclamationRedIcon";
import {WarningRedIcon} from "../../CommonUI/Icon/WarningRedIcon";
import {IssueData} from "./ControlRenderContext";
import {ObserveState} from "../../CommonUI/StateManagement/ObserveState";

const ErrorDiv = styled.div`
    position: absolute;
    top: 33px;
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
    width: 142px;
    height: 20px;
`;

const ValidationItem = styled.div`
    font-size: 12px;
    line-height: 11px;
    margin: 3px 0;
`;

export class XDraggableData {
    id: string;
    index: number;
    innerComponent: XBaseControl;
    editContext: FormContext;

    constructor(id: string,
        index: number,
        innerComponent: XBaseControl,
        editContext: FormContext) {
        this.id = id;
        this.index = index;
        this.innerComponent = innerComponent;
        this.editContext = editContext;
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

    onContextMenu = (event: React.MouseEvent<HTMLDivElement>) => {
        event.preventDefault();
        this.props.editContext.selectContextControl({
            selectedId: this.props.innerComponent.id,
            mouseX: event.clientX,
            mouseY: event.clientY
        });
    }

    onClickValidationIcon = (event: React.MouseEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();
        this.setState({open: true})
    }


    isNotRequiredOverlap = () => {
        return !this.props.editContext ||
        this.props.editContext.mode === FormMode.Runtime ||
        this.props.editContext.mode === FormMode.LayoutDesign
    }

    render() {

        const validationIssues: IssueData | null = this.props.editContext.getControlContext(this.props.innerComponent).getDesignIssueData();

        if (this.isNotRequiredOverlap()) {
            return (
                this.props.innerComponent.render()
            );
        } else {
            let border = `solid ${FormDesignConstants.SELECTED_CONTROL_BORDER_WIDTH} ${FormDesignConstants.SELECTED_CONTROL_BORDER_COLOR}`;

            if (!this.props.innerComponent.isDesignSelected()) {
                if (validationIssues?.highestLevel === ValidationLevel.ERROR) {
                    border = `solid ${FormDesignConstants.ERROR_CONTROL_BORDER_WIDTH} ${FormDesignConstants.ERROR_CONTROL_BORDER_COLOR}`;
                } else if (validationIssues && validationIssues.highestLevel === ValidationLevel.WARNING) {
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
                                        data-testid="control-wrapper"
                                    >
                                        <ObserveState
                                            listenTo={this.props.innerComponent}
                                            control={() => {
                                                return (
                                                    this.props.innerComponent.render()
                                                );
                                            }}
                                        />

                                        {}
                                        <OverlapDiv
                                            onContextMenu={this.onContextMenu}
                                            data-testid="control-click-div"
                                            onClick={this.onSelect}
                                            aria-describedby={this.props.innerComponent.id}
                                            selected={this.props.innerComponent.isDesignSelected() || validationIssues?.highestLevel === ValidationLevel.ERROR}
                                            border={border}
                                        >
                                            {
                                                validationIssues && <ErrorDiv>
                                                    
                                                    <ErrorButton onClick={this.onClickValidationIcon} data-testid={ validationIssues?.highestLevel === ValidationLevel.ERROR ? 'control-error-validation' : 'control-warn-validation'}>
                                                        {
                                                            validationIssues?.highestLevel === ValidationLevel.ERROR &&
                                                            <ExclamationRedIcon style={{width: '20px'}}/>
                                                        }
                                                        {
                                                            validationIssues?.highestLevel === ValidationLevel.WARNING &&
                                                            <WarningRedIcon />
                                                        }
                                                    </ErrorButton>
                                                    <Popover
                                                        anchorOrigin={{horizontal: 640, vertical: 70}}
                                                        open={this.state.open}
                                                        onClose={() => this.setState({open: false})}
                                                        anchorEl={this.innerComponentRef}
                                                    >
                                                        <ValidationList borderColor={ validationIssues?.highestLevel === ValidationLevel.WARNING ? '#F69D5C' : undefined}>
                                                            <ValidationItem data-testid="validation-item">{ validationIssues!.text}</ValidationItem>
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
