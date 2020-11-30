import React from "react";
import styled from "styled-components";
import TextField from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';
import {InputLabel} from "@material-ui/core";

import {RegisterUIControl, ControlType} from "../Utilities/RegisterUIControl";
import {BaseTextEntryControl} from "./BaseTextEntryControl";
import {DatePickerIcon} from "../../CommonUI/Icon/DatePickerIcon";
import "./XControls.css"

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

                {
                    this.label && (
                        <StyledInputLabel>{this.label}</StyledInputLabel>
                    )
                }

                <TextField
                    label=""
                    type="date"
                    variant="outlined"
                    value={this.valueName?this.getFormDataValue(this.valueName):this.formatDate(new Date())}
                    onChange={this.handleChange}
                    InputLabelProps={{
                        shrink: false,
                    }}
                    data-testid={this.valueName}
                    inputProps={{
                        style: {
                            width: '274.29px',
                            height: '59px',
                            border: '1.35302px solid #E6E9ED',
                            boxSizing: 'border-box',
                            borderRadius: '5.65107px',
                            color: '#677C95',
                        },
                    }}
                />
                {
                    this.hintText && (
                        <StyledFormHelperText>{this.hintText}</StyledFormHelperText>
                    )
                }
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

const StyledInputLabel = styled(InputLabel)`
    font-family: Mulish !important;
    font-weight: 400 !important;
    font-size: 14px !important;
    line-height: 18px !important;
    margin-bottom: 12px !important;
`;

const StyledFormHelperText = styled(FormHelperText)`
    font-family: Mulish !important;
    font-weight: 600 !important;
    font-size: 12px !important;
    line-height: 15px !important;
    color: #677C95 !important;
    margin-top: 6px !important;
`;
