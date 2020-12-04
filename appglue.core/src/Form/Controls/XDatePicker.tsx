import React from "react";
import styled from "styled-components";
import TextField from '@material-ui/core/TextField';

import {RegisterUIControl, ControlType} from "../Utilities/RegisterUIControl";
import {BaseTextEntryControl} from "./BaseTextEntryControl";
import {DatePickerIcon} from "../../CommonUI/Icon/DatePickerIcon";
import { StyledInputLabel, StyledFormHelperText } from "./XCommonStyled";
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
        let isValid = false;
        if (this.valueName) {
            if (this.getFormDataValue(this.valueName)) {
                isValid = true;
            }
        }

        const runtimeError: ValidationError = {}
        if (this.valueName) {
            runtimeError.type = 'error'
            runtimeError.message = this.requiredOnAllOutcomes && !isValid ? this.requiredMessage : "";
        }

        let customWidth = this.fullWidth ? '100%' : this.width ? `${this.width}px` : '200px';
        return (
            <form noValidate>
                {
                    this.label && (
                        <StyledInputLabel>{this.label}</StyledInputLabel>
                    )
                }
                <StyledTextField
                    label=""
                    type="date"
                    value={this.valueName?this.getFormDataValue(this.valueName):this.formatDate(new Date())}
                    onChange={this.handleChange}
                    InputLabelProps={{
                        shrink: false,
                    }}
                    data-testid={this.valueName}
                    width={customWidth}
                />
                {
                    (runtimeError.message || this.hintText) && (
                        <StyledFormHelperText error={runtimeError.message} data-testid={`${this.valueName || 'datapicker'}-hinttext`}>{runtimeError.message ? runtimeError.message: this.hintText}</StyledFormHelperText>
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

interface ValidationError {
    type?: 'error' | 'warning';
    message?: string;
}

const StyledTextField = styled(TextField)`
    width: ${props => props.width} !important;
    input {
        display: flex !important;
        justify-content: space-around !important;
        height: 59px !important;
        padding: 14px 20px !important;
        border: 1px solid #E6E9ED !important;
        box-sizing: border-box !important;
        border-radius: 5.65107px !important;
        color: #677C95 !important;    
        &:focus {
            color: #01244E !important; 
            border: 1.35302px solid #1873B9 !important;
        }
    }
`