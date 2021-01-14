import React, {ReactNode} from "react";
import {DataUtilities} from "../../Common/DataUtilities";
import {StateManager} from "./StateManager";

/**

 <ObserveMultiStateProperties
     listeners=[
         {listenTo: anobject, propertyName: 'propName' },
         {listenTo: anotherobject, propertyName: 'propName' }
     ],
     control={() => {
            return (

            );
        }}
 />
 **/

export class ObserveMultiStateProperties extends React.Component<{
    listeners:
        {
            listenTo: (object | null | undefined),
            propertyName: string
        }[],
    control: () => JSX.Element | ReactNode
}> {

    render() {
        return (
            <React.Fragment key={DataUtilities.generateUniqueId()}>
                {this.props.control()}
            </React.Fragment>
        );
    }

    componentDidMount() {
        if (this.props.listeners) {
            for (let l of this.props.listeners) {
                if (l.listenTo)
                    StateManager.addObserver(l.listenTo, this, [l.propertyName]);
            }
        }
    }

    componentWillUnmount() {
        if (this.props.listeners) {
            for (let l of this.props.listeners) {
                if (l.listenTo)
                    StateManager.removeObserver(l.listenTo, this);
            }
        }
    }

}