import React from 'react';
import styled from 'styled-components';
import {RegisterUIControl, ControlType} from '../Utilities/RegisterUIControl';
import {TextField, TextareaAutosize} from '@material-ui/core';
import Tooltip from '@material-ui/core/Tooltip';
import {BaseTextEntryControl} from "./BaseTextEntryControl";
import {TextAreaIcon} from "../../CommonUI/Icon/TextAreaIcon";
import { StyledInputLabel, StyledFormHelperText } from "./XCommonStyled";
import {IssueData} from "../Utilities/FormEditContext";
import "./XControls.css"


@RegisterUIControl('Data (Entry)', 'Text Area', ControlType.Control, <TextAreaIcon />)
export class XTextArea extends BaseTextEntryControl {
	rowMax: number = 10;
	rowMin: number = 5;

	render() {
        
        const issueData : IssueData | null =  this.getFormRuntimeContext()!.getControlContext(this)!.getRuntimeIssueData();
		const issueText: string = issueData?.text || '';
        const customWidth = this.fullWidth ? '100%' : this.width ? `${this.width}px` : '50%';
        
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
					error={issueText}
				/>
				{
                    (issueText && issueText.length > 30)  && (
                        <Tooltip title={issueText} arrow placement="bottom">
                            <StyledFormHelperText error={Boolean(issueText)} data-testid={`${this.valueName || 'textarea'}-hinttext`}>
                                {issueText.slice(0, 30) + '...'}
                            </StyledFormHelperText>
                        </Tooltip>
                    ) 
                }
                {
                    ((issueText && issueText.length < 31) || this.hintText) && (
                        <StyledFormHelperText error={Boolean(issueText)} data-testid={`${this.valueName || 'textarea'}-hinttext`}>
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

const StyledTextareaAutosize = styled(TextareaAutosize)<{width?: string, error?: string}>`
	width: ${({width}) => width} !important;
	min-width: 246px !important;
	height: 59px !important;
	border: 1.35302px solid ${({error}) => error? '#F65C66' : '#E6E9ED'} !important;
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
		border: 1.35302px solid ${({error}) => error? '#F65C66' : '#1873B9'} !important;
	}
    &::-webkit-input-placeholder {
        font: 16px;
        line-height: 20px;
        color: #677C95;
    }
`