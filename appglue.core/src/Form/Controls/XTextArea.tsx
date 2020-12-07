import React from 'react';
import styled from 'styled-components';
import {RegisterUIControl, ControlType} from '../Utilities/RegisterUIControl';
import {TextField} from '@material-ui/core';
import Tooltip from '@material-ui/core/Tooltip';
import {BaseTextEntryControl} from "./BaseTextEntryControl";
import {TextControlStyle} from "../FormDesignConstants";
import {TextAreaIcon} from "../../CommonUI/Icon/TextAreaIcon";
import { StyledInputLabel, StyledFormHelperText } from "./XCommonStyled";
import {IssueData} from "../Utilities/ControlRenderContext";
import {StyledTextField} from "./XCommonStyled";


@RegisterUIControl('Data (Entry)', 'Text Area', ControlType.Control, <TextAreaIcon />)
export class XTextArea extends BaseTextEntryControl {
	rowMax: number = 10;
	rowMin: number = 5;

    render() {
        
        let style = (this.getFormContext()?.form)?.defaultTextStyle;

        if (this.overrideStyle && this.style)
            style = this.style;
        
        const issueData : IssueData | null =  this.getFormContext()!.getControlContext(this)!.getRuntimeIssueData();
        const issueText: string = issueData?.text || '';
        const customWidth = this.fullWidth ? '100%' : this.width ? `${this.width}px` : '50%';
        
        switch(style) {
            case TextControlStyle.LABELED :
                return (
                    <StyledTextFieldWrap width={customWidth}>
                        {this.label && <StyledInputLabel>{this.label}</StyledInputLabel>}
                        <StyledTextField
                            width={customWidth}
                            variant={"outlined"}
                            fullWidth={this.fullWidth}
                            error={Boolean(issueText)}
                            data-testid={this.valueName}
                            rows={this.rowMin}
                            rowsMax={this.rowMax}
                            multiline
                            onChange={this.handleChange}
                            value={(this.valueName)?this.getFormDataValue(this.valueName):''}
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
                    </StyledTextFieldWrap>
                )
            case TextControlStyle.SHADED :
                return (
                    <StyledTextFieldWrap width={customWidth}>
                        <StyledTextField
                            width={customWidth}
                            variant={"filled"}
                            customstyle={"filled"}
                            fullWidth={this.fullWidth}
                            error={Boolean(issueText)}
                            data-testid={this.valueName}
                            rows={this.rowMin}
                            rowsMax={this.rowMax}
                            multiline
                            onChange={this.handleChange}
                            value={(this.valueName)?this.getFormDataValue(this.valueName):''}
                            label={this.label}
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
                    </StyledTextFieldWrap>
                )
            case TextControlStyle.UNDERLINED :
                return (
                    <StyledTextFieldWrap width={customWidth}>
                        <StyledTextField
                            width={customWidth}
                            variant={"standard"}
                            customstyle={"standard"}
                            fullWidth={this.fullWidth}
                            error={Boolean(issueText)}
                            data-testid={this.valueName}
                            rows={this.rowMin}
                            rowsMax={this.rowMax}
                            multiline
                            onChange={this.handleChange}
                            value={(this.valueName)?this.getFormDataValue(this.valueName):''}
                            label={this.label}
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
                    </StyledTextFieldWrap>
                )
            case TextControlStyle.OUTLINE :
                return (
                    <StyledTextFieldWrap width={customWidth}>
                        <StyledTextField
                            width={customWidth}
                            variant={"outlined"}
                            customstyle={"outlined"}
                            fullWidth={this.fullWidth}
                            error={Boolean(issueText)}
                            data-testid={this.valueName}
                            rows={this.rowMin}
                            rowsMax={this.rowMax}
                            multiline
                            onChange={this.handleChange}
                            value={(this.valueName)?this.getFormDataValue(this.valueName):''}
                            label={this.label}
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
                    </StyledTextFieldWrap>
                )
        }
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
                    this.props.editMe.controlUpdate();
                }}  />
				<TextField label="Row Min" type="number" value={this.props.editMe.rowMin} onChange={event => {
                    this.props.editMe.rowMin = parseInt(event.target.value, 10);
                    this.props.editMe.controlUpdate();
                }}  />

				{this.props.editMe.renderTextStyleSelectionEditor()}

			</>
        );
    }
}

const StyledTextFieldWrap = styled.div<{width?: string}>`
    width: ${({width}) => width} !important;
    height: 100% !important;
    box-sizing: border-box !important;
    position: relative !important;
`