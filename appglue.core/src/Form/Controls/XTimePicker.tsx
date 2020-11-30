import React from "react";
import styled from "styled-components";
import TextField from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';
import {InputLabel} from "@material-ui/core";

import {RegisterUIControl, ControlType} from "../Utilities/RegisterUIControl";
import {BaseTextEntryControl} from "./BaseTextEntryControl";
import {TimePickerIcon} from "../../CommonUI/Icon/TimePickerIcon";


@RegisterUIControl('Data (Entry)', 'Time Picker', ControlType.Control, <TimePickerIcon />)
export class XTimePicker extends BaseTextEntryControl {

    render () {
        return (
            <form noValidate>
                <>
                    {
                        this.label && (
                            <StyledInputLabel>{this.label}</StyledInputLabel>
                        )
                    }            
                    <TextField
                        type="time"
                        value={this.valueName?this.getFormDataValue(this.valueName): String}
                        onChange={this.handleChange}
                        data-testid={this.valueName}
                        inputProps={{
                            style: {
                                width: '274.29px',
                                height: '59px',
                                border: '1.35302px solid #E6E9ED',
                                boxSizing: 'border-box',
                                borderRadius: '5.65107px',
                                color: '#677C95',
                                paddingLeft: 20,
                                paddingRight: 15,
                            },
                        }}
                    />
                    {
                        this.hintText && (
                            <StyledFormHelperText>{this.hintText}</StyledFormHelperText>
                        )
                    }
                </>
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
