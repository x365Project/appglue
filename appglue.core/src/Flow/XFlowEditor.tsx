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
import {FlowSequenceStack} from "./DesignerUI/FlowSequenceStack";
import ReactDraggable from "react-draggable";
import {Accordion} from "@material-ui/core";
import {
    EditLayerConfigArea,
    EditLayerStyledAccordionDetails,
    EditLayerStyledAccordionSummary, EditLayerStyledTypography
} from "../CommonUI/CommonStyles";
import {BaseFlowStep} from "./Steps/BaseFlowStep";
import {FlowStepSequence} from "./Structure/FlowStepSequence";
import {IFlowElement} from "./Structure/IFlowElement";
import {ExpandIcon} from "../CommonUI/Icon/ExpandIcon";

export interface FlowEditorParameters {
    flow : XFlowConfiguration;

}

const FlowEditorDiv = styled.div`
    width: 100%;
    height: 100%;
`;

export class FlowConstants {
    static ToolboxId = 'Toolbox'
}

const FlowMainSectionDiv = styled.div`
    width: 100%;
    display: flex;
    flexDirection: column;
    height: 100vh;
    float: left;
`;

export class FlowEditContext {
    flowEditor: XFlowEditor;

    constructor(flowEditor: XFlowEditor) {
        this.flowEditor = flowEditor;
    }

    get flow(): XFlowConfiguration {
        return this.flowEditor.flow;
    }

    private _selectionElement?: IFlowElement;

    get selection(): string | undefined {
        return this._selectionElement?._id;
    }

    get selectionElement(): IFlowElement | undefined {
        return this._selectionElement;
    }

    setSelection(selection: IFlowElement) {
        this._selectionElement = selection;
        this.refresh()
    }

    clearSelection() {
        this._selectionElement = undefined;
        this.refresh()
    }

    refresh() {
        this.flowEditor.forceUpdate();
    }
}

export class XFlowEditor extends React.Component<FlowEditorParameters, {}> {


    editContext : FlowEditContext = new FlowEditContext(this);

    get flow(): XFlowConfiguration {
        return this.props.flow;
    }

    render() {
        return (
            <DragDropContext onDragEnd={this.onDragEnd}>
                <FlowEditorDiv>
                    <FlowTopBar/>
                    <FlowMainSectionDiv>
                        <FlowSideActions/>
                        <FlowToolbox/>
                        <FlowDesignPage flow={this.props.flow} editContext={this.editContext}/>
                    </FlowMainSectionDiv>
                </FlowEditorDiv>
            </DragDropContext>
        );
    }

    @AutoBind
    onDragEnd(result: DropResult) {
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
            } else if (isNew) {
                // adding new
                this.props.flow.add(control, result.destination.droppableId, result.destination.index);
            } else {
                this.props.flow.moveToSequence(control, result.source.droppableId, result.destination.droppableId, result.destination.index)
            }
        }

        if (control)
            this.editContext.setSelection(control);
        else
            this.editContext.clearSelection();

    }
}

const TopBarDiv = styled.div`
    width: 100%;
    height: 88px;
    border: 1px solid gray;
`;

export const FlowTopBar = function (props :{}) {
    return (
       <TopBarDiv>

       </TopBarDiv>
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
                                index={index}>
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



    return (
        <DesignPanel>
            {props.flow.sequences.filter((value:FlowStepSequence) => {
                return value.x != -1;
            }).map((s: FlowStepSequence, i: number) => {
                return <FlowSequenceStack key={s._id} flow={props.flow} sequence={s}  editContext={props.editContext} />
            })}

            {
                editUIComponent && (
                    <ReactDraggable
//                        bounds="parent"
                        onDrag={onDragMovingConfigPanel}
                        onStop={onEndMovingConfigPanel}
                        handle=".config-form-header"
                        //nodeRef={this.configFormNode}
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

        </DesignPanel>
    );
}



