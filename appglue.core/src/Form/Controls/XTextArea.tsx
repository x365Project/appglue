import React from 'react';
import styled from 'styled-components';
import {RegisterUIControl, ControlType} from '../Utilities/RegisterUIControl';
import {TextField, TextareaAutosize, InputLabel} from '@material-ui/core';
import {BaseTextEntryControl} from "./BaseTextEntryControl";
import {TextAreaIcon} from "../../CommonUI/Icon/TextAreaIcon";
import FormHelperText from '@material-ui/core/FormHelperText';
import "./XControls.css"


@RegisterUIControl('Data (Entry)', 'Text Area', ControlType.Control, <TextAreaIcon />)
export class XTextArea extends BaseTextEntryControl {
	rowMax: number = 10;
	rowMin: number = 5;

	render() {
		return (
			<>
				{this.label && <StyledInputLabel>{this.label}</StyledInputLabel>}
				<StyledTextareaAutosize
					data-testid={this.valueName}
					rowsMax={this.rowMax}
					rowsMin={this.rowMin}
					placeholder={this.placeholderText}
					onChange={this.handleChange}
					value={(this.valueName)?this.getFormDataValue(this.valueName):''}
				/>
				{this.hintText && (
					<StyledFormHelperText>{this.hintText}</StyledFormHelperText>
				)}
			</>
		)
	}

	private handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		if(this.valueName) {
		this.setFormDataValue(this.valueName, event.currentTarget.value);
		}    
	}

	renderEditUI(): JSX.Element | null {
		return <XTextAreaEditUI editMe={this} />;
	}
}

class XTextAreaEditUI extends React.Component<{editMe:XTextArea}> {

    render() {
        return (
            <>
				{this.props.editMe.renderBaseDataControlEditor()}
				{this.props.editMe.renderTextControlBasePropertyEditor()}

				<TextField label="Row Max" type="number" value={this.props.editMe.rowMax} onChange={event => {
                    this.props.editMe.rowMax = parseInt(event.target.value, 10);
                    this.props.editMe.designerUpdate();
                }}  />
				<TextField label="Row Min" type="number" value={this.props.editMe.rowMin} onChange={event => {
                    this.props.editMe.rowMin = parseInt(event.target.value, 10);
                    this.props.editMe.designerUpdate();
                }}  />

				{this.props.editMe.renderTextStyleSelectionEditor()}

			</>
        );
    }
}

// https://styled-components.com/docs/faqs#how-can-i-override-inline-styles
const StyledTextareaAutosize = styled(TextareaAutosize)`
	width: 100% !important;
	min-width: 246px !important;
	height: 59px !important;
	border: 1px solid #E6E9ED !important;
	box-sizing: border-box !important;
	border-radius: 5px !important;
	padding: 14px 20px 14px 20px;
	font-family: Mulish !important;
	font-weight: 600;
	font-size: 16px;
	line-height: 24px;
	color: #01244E;
	&:focus {
        border: 2px solid rgb(63, 81, 181) !important;
    }
`

const StyledInputLabel = styled(InputLabel)`
    font-family: Mulish !important;
    font-weight: 400 !important;
    font-size: 14px !important;
    line-height: 18px !important;
    margin-bottom: 12px !important;
`;

const StyledFormHelperText = styled(FormHelperText) `
	font-family: Mulish !important;
	font-weight: 600 !important;
	font-size: 12px !important;
	line-height: 15px !important;
	margin-top: 6px !important;
	color: #677C95 !important;
`;
