import React from 'react';
import styled from "styled-components";
import TextField from '@material-ui/core/TextField';
import {RegisterUIControl, ControlType} from '../Utilities/RegisterUIControl';
import {BaseTextEntryControl} from "./BaseTextEntryControl";
import {NumberboxIcon} from "../../CommonUI/Icon/NumberboxIcon";
import { StyledInputLabel, StyledFormHelperText } from "./XCommonStyled";
import "./XControls.css"


@RegisterUIControl('Data (Entry)', 'NumberBox', ControlType.Control, <NumberboxIcon />)
export class XNumberBox extends BaseTextEntryControl {

	render() {
        let customWidth = this.fullWidth ? '100%' : this.width ? `${this.width}px` : '200px';
		return (
			<>
				{
                    this.label && (
                        <StyledInputLabel>{this.label}</StyledInputLabel>
                    )
                }
                <StyledTextField
                    type="number"
                    variant={"outlined"}
                    value={this.getValue()}
                    onChange={this.handleChange}
                    data-testid={this.valueName}
                    fullWidth
                    width={customWidth}
                />
                {
                    this.hintText && (
                        <StyledFormHelperText>{this.hintText}</StyledFormHelperText>
                    )
                }
            </>
		)
	}

	private handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		if(this.valueName) {
			this.setFormDataValue(this.valueName, event.currentTarget.value);
		} 
	}

	private getValue = () => {
		return this.valueName ? this.getFormDataValue(this.valueName) : '';
	}

	renderEditUI(): JSX.Element | null {
		return <XNumberBoxEditUI editMe={this} />
	}

}

class XNumberBoxEditUI extends React.Component<{ editMe: XNumberBox }> {

    render() {
        return (
            <>
				{this.props.editMe.renderBaseDataControlEditor()}
				{this.props.editMe.renderTextControlBasePropertyEditor()}
				{this.props.editMe.renderTextStyleSelectionEditor()}
			</>
        );
    }
}

const StyledTextField = styled(TextField)`
    width: ${props => props.width} !important;
    height: 59px;
    box-sizing: border-box;
    border-radius: 5.65107px;
    outline: unset !important;
    fieldset {
        border: unset !important;
    }
    input {
        color: #01244E !important;
        border-radius: 5.65107px !important;
        &:focus {
            border: 1.35302px solid #1873B9 !important;
        }
        border: 1px solid #E6E9ED !important;
    }
`