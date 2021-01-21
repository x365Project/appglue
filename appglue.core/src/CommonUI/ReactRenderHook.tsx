import React from "react";
import {Scheduler} from "../Common/Scheduler";
import {WeakList} from "../Common/WeakList";

// this is a small class that is inserted into the rendering cycle so that we can see when mounting and updating happen.
// a reference to
// after callback is made, it unregistrs.
export class ReactRenderHook extends React.Component {
    static callbacks : {[callbackName: string] : Function}[] = [];
    static instance : WeakList<ReactRenderHook> = new WeakList<ReactRenderHook>() ;
    private static waitingForRender = false;

    static registerCallback(name: string, callback: Function) {
        this.waitingForRender = true;

        for (let i of this.instance.entries()) {
            try {
                i.forceUpdate();
            } catch {
                console.log('error in force update')
            }
        }

        Scheduler.getScheduler('react-render-callback', 30).addToSchedule(name, callback, false, () => {
            return ReactRenderHook.waitingForRender === true;
        });

        Scheduler.getScheduler('react-render-callback', 30).addToPostSchedule(name, callback, false, () => {
            return ReactRenderHook.waitingForRender === true;
        });
    }


    constructor() {
        super({});
        ReactRenderHook.instance.push(this);
        // release anyone waiting on prior render
        ReactRenderHook.waitingForRender = false;
    }

    componentDidMount() {
        ReactRenderHook.waitingForRender = false;
    }

    componentWillUpdate(nextProps: Readonly<{}>, nextState: Readonly<{}>, nextContext: any) {
        ReactRenderHook.waitingForRender = false;
    }


    render() {
        return <></>;
    }
}