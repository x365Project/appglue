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
import {Accordion, MenuItem} from "@material-ui/core";
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

export class FlowEditContext {
    flowEditor: XFlowEditor;

	flowTitle?: string;
    viewAPIUrl?: string;
    isDraggingControl: boolean = false;

	public onFlowSave?: () => void;
    public onFlowCancel? : () => void ;


    @AutoBind
    clone(step: BaseFlowStep) : BaseFlowStep {
        let type = step.name!;
        let registeredControl = Object.values(FlowStepRegistration).filter((v: RegistrationData) => {
            return Reflect.get(v.prototype, '__type') === type;
        })[0];
        let val = new registeredControl!.prototype.constructor();

        return Object.assign(val, step);
    }

    @AutoBind
    onCopy(selectedId?: string) {
        let elem = this._lastSelectionElement;
        if (selectedId) {
            elem = this.flow.find(selectedId) as IFlowElement;
            this.contextControl = null;
        }
        if (!elem) return;

        this.clipboardElement = this.clone(elem as BaseFlowStep) as IFlowElement;

    }

    @AutoBind
    onCut(selectedId?: string) {
        let elem = this._lastSelectionElement;
        if (selectedId) {
            elem = this.flow.find(selectedId) as IFlowElement;
            this.contextControl = null;
        }
        if (!elem) return;

        this.flow.remove(elem as BaseFlowStep);
        this.clipboardElement = this.clone(elem as BaseFlowStep) as IFlowElement;

    }

    @AutoBind
    onDelete(selectedId?: string) {
        let elem = this._lastSelectionElement;
        if (selectedId) {
            elem = this.flow.find(selectedId) as IFlowElement;
            this.contextControl = null;
        }
        if (!elem) return;

        this.flow.remove(elem as BaseFlowStep);
    };

    @AutoBind
    onPaste() {
        if (!this.clipboardElement || !this.selectionElement) return;
        this.clipboardElement._id = DataUtilities.generateUniqueId();
        for (let s of this.flow.sequences) {
            let idx = s.steps.indexOf(this.selectionElement as BaseFlowStep);
            if (idx >= 0) {
                this.flow.add(this.clone(this.clipboardElement as BaseFlowStep), s._id, idx);
                break;
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
            control = this.props.flow.find(result.draggableId);
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
                let length = this.props.flow.sequences.length - 1;
                initialSeq.x = this.props.flow.sequences[length].x + 300;
                initialSeq.y = this.props.flow.sequences[length].y;
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
			properties={['flowTitle', 'clipboard']}
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
							disabled={isActionDisabled()}
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

        </DesignPanel>
    );
}



