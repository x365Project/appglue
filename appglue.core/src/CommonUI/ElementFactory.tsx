import React from "react";

export class ElementFactory<P extends {}> {
    component: React.FunctionComponent<P>;
    props: P;


    constructor(component: React.FunctionComponent<P>, props: P) {
        this.component = component;
        this.props = props;
    }

    create() {
        return React.createElement(this.component, this.props);
    }
}