import React from "react";

// this is an interface used by designers to allow additional pages to be set on designer.

export interface IAction {
    name : string;
    icon? : JSX.Element;
    desiredWidth?: number;
    designedHeight?: number;
    onClose?: () => {};

    renderUI(): JSX.Element | null;
}