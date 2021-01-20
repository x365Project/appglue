import {AutoBind} from "./AutoBind";

export class Scheduler {
    static schedulers : {[name: string] : SchedulerWorker} = {};

    static getScheduler(name: string, millseconds: number = 10) {
        let scheduler = this.schedulers[name];

        if (!scheduler) {
            scheduler = new SchedulerWorker(millseconds);
            this.schedulers[name] = scheduler;
        }

        return scheduler;
    }
}

export class SchedulerWorker {
    private millisconds: number;
    private preItems : {[name: string]  : {callFunction: Function, waitFunction?: () => boolean}};
    private items : {[name: string]     : {callFunction: Function, waitFunction?: () => boolean}};
    private postItems : {[name: string] : {callFunction: Function, waitFunction?: () => boolean}};
    private paused : boolean = false;

    constructor(millisconds: number) {
        this.millisconds = millisconds;
        this.preItems = {};
        this.items = {};
        this.postItems = {};
    }

    addToPreSchedule(name: string, operation: Function, waitFor?: () => boolean) : void {
        this.preItems[name] = {callFunction: operation, waitFunction: waitFor };

        if (!this.paused) {
            setTimeout(this.processItems.bind(this), this.millisconds);
            this.paused = true;
        }
    }

    addToSchedule(name: string, operation: Function, waitFor?: () => boolean) : void {
        this.items[name] = {callFunction: operation, waitFunction: waitFor };

        if (!this.paused) {
            setTimeout(this.processItems.bind(this), this.millisconds);
            this.paused = true;
        }
    }


    addToPostSchedule(name: string, operation: Function, waitFor?: () => boolean) : void {
        this.postItems[name] = {callFunction: operation, waitFunction: waitFor };

        if (!this.paused) {
            setTimeout(this.processItems.bind(this), this.millisconds);
            this.paused = true;
        }
    }

    private processItems() {
        let requeue = false;

        for (let item in this.preItems) {
            let i = this.preItems[item];
            if (i.waitFunction) {
                if (i.waitFunction()) {
                    requeue = true;
                    continue;
                }
            }
            this.preItems[item].callFunction();

            delete this.preItems[item];
        }

        for (let item in this.items) {
            let i = this.items[item];
            if (i.waitFunction) {
                if (i.waitFunction()) {
                    requeue = true;
                    continue;
                }
            }

            i.callFunction();

            delete this.items[item];
        }

        for (let item in this.postItems) {
            let i = this.postItems[item];
            if (i.waitFunction) {
                if (i.waitFunction()) {
                    requeue = true;
                    continue;
                }
            }

            this.postItems[item].callFunction();

            delete this.postItems[item];
        }

        if (requeue) {
            setTimeout(this.processItems.bind(this), this.millisconds);
        } else {
            this.paused = false;
        }

    }
}