import React, {ReactNode} from "react";
import {DataUtilities} from "../../Common/DataUtilities";
import {StateManager} from "./StateManager";

/**

 <ObserveMultiState
 listenTo={[anobject, anobject]}
 control={() => {
        return (

        );
    }}
 />
 **/

export class ObserveMultiState extends React.Component<{ listenTo: (object | null | undefined)[], control: () => JSX.Element | ReactNode, onWillUnmount?: ()=> void }> {


    constructor(props: { listenTo: (object | null | undefined)[]; control: () => JSX.Element }) {
        super(props);
    }

    render() {
        return (
            <React.Fragment key={DataUtilities.generateUniqueId()}>
                {this.props.control()}
            </React.Fragment>
        );
    }

    componentDidMount() {
        if (this.props.listenTo) {
            for (let l of this.props.listenTo) {
                if (l)
                    StateManager.addObserver(l, this);
            }
        }
    }

    componentWillUnmount() {
        if (this.props.listenTo) {
            for (let l of this.props.listenTo) {
                if (l)
                    StateManager.removeObserver(l, this);
            }
        }

        if (this.props.onWillUnmount) {
            this.props.onWillUnmount();
        }
    }

}


