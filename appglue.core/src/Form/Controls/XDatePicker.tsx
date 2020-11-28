import React from "react";
import TextField from '@material-ui/core/TextField';

import {RegisterUIControl, ControlType} from "../Utilities/RegisterUIControl";
import {BaseTextEntryControl} from "./BaseTextEntryControl";
import {DatePickerIcon} from "../../CommonUI/Icon/DatePickerIcon";


@RegisterUIControl('Data (Entry)', 'Date Picker', ControlType.Control, <DatePickerIcon />)
export class XDatePicker extends BaseTextEntryControl {

    formatDate(date: Date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
    
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
    
        return [year, month, day].join('-');
    }

    render () {
        return (
            <form noValidate>
                <TextField
                    label={this.label}
                    type="date"
                    value={this.valueName?this.getFormDataValue(this.valueName):this.formatDate(new Date())}
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
        console.log(event.currentTarget.value);
        if(this.valueName) {
            this.setFormDataValue(this.valueName, event.currentTarget.value);
        }
    }

    renderEditUI(): JSX.Element | null {
        return <XDatePickerEditUI editMe={this} />;
    }
}



class XDatePickerEditUI extends React.Component<{editMe: XDatePicker}> {
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