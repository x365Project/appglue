import React from 'react';
import styled from "styled-components";
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import {RegisterUIControl, ControlType} from '../Utilities/RegisterUIControl';
import {BaseTextEntryControl} from "./BaseTextEntryControl";
import {NumberboxIcon} from "../../CommonUI/Icon/NumberboxIcon";
import { StyledInputLabel, StyledFormHelperText } from "./XCommonStyled";
import {IssueData} from "../Utilities/FormContext";
import "./XControls.css"


@RegisterUIControl('Data (Entry)', 'NumberBox', ControlType.Control, <NumberboxIcon />)
export class XNumberBox extends BaseTextEntryControl {

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

        const issueData : IssueData | null =  this.getFormContext()!.getControlContext(this)!.getRuntimeIssueData();
        const issueText: string = issueData?.text || '';
        const customWidth = this.fullWidth ? '100%' : this.width ? `${this.width}px` : '200px';

		return (
			<>
				{this.label && <StyledInputLabel>{this.label}</StyledInputLabel>}
                <StyledTextField
                    type="number"
                    variant={"outlined"}
                    value={this.getValue()}
                    onChange={this.handleChange}
                    data-testid={this.valueName}
                    fullWidth
                    width={customWidth}
                    error={Boolean(issueText)}
                />
                {
                    (issueText && issueText.length > 30)  && (
                        <Tooltip title={issueText} arrow placement="bottom">
                            <StyledFormHelperText error={Boolean(issueText)} data-testid={`${this.valueName || 'numberbox'}-hinttext`}>
                                {issueText.slice(0, 30) + '...'}
                            </StyledFormHelperText>
                        </Tooltip>
                    ) 
                }
                {
                    ((issueText && issueText.length < 31) || this.hintText) && (
                        <StyledFormHelperText error={Boolean(issueText)} data-testid={`${this.valueName || 'numberbox'}-hinttext`}>
                            {issueText ? issueText: this.hintText}
                        </StyledFormHelperText>
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

interface ValidationError {
    type?: 'error' | 'warning';
    message?: string;
}

const StyledTextField = styled(TextField)<{width?: string}>`
    width: ${({width}) => width} !important;
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
            border: 1.35302px solid ${({error}) => error? '#F65C66' : '#1873B9'} !important;
        }
        border: 1.35302px solid ${({error}) => error? '#F65C66' : '#E6E9ED'} !important;
    }
`