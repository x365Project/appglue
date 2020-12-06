import React, {Ref} from "react";
import {generateUniqueId} from "../../Common/DataUtilities";
import {AutoBind} from "../../Common/AutoBind";

// <RefreshListener
//     listenTo={}
//     control={() => {
//         return (
//
//         );
//     }}
// />

export class RefreshMultiListener extends React.Component<{listenTo: (object | null | undefined)[], control: () => JSX.Element}> {


    constructor(props: { listenTo: (object | null | undefined)[]; control: () => JSX.Element }) {
        super(props);
    }

    render() {
        return (
            <div key={generateUniqueId()}>
                {this.props.control()}
            </div>
        );
    }

    componentDidMount() {
        console.log('mounting')
        if (this.props.listenTo) {
            for (let l of this.props.listenTo) {
                if (l)
                    DataStore.addListener(l, this);
            }
        }
    }

    componentWillUnmount() {
        console.log('un mounting')
        if (this.props.listenTo) {
            for (let l of this.props.listenTo) {
                if (l)
                    DataStore.removeListener(l, this);
            }
        }
    }

}


export class RefreshListener extends React.Component<{listenTo: object | null | undefined, control: () => JSX.Element}> {


    constructor(props: { listenTo: object | null | undefined; control: () => JSX.Element }) {
        super(props);
    }

    render() {
        return (
            this.props.control()
        );
    }

    componentDidMount() {
        console.log('mounting')
        if (this.props.listenTo)
            DataStore.addListener(this.props.listenTo, this);
    }

    componentWillUnmount() {
        console.log('un mounting')
        if (this.props.listenTo)
            DataStore.removeListener(this.props.listenTo, this);
    }

    @AutoBind
    update() {
        console.log('updating')
        this.setState({key : generateUniqueId()})
        this.forceUpdate();
    }
}

class ListenerRegistration {
    listeners: React.Component[] = [];
}

export class DataStore {

    static addListener(store: object, listener: React.Component): void {
        let listeners = Reflect.get(store, '__listeners') as ListenerRegistration;

        if (!listeners) {
            listeners = new ListenerRegistration();
            Reflect.set(store, "__listeners", listeners);
        }

        listeners.listeners.push(listener);
    }

    static removeListener(store: object, listener: React.Component ): void {
        let listeners = Reflect.get(store, '__listeners') as ListenerRegistration;

        if (listeners) {
            if (listeners.listeners.indexOf(listener) !== -1)
                listeners.listeners.splice(listeners.listeners.indexOf(listener), 1);
        }
    }


    static triggerUpdate(store: object) {
        let listeners = Reflect.get(store, '__listeners') as ListenerRegistration;

        if (listeners) {
            for (let l of listeners.listeners) {
             //   console.log('forcing update', l)
                l.forceUpdate();
            }
        }
    }

}

export function runAction(target: object, action : () => {}) {
    // do action
    // trigger update of target
}