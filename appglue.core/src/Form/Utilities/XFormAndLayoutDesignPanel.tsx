import React from "react";
import styled from "styled-components";
import ReactDraggable from 'react-draggable';
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
    EditLayerStyledAccordion
} from "../../CommonUI/CommonStyles";
import {FormDesignConstants, FormMode} from "../FormDesignConstants";
import {FormEditContext} from "./FormEditContext";
import { ExpandIcon } from "../../CommonUI/Icon/ExpandIcon";
import { ValidationErrorRendering } from "../Components/ValidationErrorRendering";

export const CONFIG_FORM_KEY: string = 'configForm';

const Designer = styled.div`
  display: flex;
  width: 100%;
  overflow: hidden;
  position: relative;
`;


interface IDesignPanelProperties {
    editContext: FormEditContext;
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

    render() {

        let editUIComponent: JSX.Element | null = null;
        let selectedControl: XBaseControl | null = null;
        if (this.props.editContext?.selectedId) {
            selectedControl = this.props.editContext.form.find(this.props.editContext?.selectedId);
            if (selectedControl) {
                editUIComponent = selectedControl.renderEditUI();
            } else if (this.props.editContext?.selectedId === CONFIG_FORM_KEY) {
                editUIComponent = this.props.editContext.form.renderEditUI()
            }
        }

        return (
            <DragDropContext
                onDragStart={this.onDragStart}
                onDragEnd={this.onDragEnd}
            >
                <Designer key='formdesigner'>
                    <DesignerToolBox
                        mode={this.props.editContext.mode}
                        updateCallback={this.updateUI}
                        onSelectFormDefaultConfig={() => {
                            if (this.props.editContext)
                                this.props.editContext.selectedId = CONFIG_FORM_KEY;
                            this.updateUI();
                        }}
                    />
                    <XFormDesignerLayoutPanel editContext={this.props.editContext}  />
                    {
                        editUIComponent && (
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
                                            </EditLayerStyledTypography>
                                        </EditLayerStyledAccordionSummary>
                                        <EditLayerStyledAccordionDetails classes={{root: 'config-form-content'}}>
                                            {editUIComponent}
                                        </EditLayerStyledAccordionDetails>
                                    </EditLayerStyledAccordion>
                                </EditLayerConfigArea>
                            </ReactDraggable>
                        )
                    }
                    {
                        this.props.editContext.mode === FormMode.FormDesign && 
                        <ValidationErrorRendering validations={this.props.editContext?.designIssues.getAllIssues() ?? []} />
                    }
                </Designer>
            </DragDropContext>
        );

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
                this.props.editContext.selectedId = control.id;
            this.updateUI();
        } else {
            if (this.props.editContext)
                this.props.editContext.selectedId = null;
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
            control.setFormEditContext(this.props.editContext);

        if (result.destination.droppableId === FormDesignConstants.LAYOUT_FORM_KEY_NAME) {
            // we are moving things around or adjusting base form

            if (control) {
                if (result.destination.droppableId === result.source.droppableId) {
                    // changing order
                    this.props.editContext.form.setOrder(control.id, result.destination.index)
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

        if (control) {
            if (this.props.editContext)
                this.props.editContext.selectedId = control.id;
        }
        // this.dragPlaceholder = null;
        this.updateUI();
    }


    @AutoBind
    updateUI (): void {
        this.props.editContext?.refreshDesigner();
    }

}