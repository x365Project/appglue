import {RegisterFlowStep} from "../Utilities/RegisterFlowStep";
import {TextIcon} from "../../CommonUI/TextIcon";
import {BaseFlowStep} from "./BaseFlowStep";
import React from "react";
import {PropertyEditorTextList} from "../../CommonUI/PropertyEditing/PropertyEditorTextList";
import {FlowStepOutput} from "../Structure/FlowStepOutput";
import { ObserveState } from "../../CommonUI/StateManagement/ObserveState";

@RegisterFlowStep('Utilities', 'Multi', <TextIcon name={'2x'}/>)
export class MultiOutputTestStep extends BaseFlowStep {
    paths : string[] = ['default', 'a', 'b'];

    getOutcomes(): FlowStepOutput[] | undefined{
        return this.paths.map(value => {
            return new FlowStepOutput(value);
        });
    }

    renderEditUI(): JSX.Element | null {
        return (
            <ObserveState
                listenTo={this}
                control={() => <PropertyEditorTextList editObject={this} propertyName={'paths'} updateCallback={this.stepUpdate} />}
            />
        );
    }

}