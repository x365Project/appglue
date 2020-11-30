import React from 'react';
import styled from "styled-components";
import TextField from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';
import {InputLabel} from "@material-ui/core";
import {RegisterUIControl, ControlType} from '../Utilities/RegisterUIControl';
import {BaseTextEntryControl} from "./BaseTextEntryControl";
import {NumberboxIcon} from "../../CommonUI/Icon/NumberboxIcon";
import "./XControls.css"


@RegisterUIControl('Data (Entry)', 'NumberBox', ControlType.Control, <NumberboxIcon />)
export class XNumberBox extends BaseTextEntryControl {

	render() {
		return (
			<>
				{
                    this.label && (
                        <StyledInputLabel>{this.label}</StyledInputLabel>
                    )
                }
                <TextField
                    type="number"
                    variant={"outlined"}
                    value={this.getValue()}
                    onChange={this.handleChange}
                    data-testid={this.valueName}
                    fullWidth
                    inputProps={{
                        style: {
                            minWidth: 246,
                            height: '59px',
                            border: '1.35302px solid #E6E9ED',
                            boxSizing: 'border-box',
                            borderRadius: '5.65107px',
                        },
                    }}
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
