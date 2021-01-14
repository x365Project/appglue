import React from "react";
import styled from "styled-components";
import ReactDraggable from 'react-draggable';
import {
    Button,
    DialogTitle,
    DialogContentText,
    DialogContent,
    DialogActions,
    Dialog,
    Menu,
    MenuItem,
    IconButton
} from "@material-ui/core";


import {UIControlRegistration} from "./RegisterUIControl";
import {
    DragDropContext,
    DropResult,
    DragStart
} from "react-beautiful-dnd";
import {XBaseContainer} from "../Containers/XBaseContainer";
import {XBaseControl} from "../Controls/XBaseControl";
import {XFormDesignerLayoutPanel} from "./XFormDesignerLayoutPanel";
import { DesignerToolBox } from "../Components/DesignerToolbox";
import { AutoBind } from "../../Common/AutoBind";


import './XFormAndLayoutDesignPanel.css'
import {
    EditLayerStyledAccordionDetails,
    EditLayerStyledAccordionSummary,
    EditLayerStyledTypography,
    EditLayerConfigArea, 
    EditLayerStyledAccordion,
    EditLayerCloseButton,
    ContextMenuForControl
} from "../../CommonUI/CommonStyles";


import {FormDesignConstants, FormMode} from "../FormDesignConstants";
import { ExpandIcon } from "../../CommonUI/Icon/ExpandIcon";
import { CloseIcon} from "../../CommonUI/Icon/CloseIcon";
import { CopyWhiteIcon } from "../../CommonUI/Icon/CopyWhiteIcon";
import { CutWhiteIcon } from "../../CommonUI/Icon/CutWhiteIcon";
import { DeleteWhiteIcon } from "../../CommonUI/Icon/DeleteWhiteIcon";
import { ValidationErrorRendering } from "../Components/ValidationErrorRendering";
import {ObserveState} from "../../CommonUI/StateManagement/ObserveState";
import {ElementFactory} from "../../CommonUI/ElementFactory";
import {StateManager} from "../../CommonUI/StateManagement/StateManager";
import {FormContext} from "./FormContext";

export const CONFIG_FORM_KEY: string = 'configForm';

const Designer = styled.div`
  display: flex;
  width: 100%; 
  overflow: hidden;
  position: relative;
`;


interface IDesignPanelProperties {
    editContext: FormContext;
}


export class XFormAndLayoutDesignPanel extends React.Component<IDesignPanelProperties, any> {
    configFormNode: React.RefObject<HTMLDivElement> = React.createRef<HTMLDivElement>();

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    handleClickOutside = (event: MouseEvent): void => {
        if (
            this.configFormNode.current && 
            event.target instanceof Node && 
            !this.configFormNode.current.contains(event.target) && 
            this.props.editContext?.expandedConfigPanel &&
            document.getElementsByClassName('MuiDialog-root').length === 0 &&
            document.getElementsByClassName('MuiPopover-paper').length === 0
        ) {
            this.props.editContext?.unSelectControl();
        }
    }

    onToggleExpandedConfigPanel = () => {
        if (!this.props.editContext?.isMovingConfigPanel) {
            if (this.props.editContext)
                this.props.editContext.expandedConfigPanel = !this.props.editContext?.expandedConfigPanel;
            this.forceUpdate();
        }
    }

    onDragMovingConfigPanel = () => {
        if (this.props.editContext)
            this.props.editContext.isMovingConfigPanel = true;
    }

    onEndMovingConfigPanel = () => {
        setTimeout(() => {
            if (this.props.editContext)
                this.props.editContext.isMovingConfigPanel = false;
            this.forceUpdate();
        }, 500);
    }

    deleteControl = () => {
        if (this.props.editContext.deleteControl) {
            this.props.editContext.form.remove(this.props.editContext.deleteControl);
            this.props.editContext.deleteControl = null;
            this.forceUpdate();
        }
    }

    cancelDeleteControl = () => {
        this.props.editContext.deleteControl = null;
        this.forceUpdate();
    }

    render() {


        return (
            <ObserveState
                listenTo={this.props.editContext}
                control={() => {
                    return (
                        <DragDropContext
                            onDragStart={this.onDragStart}
                            onDragEnd={this.onDragEnd}
                        >
                            <Designer key='formdesigner'>
                                <DesignerToolBox
                                    mode={this.props.editContext.mode}
                                    onSelectFormDefaultConfig={() => {
                                        if (this.props.editContext)
                                            this.props.editContext.selectControl(CONFIG_FORM_KEY);
                                    }}
                                />
                                <XFormDesignerLayoutPanel editContext={this.props.editContext}  />
                                {
                                    this.renderEditUI()
                                }
                                {
                                    this.props.editContext.mode === FormMode.FormDesign &&
                                    <ValidationErrorRendering validations={this.props.editContext?.controlContexts.getAllDesignIssues() ?? []} />
                                }
                                <Dialog open={!!this.props.editContext.deleteControl}>
                                    <DialogTitle>Warning</DialogTitle>
                                    <DialogContent>
                                        <DialogContentText>Are you sure to delete this?</DialogContentText>
                                    </DialogContent>
                                    <DialogActions>
                                        <Button variant="contained" color="primary" onClick={this.deleteControl}>OK</Button><Button variant="contained" onClick={this.cancelDeleteControl}>Cancel</Button>
                                    </DialogActions>
                                </Dialog>
                                {
                                    this.renderContextMenuUI()
                                }
                            </Designer>
                        </DragDropContext>
                    );
                }}
            />

        );

    }

    renderEditUI() {
        let editUIComponent = this.props.editContext.getEditUI();
        let selectedControl: XBaseControl | null = null;
        let selectedId = this.props.editContext?.getSelectedId();

        if (selectedId) {
            selectedControl = this.props.editContext.form.find(selectedId);
        }

        if (!editUIComponent) {

        } else {
            return (
                <ReactDraggable
                    bounds="parent"
                    onDrag={this.onDragMovingConfigPanel}
                    onStop={this.onEndMovingConfigPanel}
                    handle=".config-form-header"
                    nodeRef={this.configFormNode}
                >
                    <EditLayerConfigArea ref={this.configFormNode}>
                        <EditLayerStyledAccordion
                            expanded={this.props.editContext?.expandedConfigPanel}
                            onChange={this.onToggleExpandedConfigPanel}
                            defaultExpanded
                        >
                            <EditLayerStyledAccordionSummary expandIcon={<ExpandIcon />}>
                                <EditLayerStyledTypography variant="subtitle1" classes={{root: 'config-form-header'}}>
                                    Edit: {selectedControl?.toString() || 'Form Config'}
                                    <EditLayerCloseButton onClick={() => this.props.editContext.unSelectControl()}>
                                        <CloseIcon />
                                    </EditLayerCloseButton>
                                </EditLayerStyledTypography>
                            </EditLayerStyledAccordionSummary>
                            <EditLayerStyledAccordionDetails classes={{root: 'config-form-content'}}>
                                <ObserveState
                                    listenTo={selectedControl}
                                    control={() => {
                                        return (
                                            editUIComponent?.create()
                                        );
                                    }}
                                />
                            </EditLayerStyledAccordionDetails>
                        </EditLayerStyledAccordion>
                    </EditLayerConfigArea>
                </ReactDraggable>

            );
        }
    }

    renderContextMenuUI() {
        let contextControl = this.props.editContext.contextControl;
        if (contextControl) {
            return <ContextMenuForControl
                open={!!contextControl}
                onClose={this.props.editContext.unselectContextControl}
                anchorReference="anchorPosition"
                anchorPosition={
                contextControl.mouseY !== null && contextControl.mouseX !== null
                    ? { top: contextControl.mouseY, left: contextControl.mouseX }
                    : undefined
                }
            >
                <MenuItem onClick={() => this.props.editContext.onCopy(contextControl!.selectedId)} data-testid="btn-context-copy">
                    <CopyWhiteIcon/> Copy
                </MenuItem>
                <MenuItem onClick={() => this.props.editContext.onCut(contextControl!.selectedId)} data-testid="btn-context-cut">
                    <CutWhiteIcon/> Cut
                </MenuItem>
                <MenuItem onClick={() => this.props.editContext.onDelete(contextControl!.selectedId)} data-testid="btn-context-paste">
                    <DeleteWhiteIcon /> Delete
                </MenuItem>
            </ContextMenuForControl>
        }
    }

    @AutoBind
    onDragStart(result: DragStart) {
        let control : XBaseControl | null;
        if (Object.keys(UIControlRegistration).indexOf(result.draggableId) !== -1) {
            // @ts-ignore
            let registeredControl = UIControlRegistration[result.draggableId];
            let val = new registeredControl.prototype.constructor();
            // @ts-ignore
            control = val as XBaseControl;

        } else {
            control = this.props.editContext.form.find(result.draggableId);
        }

        if (control) {
            if (this.props.editContext)
                this.props.editContext.selectControl(control.id);
            this.updateUI();
        } else {
            if (this.props.editContext)
                this.props.editContext.unSelectControl();
            this.updateUI();
        }
    }

    @AutoBind
    onDragEnd(result : DropResult) {
        // if not destination... then we should not do anything
        if (!result.destination)
            return;


        let control : XBaseControl | null;
        if (Object.keys(UIControlRegistration).indexOf(result.draggableId) !== -1) {
            // @ts-ignore
            let registeredControl = UIControlRegistration[result.draggableId];
            let val = new registeredControl.prototype.constructor();
            // @ts-ignore
            control = val as XBaseControl;

        } else {
            control = this.props.editContext.form.find(result.draggableId);
        }

        if (control)
            control.setFormContext(this.props.editContext);

        if (result.destination.droppableId === FormDesignConstants.LAYOUT_FORM_KEY_NAME) {
            // we are moving things around or adjusting base form

            if (control) {
                if (result.destination.droppableId === result.source.droppableId) {
                    // changing order
                    this.props.editContext.form.setOrder(control.id, result.destination.index);
                } else {
                    // adding new
                    this.props.editContext.form.add(control as XBaseContainer);
                    this.props.editContext.form.setOrder(control.id, result.destination.index);
                }
            }

        } else {

            let fromContainer = this.props.editContext.form.find(result.source.droppableId) as XBaseContainer;
            let toContainer = this.props.editContext.form.find(result.destination!.droppableId) as XBaseContainer;

            if (!toContainer || !control) {
                console.log("something not found");
                console.log(result.draggableId);
                return;
                //            throw 'something could not be found';
            }

            if (fromContainer && fromContainer.id === toContainer.id) {
                // its same container move
                toContainer.setOrder(control.id, result.destination.index)
            } else {
                if (fromContainer)
                    fromContainer.remove(control);
                toContainer.add(control, result.destination.index);
            }
        }

        if (control && this.props.editContext) {
            console.log(control);
            this.props.editContext.selectControl(control.id);
        }
        // this.dragPlaceholder = null;
        this.updateUI();
    }


    @AutoBind
    updateUI (): void {
        this.props.editContext?.refreshDesigner();
    }

}