import React from "react";
import {AutoBind} from "../../Common/AutoBind";
import {generateUniqueId} from "../../Common/DataUtilities";
import {StateManager} from "./StateManager";

/**
 <ObserveState
 listenTo={anobject}
 control={() => {
        return (

        );
    }}
 />


 **/

export class ObserveState extends React.Component<{ listenTo: object | null | undefined, control: () => JSX.Element | React.ReactNode }> {


    constructor(props: { listenTo: object | null | undefined; control: () => JSX.Element }) {
        super(props);
    }

    render() {
        return (
            this.props.control()
        );
    }

    componentDidMount() {
        if (this.props.listenTo)
            StateManager.addObserver(this.props.listenTo, this);
    }

    componentWillUnmount() {
        if (this.props.listenTo)
            StateManager.removeObserver(this.props.listenTo, this);
    }

    @AutoBind
    update() {
        this.setState({key: generateUniqueId()})
        this.forceUpdate();
    }
}