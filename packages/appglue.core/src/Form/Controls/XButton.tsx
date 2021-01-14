import React from "react";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import {RegisterUIControl, ControlType} from "../Utilities/RegisterUIControl";
import {XBaseControl} from "./XBaseControl";
import {ValidationIssue} from "../../Common/IDesignValidationProvider";
import { ButtonIcon } from "../../CommonUI/Icon/ButtonIcon";


@RegisterUIControl('Action', 'Button', ControlType.Control, <ButtonIcon />)
export class XButton extends XBaseControl {
    label: string = 'test';
    isCancelButton: boolean = false;

    render() {
        return (
            <Button
                variant="contained"
                onClick={() => {
                    if (this.isCancelButton) {
                        this.getFormContext()?.cancelOutcomeTriggered(this.label)
                    } else {
                        this.getFormContext()?.outcomeTriggered(this.label)
                    }
                }}
            >
                {this.label}
            </Button>
        );

    }

    renderEditUI(): JSX.Element | null {
        return <XButtonEditUI editMe={this} />;
    }

    getDesignValidationIssues(): ValidationIssue[] {
        return [];
    }

    getRuntimeValidationIssues(): ValidationIssue[] {
        return [];
    }

}

class XButtonEditUI extends React.Component<{editMe: XButton}> {

    render() {
        return (
            <>
                <TextField label="Label Text"
                    value={this.props.editMe.label}
                    onChange={event => {
                        this.props.editMe.label = event.target.value;
                        this.props.editMe.controlUpdate();
                    }}
                />
            </>
        );
    }
}