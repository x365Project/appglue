import {AutoBind} from "./AutoBind";

export class Scheduler {
    static schedulers : {[name: string] : SchedulerWorker} = {};

    static getScheduler(name: string, millseconds: number = 10) {
        let scheduler = this.schedulers[name];

        if (!scheduler) {
            scheduler = new SchedulerWorker(millseconds);
            this.schedulers[name] = scheduler;
        }

        // if its not already running, reset the time
        if (!scheduler.running)
            scheduler.millisconds = millseconds;

        return scheduler;
    }
}

class ScheduleItem {
    callFunction: Function;
    waitFunction?: () => boolean;
    requeue: boolean;


    constructor(callFunction: Function, requeue: boolean, waitFunction?: () => boolean) {
        this.callFunction = callFunction;
        this.waitFunction = waitFunction;
        this.requeue = requeue;
    }
}

export class SchedulerWorker {
    millisconds: number;
    private preItems : {[name: string]  : ScheduleItem};
    private items : {[name: string]     : ScheduleItem};
    private postItems : {[name: string] : ScheduleItem};
    running : boolean = false;

    constructor(millisconds: number) {
        this.millisconds = millisconds;
        this.preItems = {};
        this.items = {};
        this.postItems = {};
    }

    addToPreSchedule(name: string, operation: Function, requeueError: boolean = false, waitFor?: () => boolean) : void {
        this.preItems[name] = new ScheduleItem(operation, requeueError, waitFor);

        if (!this.running) {
            setTimeout(this.processItems.bind(this), this.millisconds);
            this.running = true;
        }
    }

    addToSchedule(name: string, operation: Function, requeueError: boolean = false, waitFor?: () => boolean) : void {
        this.items[name] = new ScheduleItem(operation, requeueError, waitFor);

        if (!this.running) {
            setTimeout(this.processItems.bind(this), this.millisconds);
            this.running = true;
        }
    }


    addToPostSchedule(name: string, operation: Function, requeueError: boolean = false, waitFor?: () => boolean) : void {
        this.postItems[name] = new ScheduleItem(operation, requeueError, waitFor);

        if (!this.running) {
            setTimeout(this.processItems.bind(this), this.millisconds);
            this.running = true;
        }
    }

    private processItems() {
        let requeue = false;

        for (let item in this.preItems) {
            if (this.processOneItem(item, this.preItems))
                requeue = true;
        }

        for (let item in this.items) {
            if (this.processOneItem(item, this.items))
                requeue = true;
        }

        for (let item in this.postItems) {
            if (this.processOneItem(item, this.postItems))
                requeue = true;
        }

        if (requeue) {
            setTimeout(this.processItems.bind(this), this.millisconds);
        } else {
            this.running = false;
        }

    }

    private processOneItem(item: string, items: {[name: string]  : ScheduleItem}) : boolean {
        let i = items[item];
        try {
            if (i.waitFunction) {
                if (i.waitFunction()) {
//                    console.log('waiting')
                    return true;
                }
            }
            i.callFunction();
        } catch (e) {
//            console.log('error processing item', e);
            if (!i.requeue) {
                delete this.items[item];
                return false;
            } else {
                return true;
            }

        }

        delete items[item];

        return false;
    }
}