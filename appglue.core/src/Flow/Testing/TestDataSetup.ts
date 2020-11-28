import {XFlowConfiguration} from "../Structure/XFlowConfiguration";
import {FormStep} from "../Steps/FormStep";
import {LogStep} from "../Steps/LogStep";
import {MultiOutputTestStep} from "../Steps/MultiOutputTestStep";

export function getFlowWithSteps() : XFlowConfiguration {
    let flow = new XFlowConfiguration();
    flow.sequences[0].steps.push(new FormStep());
    flow.sequences[0].steps.push(new MultiOutputTestStep());
    flow.sequences[0].steps.push(new LogStep());
    return flow;
}

export function getFlowWithNoSteps() : XFlowConfiguration {
    let flow = new XFlowConfiguration();
    return flow;
}