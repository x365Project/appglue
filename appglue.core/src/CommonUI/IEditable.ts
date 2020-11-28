import React from "react";

// this is the class for any component that wants to present an edit experience.
export interface IEditable {
    renderEditUI(): JSX.Element | null;
}