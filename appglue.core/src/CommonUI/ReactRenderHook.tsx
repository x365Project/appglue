import React from "react";
import {Scheduler} from "../Common/Scheduler";
import {DataUtilities} from "../Common/DataUtilities";

// this is a small class that is inserted into the rendering cycle so that we can see when mounting and updating happen.
// after callback is made, it unregistrs.
export class ReactRenderHook extends React.Component<{name?: string}> {
    static callbacks : {[callbackName: string] : Function}[] = [];
    static hooks : {[id: string] : ReactRenderHook | undefined} = {} ;
    private static waitingForRender = false;

    hookIsMounted : boolean = false;
    readonly id: string = DataUtilities.generateUniqueId();

    static registerCallback(name: string, callback: Function) {
        this.waitingForRender = true;

        let needsCleanup = false;

        // we force update on all the render hooks.  When this is done, it will allow us to know when we re render.
        for (let i of Object.values(this.hooks)) {
            try {
                if (!i)
                    needsCleanup = true;

                if (i && i.hookIsMounted)
                    i.forceUpdate();
            } catch (e) {
                console.log('error in force update', e);
            }
        }

        // rebuild hook list to get rid of undefined.
        if (needsCleanup) {
            let values = this.hooks;

            this.hooks = {};

            for (let key in values) {
                let val = values[key];

                if (val)
                    this.hooks[key] = val;
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
    }

    componentDidMount() {
        ReactRenderHook.hooks[this.id] = this;
        ReactRenderHook.waitingForRender = false;
        this.hookIsMounted = true;
    }

    componentDidUpdate(prevProps: Readonly<{}>, prevState: Readonly<{}>, snapshot?: any) {
        ReactRenderHook.hooks[this.id] = this;
        ReactRenderHook.waitingForRender = false;
        this.hookIsMounted = true;
    }

    componentWillUnmount() {
        // making this undefined registers it for cleanup.
        ReactRenderHook.hooks[this.id] = undefined;
        this.hookIsMounted = false;
    }

    render() {
        return <></>;
    }
}