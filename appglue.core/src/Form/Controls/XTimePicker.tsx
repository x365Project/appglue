import React from "react";
import styled from "styled-components";
import TextField from '@material-ui/core/TextField';

import {RegisterUIControl, ControlType} from "../Utilities/RegisterUIControl";
import {BaseTextEntryControl} from "./BaseTextEntryControl";
import {TimePickerIcon} from "../../CommonUI/Icon/TimePickerIcon";
import { StyledInputLabel, StyledFormHelperText } from "./XCommonStyled";


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
                    <StyledTextField
                        type="time"
                        value={this.valueName?this.getFormDataValue(this.valueName): String}
                        onChange={this.handleChange}
                        data-testid={this.valueName}
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

const StyledTextField = styled(TextField)`
    width: '274.29px',
    height: '59px',
    border: '1.35302px solid #E6E9ED',
    boxSizing: 'border-box',
    borderRadius: '5.65107px',
    color: '#677C95',
    paddingLeft: 20,
    paddingRight: 15,
    &:focus {
        background-color: #FFF;
        border: 2px solid rgb(63, 81, 181) !important;
        box-sizing: border-box;
        border-radius: 5px 5px 0px 0px;
        outline: unset !important;
    }
`