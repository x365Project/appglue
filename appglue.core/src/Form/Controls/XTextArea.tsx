import React from 'react';
import styled from 'styled-components';
import {RegisterUIControl, ControlType} from '../Utilities/RegisterUIControl';
import {TextField, TextareaAutosize} from '@material-ui/core';
import {BaseTextEntryControl} from "./BaseTextEntryControl";
import {TextAreaIcon} from "../../CommonUI/Icon/TextAreaIcon";
import { StyledInputLabel, StyledFormHelperText } from "./XCommonStyled";
import "./XControls.css"


@RegisterUIControl('Data (Entry)', 'Text Area', ControlType.Control, <TextAreaIcon />)
export class XTextArea extends BaseTextEntryControl {
	rowMax: number = 10;
	rowMin: number = 5;

	render() {
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

		let customWidth = this.fullWidth ? '100%' : this.width ? `${this.width}px` : '50%';
		return (
			<>
				{this.label && <StyledInputLabel>{this.label}</StyledInputLabel>}
				<StyledTextareaAutosize
					data-testid={this.valueName}
					rowsMax={this.rowMax}
					rowsMin={this.rowMin}
					width={customWidth}
					placeholder={this.placeholderText}
					onChange={this.handleChange}
                    value={(this.valueName)?this.getFormDataValue(this.valueName):''}
                    error={runtimeError.message}
				/>
                {
                    (runtimeError.message || this.hintText) && (
                        <StyledFormHelperText error={runtimeError.message} data-testid={`${this.valueName || 'textarea'}-hinttext`}>{runtimeError.message ? runtimeError.message: this.hintText}</StyledFormHelperText>
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

interface ValidationError {
    type?: 'error' | 'warning';
    message?: string;
}

const StyledTextareaAutosize = styled(TextareaAutosize)`
	width: ${props => props.width} !important;
	min-width: 246px !important;
	height: 59px !important;
	border: 1px solid #E6E9ED !important;
	box-sizing: border-box !important;
	border-radius: 5px !important;
	padding: 14px 20px 14px 20px !important;
	font-family: Mulish !important;
	font-weight: 600 !important;
	font-size: 16px !important;
	line-height: 24px !important;
    color: #01244E !important;
    outline: unset !important;
	&:focus {
        border: 1.35302px solid #1873B9 !important;
    }
    &::-webkit-input-placeholder {
        font: 16px;
        line-height: 20px;
        color: #677C95;
    }
`