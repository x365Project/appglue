import React from "react";
import {AutoBind} from "../../Common/AutoBind";
import {StateManager} from "./StateManager";
import {DataUtilities} from "../../Common/DataUtilities";

/**
 <ObserveState
 listenTo={anobject}
 control={() => {
        return (

        );
    }}
 />


 **/

export class ObserveState extends React.Component<{ listenTo: object | null | undefined, control: () => JSX.Element | React.ReactNode, properties?: string[], onWillUnmount?: () => void }> {

    render() {
        return (
            this.props.control()
        );
    }

    componentDidMount() {
        if (this.props.listenTo)
            StateManager.addObserver(this.props.listenTo, this, this.props.properties || []);
    }

    componentWillUnmount() {
        if (this.props.listenTo)
            StateManager.removeObserver(this.props.listenTo, this);

        if (this.props.onWillUnmount) {
            this.props.onWillUnmount();
        }
    }

    @AutoBind
    update() {
        this.setState({key: DataUtilities.generateUniqueId()})
        this.forceUpdate();
    }
}