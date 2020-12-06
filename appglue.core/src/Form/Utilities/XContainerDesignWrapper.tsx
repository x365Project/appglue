import React from "react";
import {XBaseContainer} from "../Containers/XBaseContainer";
import {FormDesignConstants, FormMode} from "../FormDesignConstants";
import {Draggable, DraggableProvided} from "react-beautiful-dnd";
import {OverlapDiv} from "../Containers/XBaseStackContainer";
import {XDraggableData} from "./XDesignWrapper";

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