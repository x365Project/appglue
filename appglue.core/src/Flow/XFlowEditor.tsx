import React, {useState} from "react";
import {XFlowConfiguration} from "./Structure/XFlowConfiguration";
import styled from "styled-components";
import {FlowStepRegistration, RegistrationData} from "./Utilities/RegisterFlowStep";
import {
    DragDropContext,
    Draggable,
    DraggableProvided,
    DraggableStateSnapshot,
    Droppable,
    DroppableProvided,
    DroppableStateSnapshot,
    DropResult
} from "react-beautiful-dnd";
import {AutoBind} from "../Common/AutoBind";
import {FlowSequenceStack, FakeFlowSequenceStack} from "./DesignerUI/FlowSequenceStack";
import ReactDraggable from "react-draggable";
import {Accordion, MenuItem, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button} from "@material-ui/core";
import {
    EditLayerConfigArea,
    EditLayerStyledAccordionDetails,
	EditLayerStyledAccordionSummary,
	EditLayerStyledTypography,
    TitleInput,
    TopbarSaveButton,
    TopbarIconButton,
    TopbarDiv,
    TopbarViewButton,
    TopbarButtonGroup,
    TopbarActionButton,
    ContextMenuForControl
} from "../CommonUI/CommonStyles";
import {BaseFlowStep} from "./Steps/BaseFlowStep";
import {FlowStepSequence} from "./Structure/FlowStepSequence";
import {IFlowElement} from "./Structure/IFlowElement";
import {ExpandIcon} from "../CommonUI/Icon/ExpandIcon";
import {ViewIcon} from "../CommonUI/Icon/ViewIcon";
import { StateManager } from "../CommonUI/StateManagement/StateManager";
import { ObserveState } from "../CommonUI/StateManagement/ObserveState";
import { XData } from "../Common/Data/XData";
import { CloseIcon } from "../CommonUI/Icon/CloseIcon";
import { TextIcon } from "../CommonUI/TextIcon";
import { CopyIcon } from "../CommonUI/Icon/CopyIcon";
import { CutIcon } from "../CommonUI/Icon/CutIcon";
import { PasteIcon } from "../CommonUI/Icon/PasteIcon";
import { DeleteIcon } from "../CommonUI/Icon/DeleteIcon";
import { DataUtilities } from "../Common/DataUtilities";
import { IContextForControl } from "../Common/IContextForControl";
import { CopyWhiteIcon } from "../CommonUI/Icon/CopyWhiteIcon";
import { CutWhiteIcon } from "../CommonUI/Icon/CutWhiteIcon";
import { DeleteWhiteIcon } from "../CommonUI/Icon/DeleteWhiteIcon";

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

export class FlowConstants {
    static ToolboxId = 'Toolbox';
    static FakeStackId = 'Fakestack';
}

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


export class FlowEditContext {
    flowEditor: XFlowEditor;

	flowTitle?: string;
    viewAPIUrl?: string;
    isDraggingControl: boolean = false;


	public onFlowSave?: () => void;
    public onFlowCancel? : () => void ;


    @AutoBind
    clone(s: IFlowElement) : IFlowElement {
        let val;
        if (s instanceof FlowStepSequence) {
            val = new FlowStepSequence();
        } else {
            let type = s.name!;
            let registeredControl = Object.values(FlowStepRegistration).filter((v: RegistrationData) => {
                return Reflect.get(v.prototype, '__type') === type;
            })[0];
    
            val = new registeredControl!.prototype.constructor();
        }

        return Object.assign(val, s);
    }

    @AutoBind
    onCopy(selectedId?: string) {
        let elem = this._lastSelectionElement;
        if (selectedId) {
            elem = this.flow.find(selectedId) as IFlowElement;
            this.contextControl = null;
        }
        if (!elem) return;

        if (elem instanceof FlowStepSequence && !(elem as FlowStepSequence).canCopy) {
            this.notification = {
                message: 'You can not copy this sequence',
                onSuccess: () => {}
            }
        } else {
            this.clipboardElement = this.clone(elem) as IFlowElement;
        }

    }

    @AutoBind
    onCut(selectedId?: string) {
        let elem = this._lastSelectionElement;
        if (selectedId) {
            elem = this.flow.find(selectedId) as IFlowElement;
            this.contextControl = null;
        }
        if (!elem) return;

        if (elem instanceof FlowStepSequence) {
            let idx = this.flow.sequences.indexOf(elem as FlowStepSequence);
            if (idx > 0) {
                if ((elem as FlowStepSequence).steps.length > 0) {
                    this.notification = {
                        message: 'This sequence has the steps. Do you want to cut it really?',
                        onSuccess: () => {
                            this.deleteSequence(idx);
                        },
                        onCancel: () => {}
                    }
                } else {
                }
            } else {
                this.notification = {
                    message: 'Primary Stack can not be cut. But it\'s copied to clipboarded',
                    onSuccess: () => {}
                }
            }
        } else {
            this.flow.remove(elem as BaseFlowStep);
        }
        this.clipboardElement = this.clone(elem) as IFlowElement;

    }

    @AutoBind
    deleteSequence(idx: number) {
        this.flow.sequences.splice(idx, 1);
        StateManager.propertyChanged(this.flow, 'sequences');
    }

    @AutoBind
    onDelete(selectedId?: string) {
        let elem = this._lastSelectionElement;
        if (selectedId) {
            elem = this.flow.find(selectedId) as IFlowElement;
            this.contextControl = null;
        }
        if (!elem) return;

        if (elem instanceof FlowStepSequence) {
            if (!(elem as FlowStepSequence).canDelete) {
                this.notification = {
                    message: 'You can not delete this sequence',
                    onSuccess: () => {}
                }
                return;
            }
            let idx = this.flow.sequences.indexOf(elem as FlowStepSequence);
            if (idx > 0) {
                if ((elem as FlowStepSequence).steps.length > 0) {
                    this.notification = {
                        message: 'This sequence has the steps. If you delete this, you will lost all data. it\'s okay?',
                        onSuccess: () => {
                            this.deleteSequence(idx);
                        },
                        onCancel: () => {}
                    }
                } else {
                    this.deleteSequence(idx);
                }
                
            } else {
                this.notification = {
                    message: 'Primary Stack can not be deleted.',
                    onSuccess: () => {}
                }
            }
        } else {
            this.flow.remove(elem as BaseFlowStep);
        }

    };

    @AutoBind
    onPaste() {
        if (!this.clipboardElement || !this.selectionElement) return;

        if (this.clipboardElement instanceof FlowStepSequence && this.selectionElement instanceof FlowStepSequence) {
            let idx = this.flow.sequences.indexOf(this.selectionElement as FlowStepSequence);
            let newSeq = this.clone(this.clipboardElement) as FlowStepSequence;
            newSeq._id = DataUtilities.generateUniqueId();
            newSeq.steps = newSeq.steps.map((s: BaseFlowStep) => {
                let newS = this.clone(s) as BaseFlowStep;
                newS._id = DataUtilities.generateUniqueId();
                return newS;
            });

            newSeq.x += 20;
            newSeq.y += 20;

            this.flow.sequences.splice(idx + 1, 0, newSeq);

            StateManager.propertyChanged(this.flow, 'sequences');

        } else if (!(this.clipboardElement instanceof FlowStepSequence) && !(this.selectionElement instanceof FlowStepSequence)) {
            for (let s of this.flow.sequences) {
                let idx = s.steps.indexOf(this.selectionElement as BaseFlowStep);
                if (idx >= 0) {
                    let elem = this.clone(this.clipboardElement) as BaseFlowStep;
                    elem._id = DataUtilities.generateUniqueId();
                    this.flow.add(elem, s._id, idx);
                    break;
                }
            }
        }

    }

    constructor(flowEditor: XFlowEditor) {
        this.flowEditor = flowEditor;
    }

    get flow(): XFlowConfiguration {
        return this.flowEditor.flow;
    }

    private _selectionElement?: IFlowElement;
    private _lastSelectionElement?: IFlowElement;

    get selection(): string | undefined {
        return this._selectionElement?._id;
    }

    get selectionElement(): IFlowElement | undefined {
        return this._selectionElement;
    }

    get lastSelectionElement(): IFlowElement | undefined {
        return this._lastSelectionElement;
    }

    setSelection(selection: IFlowElement) {
        this._selectionElement = selection;
        this._lastSelectionElement = selection;
        this.refresh()
    }

    clearSelection() {
        this._selectionElement = undefined;
        this.refresh()
    }

    private _clipboardElement?: IFlowElement;

    get clipboardElement() : IFlowElement | undefined {
        return this._clipboardElement;
    }

    set clipboardElement(elem: IFlowElement | undefined) {
        this._clipboardElement = elem;
        StateManager.propertyChanged(this, 'clipboardElement');
    }

    private _contextControl: IContextForControl | null = null;

    get contextControl(): IContextForControl | null {
        return this._contextControl;
    }

    set contextControl(control: IContextForControl | null) {
        this._contextControl = control;
        StateManager.propertyChanged(this, 'contextControl');
    }

    private _notification?: IDialog;

    set notification(n: IDialog | undefined) {
        this._notification = n;
        StateManager.propertyChanged(this, 'notification');
    }

    get notification() {
        return this._notification;
    }

    refresh() {
        this.flowEditor.forceUpdate();
    }
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
            <DragDropContext onDragStart={this.onDragStart} onDragEnd={this.onDragEnd} onDragUpdate={this.onDragUpdate}>
                <FlowEditorDiv>
                    <FlowTopBar editContext={this.editContext} />
                    <FlowMainSectionDiv>
                        <FlowSideActions/>
                        <FlowToolbox/>
                        <ObserveState listenTo={this.props.flow} properties={["sequences"]} control={() => (
                            <FlowDesignPage flow={this.props.flow} editContext={this.editContext}/>
                        )} />
                    </FlowMainSectionDiv>
                </FlowEditorDiv>
            </DragDropContext>
        );
    }

    @AutoBind
    onDragUpdate(_result: DropResult) {
        this.editContext.isDraggingControl = true;

        StateManager.propertyChanged(this.editContext, 'isDraggingControl');
    }

    @AutoBind
    onDragStart() {
        this.editContext.clearSelection();
    }

    @AutoBind
    onDragEnd(result: DropResult) {
        this.editContext.isDraggingControl = false;
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
            } else if (result.destination.droppableId === FlowConstants.FakeStackId) {

                if (!isNew) {
                    this.props.flow.remove(control);
                }
                let initialSeq = new FlowStepSequence();
                let y = this.props.flow.sequences[0].y 
                let x = Math.max(
                    ...this.props.flow.sequences
                        .filter((s) => {
                            return s.y < y + 150;
                        })
                        .map((s) => s.x + (s.isCollapsed ? 150 : 300))
                );
                initialSeq.x = x;
                initialSeq.y = y;
                this.props.flow.sequences.push(initialSeq);
                this.props.flow.add(control, initialSeq._id);
                StateManager.propertyChanged(this.props.flow, 'sequences');
            } else if (isNew) {
                // adding new
                this.props.flow.add(control, result.destination.droppableId, result.destination.index);
            } else {
                this.props.flow.moveToSequence(control, result.source.droppableId, result.destination.droppableId, result.destination.index)
            }
        }

        StateManager.propertyChanged(this.editContext, 'isDraggingControl');
        if (control)
            this.editContext.setSelection(control);
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
			properties={['flowTitle', 'clipboardElement']}
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

                    <TopbarButtonGroup
						variant="outlined"
						size="small"
					>
						<TopbarActionButton
							title="Copy"
							icon={<CopyIcon />}
							disabled={isActionDisabled()}
							testId="btn-topbar-copy"
							action={props.editContext.onCopy}
						/>
						<TopbarActionButton
							title="Cut"
							icon={<CutIcon />}
							disabled={isActionDisabled()}
							testId="btn-topbar-cut"
							action={props.editContext.onCut}
						/>
						<TopbarActionButton
							title="Paste"
							icon={<PasteIcon />}
							disabled={isActionDisabled() || !props.editContext.clipboardElement}
							testId="btn-topbar-paste"
							action={props.editContext.onPaste}
						/>
						<TopbarActionButton
							title="Delete"
							icon={<DeleteIcon />}
							disabled={isActionDisabled()}
							testId="btn-topbar-delete"
							action={props.editContext.onDelete}
						/>
					</TopbarButtonGroup>


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
`;

export const FlowDesignPage = function (props :{flow: XFlowConfiguration, editContext: FlowEditContext}) {
    let selectedStep = props.editContext.selectionElement;
    let editUIComponent = selectedStep?.renderEditUI();

    const [expandedConfigPanel, setexpandedConfigPanel] = useState(true);
    const [isMovingConfigPanel, setisMovingConfigPanel] = useState(false);
    // make state

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
            <ObserveState listenTo={props.editContext} control={() => (
                <FakeFlowSequenceStack flow={props.flow} show={props.editContext.isDraggingControl}/>
            )} />

            {props.flow.sequences.filter((value:FlowStepSequence) => {
                return value.x != -1;
            }).map((s: FlowStepSequence, i: number) => {
                return <FlowSequenceStack key={s._id} flow={props.flow} sequence={s}  editContext={props.editContext} index={i}/>
            })}
            {
                editUIComponent && (
                    <ReactDraggable
                        onDrag={onDragMovingConfigPanel}
                        onStop={onEndMovingConfigPanel}
                        handle=".config-form-header"
                    >
                        <EditLayerConfigArea
                            // ref={this.configFormNode}
                        >
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



