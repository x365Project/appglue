import React from "react";
import {StepNameLabel} from "../CommonUI/StepNameLabel";
import styled from "styled-components";
import {IFlowElement} from "../Structure/IFlowElement";
import {IFlowStep} from "../Structure/IFlowStep";
import {DataUtilities} from "../../Common/DataUtilities";
import {FlowStepOutputInstructions} from "../Structure/FlowStepOutputInstructions";
import {AutoBind} from "../../Common/AutoBind";
import {StateManager} from "../../CommonUI/StateManagement/StateManager";
import {FlowStepSequence} from "../Structure/FlowStepSequence";
import { FlowStepOutput } from "../Structure/FlowStepOutput";

export const BasicStep = styled.div`
    width: 100%;
    padding-left: 7px;
    padding-right: 7px;
    padding-top: 3px;
    padding-bottom: 3px;
`;

export abstract class BaseFlowStep
    extends React.Component
    implements IFlowElement,
        IFlowStep {

    _id: string = DataUtilities.generateUniqueId();
    name?: string;
    sequence? : FlowStepSequence;

    // this is where we put instructions on what to do with non default paths
    private _nonDefaultOutputInstructions : {[path: string] :  FlowStepOutputInstructions} = {};


    constructor() {
        super({}, {});

        this.name = Reflect.get(this, '__type');
    }

    @AutoBind
    stepUpdate () : void {
        StateManager.changed(this);
        if (this.sequence)
            StateManager.propertyChanged(this.sequence, 'steps');
    }

    // forces refresh of entire designer (expensive)
    @AutoBind
    designerUpdate () : void {
//        this.getFormContext()?.refreshDesigner();
    }


    getOutcomeInstructions(): FlowStepOutputInstructions[] {
        let inst : FlowStepOutputInstructions[] = [];

        let paths = this.getOutcomes();
        if (paths) {
            for (let p of paths) {
                inst.push(this.findOutputInstruction(p.name));
            }
        }

        return inst;
    }

    render() {

        return (
            <BasicStep>
                <StepNameLabel step={this}/>
            </BasicStep>
        );
    }

    findOutputInstruction(name: string): FlowStepOutputInstructions {
        let inst : FlowStepOutputInstructions | null  = this._nonDefaultOutputInstructions[name] ?? null;

        if (!inst) {
            inst = new FlowStepOutputInstructions(name);
            this._nonDefaultOutputInstructions[name] = inst;
        }

        return inst;
    }


    abstract renderEditUI(): JSX.Element | null ;


    getOutcomes(): FlowStepOutput[] | undefined {
        return;
    }


}