import React, {useEffect, useRef, useState} from "react";
import {FlowConnection, XFlowConfiguration} from "./Structure/XFlowConfiguration";
import styled from "styled-components";
import {FlowStepRegistration, RegistrationData} from "./Utilities/RegisterFlowStep";
import {
    DragDropContext,
    Draggable,
    DraggableProvided,
    DraggableStateSnapshot,
    DragStart,
    Droppable,
    DroppableProvided,
    DroppableStateSnapshot,
    DropResult,
    ResponderProvided
} from "react-beautiful-dnd";
import {AutoBind} from "../Common/AutoBind";
import {FlowSequenceStack} from "./DesignerUI/FlowSequenceStack";
import ReactDraggable from "react-draggable";
import {
    Accordion,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    MenuItem
} from "@material-ui/core";
import {
    ContextMenuForControl,
    EditLayerConfigArea,
    EditLayerStyledAccordionDetails,
    EditLayerStyledAccordionSummary,
    EditLayerStyledTypography,
    IconButtonWithTitle,
    StyledButtonGroup,
    TitleInput,
    TopbarDiv,
    TopbarIconButton,
    TopbarSaveButton,
    TopbarViewButton
} from "../CommonUI/CommonStyles";
import {BaseFlowStep} from "./Steps/BaseFlowStep";
import {FlowStepSequence} from "./Structure/FlowStepSequence";
import {ExpandIcon} from "../CommonUI/Icon/ExpandIcon";
import {ViewIcon} from "../CommonUI/Icon/ViewIcon";
import {StateManager} from "../CommonUI/StateManagement/StateManager";
import {ObserveState} from "../CommonUI/StateManagement/ObserveState";
import {CloseIcon} from "../CommonUI/Icon/CloseIcon";
import {CopyIcon} from "../CommonUI/Icon/CopyIcon";
import {CutIcon} from "../CommonUI/Icon/CutIcon";
import {PasteIcon} from "../CommonUI/Icon/PasteIcon";
import {DeleteIcon} from "../CommonUI/Icon/DeleteIcon";
import {CopyWhiteIcon} from "../CommonUI/Icon/CopyWhiteIcon";
import {CutWhiteIcon} from "../CommonUI/Icon/CutWhiteIcon";
import {DeleteWhiteIcon} from "../CommonUI/Icon/DeleteWhiteIcon";
import {FlowConstants} from "./CommonUI/FlowConstants";
import {FlowEditContext} from "./FlowEditContext";
import {CandidateSequenceStack} from "./DesignerUI/CandidateSequenceStack";
import Xarrow from "react-xarrows";
import { ObserveMultiState } from "../CommonUI/StateManagement/ObserveMultiState";
import {ObserveMultiStateProperties} from "../CommonUI/StateManagement/ObserveMultiStateProperties";
import { FlowStepOutputInstructionType } from "./Structure/FlowStepOutputInstructions";


export interface FlowEditorParameters {
    flow : XFlowConfiguration;
	flowTitle?: string;
	viewAPIUrl?: string;
	onFlowSave?: () => void;
	onFlowCancel?: () => void;
}

const FlowEditorDiv = styled.div`
    width: 100%;
    height: 100%;
`;


const FlowMainSectionDiv = styled.div`
    width: 100%;
    display: flex;
    flexDirection: column;
    height: 100vh;
`;

export interface IDialog {
    message: string;
    onSuccess?: () => void,
    onCancel?: () => void,
}


export class XFlowEditor extends React.Component<FlowEditorParameters, {}> {

	constructor(props: FlowEditorParameters) {
		super(props);

		if (props.flowTitle) {
			this.editContext.flowTitle = props.flowTitle;
		}

		if (props.viewAPIUrl) {
			this.editContext.viewAPIUrl = props.viewAPIUrl;
		}

		if (props.onFlowSave) {
			this.editContext.onFlowSave = props.onFlowSave;
		}

		if (props.onFlowCancel) {
			this.editContext.onFlowCancel = props.onFlowCancel;
		}
	}

    editContext : FlowEditContext = new FlowEditContext(this);

    get flow(): XFlowConfiguration {
        return this.props.flow;
    }

    render() {
        return (
            <ObserveState
                listenTo={this}
                control={
                    () => <DragDropContext onDragStart={this.onDragStart} onDragEnd={this.onDragEnd}>
                        <FlowEditorDiv>
                            <FlowTopBar editContext={this.editContext} />
                            <FlowMainSectionDiv>
                                <FlowSideActions />
                                <FlowToolbox />
                                <ObserveMultiStateProperties
                                    listeners={
                                        [
                                            {listenTo: this.props.flow, propertyName: 'sequences' },
                                            {listenTo: this.editContext, propertyName: 'propName' }
                                        ]
                                    }
                                    control={() => (
                                        <FlowDesignPage flow={this.props.flow} editContext={this.editContext}/>
                                    )}
                                />
                            </FlowMainSectionDiv>
                        </FlowEditorDiv>
                    </DragDropContext>
                }
            />
        );
    }

    @AutoBind
    onDragStart(initial: DragStart, _provided: ResponderProvided) {
        this.editContext.clearSelection();
        this.editContext.isDraggingControl = true;

        StateManager.propertyChanged(this.editContext, 'isDraggingControl');
    }

    @AutoBind
    onDragEnd(result: DropResult) {
        this.editContext.isDraggingControl = false;
        StateManager.propertyChanged(this.editContext, 'isDraggingControl');

        // if not destination... then we should not do anything
        if (!result.destination)
            return;

        // do not drag in toolbox
        if (result.destination.droppableId === FlowConstants.ToolboxId)
            return;

        let isNew = false;
        let control : BaseFlowStep | null;

        if (Object.keys(FlowStepRegistration).indexOf(result.draggableId) !== -1) {
            // @ts-ignore
            let registeredControl = FlowStepRegistration[result.draggableId];
            let val = new registeredControl.prototype.constructor();
            // @ts-ignore
            control = val as BaseFlowStep;

            isNew = true;
        } else {
            control = this.props.flow.find(result.draggableId) as BaseFlowStep;
        }

        if (control) {
            if (result.destination.droppableId === result.source.droppableId) {
                // changing order
                this.props.flow.moveInSequence(control, result.destination.droppableId, result.destination.index)
            } else {
                let seqid = result.destination.droppableId;
                let c = this.editContext.findCandidateSequence(result.destination.droppableId);
                if (c) {
                    let s = c.createSequence();
                    // this is a new sequence... need to record its actual id
                    seqid = s._id;                                                                                                  
                    if (c.forPath && c.forStepId) {
                        let step = this.flow.find(c.forStepId) as BaseFlowStep;
                        let stepOutput = step.findOutputInstruction(c.forPath);
                        if (!stepOutput) return;                                                                            
                        stepOutput.connectedSequenceId = s._id;
                    }
                    this.flow.addSequence(s);
                }

                if (isNew) {
                    this.props.flow.add(control, seqid, result.destination.index);
                } else {
                    this.props.flow.moveToSequence(control, result.source.droppableId, seqid, result.destination.index);
                }
                this.editContext.positionCandidateSequences();
            }
        }

        if (control) {
            this.editContext.setSelection(control);
        }
        else
            this.editContext.clearSelection();

    }
}

const TopbarContent = styled.div`
	display: flex;
	margin-left: auto;
	align-items: center;
	& > .MuiButtonBase-root {
		margin-left: 10px;
	}
`;

export const FlowTopBar = function (props :{ editContext: FlowEditContext }) {

    const onChangeFlowTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
        props.editContext.flowTitle = event.target.value;
        StateManager.propertyChanged(props.editContext, 'flowTitle');
    }

    const isActionDisabled = () => {
        return !props.editContext.lastSelectionElement
    }

    return (
		<ObserveState
			listenTo={props.editContext}
			properties={['flowTitle', 'clipboardElement', 'selectionElement']}
			control={() =>
				<TopbarDiv>
					{
						props.editContext.flowTitle && <TitleInput
							classes={{
								input: 'TopbarInput',
								focused: 'TopbarInput-focused',
								root: `TopbarInput-root`
							}}
							data-testid="topbar-flow-name"
							inputProps={{ 'aria-label': 'Flow Name' }}
							value={props.editContext.flowTitle}
							disableUnderline
							onChange={onChangeFlowTitle}
						/>
					}

                    <StyledButtonGroup
						variant="outlined"
						size="small"
					>
						<IconButtonWithTitle
							title="Copy"
							icon={<CopyIcon />}
							disabled={isActionDisabled()}
							testId="btn-topbar-copy"
							action={props.editContext.onCopy}
						/>
						<IconButtonWithTitle
							title="Cut"
							icon={<CutIcon />}
							disabled={isActionDisabled()}
							testId="btn-topbar-cut"
							action={props.editContext.onCut}
						/>
						<IconButtonWithTitle
							title="Paste"
							icon={<PasteIcon />}
							disabled={isActionDisabled() || !props.editContext.clipboardElement}
							testId="btn-topbar-paste"
							action={props.editContext.onPaste}
						/>
						<IconButtonWithTitle
							title="Delete"
							icon={<DeleteIcon />}
							disabled={isActionDisabled()}
							testId="btn-topbar-delete"
							action={props.editContext.onDelete}
						/>
					</StyledButtonGroup>


					<TopbarContent>
						{
							props.editContext.viewAPIUrl && <TopbarViewButton color="primary" startIcon={<ViewIcon />} href={props.editContext.viewAPIUrl}>
								View API
							</TopbarViewButton>
						}
						{
							props.editContext.onFlowSave && <TopbarSaveButton
								onClick={props.editContext.onFlowSave}
								color="primary"
								variant="contained"
								data-testid="btn-form-save"
							>
								Save
							</TopbarSaveButton>
						}
						{
							props.editContext.onFlowCancel && <TopbarIconButton onClick={props.editContext.onFlowCancel} data-testid="btn-topbar-flow-cancel">
								<CloseIcon />
							</TopbarIconButton>
						}
					</TopbarContent>
				</TopbarDiv>
			}
		/>
		
    );
}

const SideActionDiv = styled.div`
    width: 103px;
    height: 100%;
    border: 1px solid gray;
`;

export const FlowSideActions = function (props :{}) {
    return (
        <SideActionDiv></SideActionDiv>
    );
}

const SideToolboxDiv = styled.div`
    width: 320px;
    height: 100%;
    border: 1px solid gray;
    padding: 15px;
`;

export const FlowToolbox = function (props :{}) {
    return (
        <Droppable droppableId="droppable">
            {(provided: DroppableProvided, snapshot: DroppableStateSnapshot) => (
                <SideToolboxDiv
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                >
                    {Object.values(FlowStepRegistration).map((value: RegistrationData, index: number) => {
                        return (
                            <Draggable
                                key={'toolbox' + index}
                                draggableId={value.name}
                                index={index}
                            >
                                {
                                    (provided: DraggableProvided, snapshot: DraggableStateSnapshot) => {
                                        return (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                            >
                                                <FlowToolboxItem
                                                    item={value}
                                                />
                                            </div>
                                        );
                                    }
                                }
                            </Draggable>
                        );
                    })}
                    {provided.placeholder}
                </SideToolboxDiv>
            )
            }
        </Droppable>

    );
}

const ToolboxItem = styled.div`
    width: 100%;
    display: flex;
    flexDirection: column;
    border: 2px solid darkgray;
    padding: 8px;
    margin-top: 10px;
    border-radius: 5px;
`;

export class FlowToolboxItem extends React.Component<{ item: RegistrationData }, {}> {
    render() {
        return (
            <ToolboxItem>
                {this.props.item.icon}
                {this.props.item.name}
            </ToolboxItem>
        );
    }
}

const DesignPanel = styled.div`
    width: 100%;
    height: 100%;
	background: #E5E5E5;
    position: relative;
    overflow: auto;

    canvas {
        position: absolute;
        left: 0;
        right: 0;
        width: 100%;
        height: 100%;
    }
`;

export const FlowDesignPage = function (props :{flow: XFlowConfiguration, editContext: FlowEditContext}) {


    function onClose() {
        if (props.editContext.notification!.onCancel) {
            props.editContext.notification!.onCancel();
        }
        props.editContext.notification = undefined;
    }

    function onSuccess() {
        if (props.editContext.notification!.onSuccess) {
            props.editContext.notification!.onSuccess();
        }
        props.editContext.notification = undefined;
    }

    function renderContextMenuUI() {
        let contextControl = props.editContext.contextControl;
        if (contextControl) {
            return <ContextMenuForControl
                open={!!contextControl}
                onClose={() => props.editContext.contextControl = null}
                anchorReference="anchorPosition"
                anchorPosition={
                contextControl.mouseY !== null && contextControl.mouseX !== null
                    ? { top: contextControl.mouseY, left: contextControl.mouseX }
                    : undefined
                }
            >
                <MenuItem onClick={() => props.editContext.onCopy(contextControl!.selectedId)} data-testid="btn-context-copy">
                    <CopyWhiteIcon/> Copy
                </MenuItem>
                <MenuItem onClick={() => props.editContext.onCut(contextControl!.selectedId)} data-testid="btn-context-cut">
                    <CutWhiteIcon/> Cut
                </MenuItem>
                <MenuItem onClick={() => props.editContext.onDelete(contextControl!.selectedId)} data-testid="btn-context-paste">
                    <DeleteWhiteIcon /> Delete
                </MenuItem>
            </ContextMenuForControl>
        }
    }

    function renderDialog() {
        return <ObserveState
            listenTo={props.editContext}
            properties={["notification"]}
            control={
                () => <Dialog
                    open={!!props.editContext.notification}
                    onClose={onClose}
                >
                    <DialogTitle>
                        Warning
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>{props.editContext.notification && props.editContext.notification!.message}</DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        {
                            props.editContext.notification && props.editContext.notification!.onSuccess
                            && <Button variant="contained" color="primary" onClick={onSuccess} data-testid="btn-dialog-success">OK</Button>
                        }
                        {
                            props.editContext.notification && props.editContext.notification!.onCancel
                            && <Button variant="contained" onClick={onClose} data-testid="btn-dialog-cancel">Cancel</Button>
                        }
                    </DialogActions>
                </Dialog>
            }
        />
    }

    return (
        <DesignPanel>
            
            <ObserveState listenTo={props.editContext} properties={["candidateSequences"]}
                control={() => {
                    return <> 
                        {
                            // props.flow.getConnections().map((value: FlowConnection) => {
                            //     let targetSequence = props.editContext.getTargetSequence(value.toId);
                            //     return <ObserveMultiState
                            //         listenTo={[value.fromSequence, value.fromInstruction, value.fromStep, targetSequence]}
                            //         key={`${value.fromId}-${value.toId}`}
                            //         control={
                            //             () => {
                            //                 return <Xarrow
                            //                     start={value.fromSequence.isCollapsed ? value.fromSequence._id : value.fromStep._id + '-' + value.fromInstruction.pathName}
                            //                     end={value.toId}
                            //                     strokeWidth = {2}
                            //                     headSize = {3}
                            //                 />
                            //             }
                            //         }/> 
                            // })
                            props.flow.sequences.map((s: FlowStepSequence) => {
                                return <ObserveState
                                    key={s._id}
                                    listenTo={s}
                                    control={
                                        () => <> {
                                            props.flow.getConnectionsBySequence(s).map((value: FlowConnection) => {
                                                let targetSequence = props.editContext.getTargetSequence(value.toId);
                                                return <ObserveMultiState
                                                    listenTo={[value.fromInstruction, value.fromStep, targetSequence]}
                                                    key={`${value.fromId}-${value.toId}`}
                                                    control={
                                                        () => {
                                                            if (value.fromInstruction.strategy === FlowStepOutputInstructionType.BRANCH) {

                                                                return <Xarrow
                                                                    start={value.fromSequence.isCollapsed ? value.fromSequence._id : value.fromStep._id + '-' + value.fromInstruction.pathName}
                                                                    end={value.toId}
                                                                    strokeWidth = {2}
                                                                    headSize = {3}
                                                                />
                                                            }
                                                            return <></>;
                                                        }
                                                    }/> 
                                            })
                                        }
                                        </>
                                    }
                                />

                            })
                        }
                    </>
                }}
            />

            <ObserveState
                listenTo={props.editContext}
                properties={["candidateSequences", "isDraggingControl"]}
                control={() => <>
                    {
                        props.editContext.getCandidateSequences().map((c) =>
                            <CandidateSequenceStack
                                key={c._id}
                                candidate={c}
                                editContext={props.editContext}
                            />
                        )
                    }

                </>}
            />

            {
                props.flow.sequences.map((s: FlowStepSequence, i: number) => {
                    return <ObserveState
                        key={s._id}
                        listenTo={s}
                        control={() =>
                            <FlowSequenceStack flow={props.flow} sequence={s}  editContext={props.editContext} index={i}/>
                        }
                    />
                })
            }

            <EditLayer flow={props.flow} editContext={props.editContext} />

            <ObserveState listenTo={props.editContext} properties={["contextControl"]} control={
                () => <>
                    {
                        renderContextMenuUI()
                    }
                </>
            } />
            {
                renderDialog()
            }
        </DesignPanel>
    );
}

export const EditLayer = function (props :{flow: XFlowConfiguration, editContext: FlowEditContext}) {

    const [expandedConfigPanel, setexpandedConfigPanel] = useState(true);
    const [isMovingConfigPanel, setisMovingConfigPanel] = useState(false);

    function onToggleExpandedConfigPanel() {
        if (!isMovingConfigPanel) {
            setexpandedConfigPanel(!expandedConfigPanel);
        }
    }

    function onDragMovingConfigPanel() {
        setisMovingConfigPanel(true);
    }

    function onEndMovingConfigPanel() {
        setTimeout(() => {
            setisMovingConfigPanel( false );
        }, 500);
    }

    return (
        <ObserveState listenTo={props.editContext}
            properties={["selectionElement"]}
            control={() => {
                let selectedStep = props.editContext.selectionElement;
                let editUIComponent = selectedStep?.renderEditUI();
                return <>
                    {
                        editUIComponent && (
                            <ReactDraggable
                                onDrag={onDragMovingConfigPanel}
                                onStop={onEndMovingConfigPanel}
                                handle=".config-form-header"
                            >
                                <EditLayerConfigArea>
                                    <Accordion
                                        expanded={expandedConfigPanel}
                                        onChange={onToggleExpandedConfigPanel}
                                        defaultExpanded
                                    >
                                        <EditLayerStyledAccordionSummary expandIcon={<ExpandIcon />}>
                                            <EditLayerStyledTypography variant="subtitle1" classes={{root: 'config-form-header'}}>
                                                {/*Edit: {selectedStep?.toString() || 'Flow Step Config'}*/}
                                                Edit: 'Flow Step Config'
                                            </EditLayerStyledTypography>
                                        </EditLayerStyledAccordionSummary>
                                        <EditLayerStyledAccordionDetails classes={{root: 'config-form-content'}}>
                                            {editUIComponent}
                                        </EditLayerStyledAccordionDetails>
                                    </Accordion>
                                </EditLayerConfigArea>
                            </ReactDraggable>
                        )
                    }
                </>
                }
            }
        />
    )
}