import React from "react";
import {ElementFactory} from "./ElementFactory";
import {ObserveState} from "./StateManagement/ObserveState";

// this is the class for any component that wants to present an edit experience.
export interface IEditable {
    renderEditUI(): JSX.Element | null;
}

export class EditableUtilities {
    static getEditor(target: IEditable | undefined) : ElementFactory<any>
    {

        if (target?.renderEditUI) {
            return new ElementFactory(
                target?.renderEditUI.bind(target), {}
            );
        }

        return new ElementFactory(
            this.renderEmpty.bind(target), {}
        );

        // return new ElementFactory(
        //
        //     this.getRenderEditUIComponent.bind(target,target), {});

    }

    private static renderEmpty() {
        return <></>
    }
    // adds observer
    private static getRenderEditUIComponent(target: IEditable | undefined) : JSX.Element {

        if (target) {
            let renderUI = target.renderEditUI();

            if (renderUI) {
                return (
                    <ObserveState listenTo={target} control={() => {return renderUI}}/>
                );
            }
        }

        return <></>;

    }

}