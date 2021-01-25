import React from "react";
import {Scheduler} from "../Common/Scheduler";
import {WeakList} from "../Common/WeakList";

// this is a small class that is inserted into the rendering cycle so that we can see when mounting and updating happen.
// a reference to
// after callback is made, it unregistrs.
export class ReactRenderHook extends React.Component<{name?: string}> {
    static callbacks : {[callbackName: string] : Function}[] = [];
    static hooks : WeakList<ReactRenderHook> = new WeakList<ReactRenderHook>() ;
    private static waitingForRender = false;

    hookIsMounted : boolean = false;

    static registerCallback(name: string, callback: Function) {
        this.waitingForRender = true;

        for (let i of this.hooks.entries()) {
            try {
                if ( i.hookIsMounted)
                    i.forceUpdate();
            } catch (e) {
                console.log('error in force update', e);
            }
        }

        Scheduler.getScheduler('react-render-callback', 30).addToSchedule(name, callback, false, () => {
            return ReactRenderHook.waitingForRender === true;
        });

        Scheduler.getScheduler('react-render-callback', 30).addToPostSchedule(name, callback, false, () => {
            return ReactRenderHook.waitingForRender === true;
        });
    }


    constructor(props : {name?: string}) {
        super(props);
        ReactRenderHook.hooks.push(this);
        // release anyone waiting on prior render
        ReactRenderHook.waitingForRender = false;
    }

    componentDidMount() {
        ReactRenderHook.waitingForRender = false;
        this.hookIsMounted = true;
    }

    componentDidUpdate(prevProps: Readonly<{}>, prevState: Readonly<{}>, snapshot?: any) {
        ReactRenderHook.waitingForRender = false;
        this.hookIsMounted = true;
    }


    componentWillUnmount() {
        this.hookIsMounted = false;
    }

    render() {
        return <></>;
    }
}