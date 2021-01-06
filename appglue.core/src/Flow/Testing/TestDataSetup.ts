import {XFlowConfiguration} from "../Structure/XFlowConfiguration";
import {FormStep} from "../Steps/FormStep";
import {LogStep} from "../Steps/LogStep";
import {MultiOutputTestStep} from "../Steps/MultiOutputTestStep";

export function getFlowWithSteps() : XFlowConfiguration {
    let flow = new XFlowConfiguration();
    flow.sequences[0].addStep(new FormStep());
    flow.sequences[0].addStep(new MultiOutputTestStep());
    flow.sequences[0].addStep(new LogStep());
    return flow;
}

export function getFlowWithNoSteps() : XFlowConfiguration {
    let flow = new XFlowConfiguration();
    return flow;
}