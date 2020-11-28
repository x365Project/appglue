import React from "react";
import TextField from '@material-ui/core/TextField';

import {RegisterUIControl, ControlType} from "../Utilities/RegisterUIControl";
import {BaseTextEntryControl} from "./BaseTextEntryControl";
import {TimePickerIcon} from "../../CommonUI/Icon/TimePickerIcon";


@RegisterUIControl('Data (Entry)', 'Time Picker', ControlType.Control, <TimePickerIcon />)
export class XTimePicker extends BaseTextEntryControl {

    render () {
        return (
            <form noValidate>
                <TextField
                    label={this.label}
                    type="time"
                    value={this.valueName?this.getFormDataValue(this.valueName): String}
                    onChange={this.handleChange}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    data-testid={this.valueName}
                />
            </form>
        );
    }

    private handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if(this.valueName) {
            this.setFormDataValue(this.valueName, event.currentTarget.value);
        }
    }

    renderEditUI(): JSX.Element | null {
        return <XTimePickerEditUI editMe={this} />;
    }
}



class XTimePickerEditUI extends React.Component<{editMe: XTimePicker}> {
    render () {
        return (
            <>
                {this.props.editMe.renderBaseDataControlEditor()}
                {this.props.editMe.renderTextControlBasePropertyEditor()}
                {this.props.editMe.renderTextStyleSelectionEditor()}
            </>
        )
    }
}