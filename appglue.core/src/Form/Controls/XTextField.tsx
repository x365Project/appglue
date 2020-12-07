import React from "react";
import styled from "styled-components";
import Tooltip from '@material-ui/core/Tooltip';
import { RegisterUIControl, ControlType } from "../Utilities/RegisterUIControl";
import { BaseTextEntryControl} from "./BaseTextEntryControl";
import {TextControlStyle} from "../FormDesignConstants";
import {TextFieldIcon} from "../../CommonUI/Icon/TextFieldIcon";
import { StyledInputLabel, StyledFormHelperText } from "./XCommonStyled";
import {IssueData} from "../Utilities/ControlRenderContext";
import {StyledTextField} from "./XCommonStyled";

@RegisterUIControl('Data (Entry)', 'Text Field', ControlType.Control, <TextFieldIcon />)
export class XTextField extends BaseTextEntryControl {

    render() {

        let style = (this.getFormContext()?.form)?.defaultTextStyle;

        if (this.overrideStyle && this.style)
            style = this.style;

        let size : 'medium' | 'small' = (this.getFormContext()?.form)?.defaultTextSize ?? 'medium';

        if (this.overrideStyle && this.size)
            size = this.size;
        
        const issueData : IssueData | null =  this.getFormContext()!.getControlContext(this)!.getRuntimeIssueData();
        const issueText: string = issueData?.text || '';
        const customWidth = this.fullWidth ? '100%' : this.width ? `${this.width}px` : '200px';

        switch(style) {
            case TextControlStyle.LABELED :
                return (
                    <StyledTextFieldWrap width={customWidth}>
                        {
                            this.label && (
                                <StyledInputLabel data-role={TextControlStyle.LABELED}>{this.label}</StyledInputLabel>
                            )
                        }
                        <StyledTextField
                            size={size}
                            data-size={size}
                            data-testid={this.valueName}
                            variant={"outlined"}
                            fullWidth={this.fullWidth}
                            width={customWidth}
                            value={(this.valueName) ? this.getFormDataValue(this.valueName) : ""}
                            onChange={this.handleChange}
                            error={Boolean(issueText)}
                        />
                        {
                            (issueText && issueText.length > 30)  && (
                                <Tooltip title={issueText} arrow placement="bottom">
                                    <StyledFormHelperText error={Boolean(issueText)} data-testid={`${this.valueName || 'textfield'}-hinttext`}>
                                        {issueText.slice(0, 30) + '...'}
                                    </StyledFormHelperText>
                                </Tooltip>
                            ) 
                        }
                        {
                            ((issueText && issueText.length < 31) || this.hintText) && (
                                <StyledFormHelperText error={Boolean(issueText)} data-testid={`${this.valueName || 'textfield'}-hinttext`}>
                                    {issueText ? issueText: this.hintText}
                                </StyledFormHelperText>
                            )
                        }
                    </StyledTextFieldWrap>
                );
            case TextControlStyle.SHADED :
                return (
                    <StyledTextFieldWrap width={customWidth}>
                        <StyledTextField
                            size={size}
                            data-size={size}
                            data-testid={this.valueName}
                            variant={"filled"}
                            customstyle={"filled"}
                            fullWidth={this.fullWidth}
                            width={customWidth}
                            value={(this.valueName) ? this.getFormDataValue(this.valueName) : ""}
                            onChange={this.handleChange}
                            error={Boolean(issueText)}
                            label={this.valueName}
                        />
                        {
                            (issueText || this.hintText) && (
                                <StyledFormHelperText error={Boolean(issueText)} data-testid={`${this.valueName || 'textfield'}-hinttext`}>
                                    {issueText ? issueText: this.hintText}
                                </StyledFormHelperText>
                            )
                        }

                    </StyledTextFieldWrap>
                );
            case TextControlStyle.UNDERLINED :
                return (
                    <StyledTextFieldWrap width={customWidth}>
                        <StyledTextField
                            size={size}
                            data-size={size}
                            data-testid={this.valueName}
                            variant={"standard"}
                            customstyle={"standard"}
                            fullWidth={this.fullWidth}
                            width={customWidth}
                            value={(this.valueName) ? this.getFormDataValue(this.valueName) : ""}
                            onChange={this.handleChange}
                            error={Boolean(issueText)}
                            label={this.valueName}
                        />
                        {
                            (issueText || this.hintText) && (
                                <StyledFormHelperText error={Boolean(issueText)} data-testid={`${this.valueName || 'textfield'}-hinttext`}>
                                    {issueText ? issueText: this.hintText}
                                </StyledFormHelperText>
                            )
                        }

                    </StyledTextFieldWrap>
                );
            case TextControlStyle.OUTLINE :
                return (
                    <StyledTextFieldWrap width={customWidth}>
                        <StyledTextField
                            size={size}
                            data-size={size}
                            data-testid={this.valueName}
                            variant={"outlined"}
                            customstyle={"outlined"}
                            fullWidth={this.fullWidth}
                            width={customWidth}
                            value={(this.valueName) ? this.getFormDataValue(this.valueName) : ""}
                            onChange={this.handleChange}
                            error={Boolean(issueText)}
                            label={this.valueName}
                        />
                        {
                            (issueText || this.hintText) && (
                                <StyledFormHelperText error={Boolean(issueText)} data-testid={`${this.valueName || 'textfield'}-hinttext`}>
                                    {issueText ? issueText: this.hintText}
                                </StyledFormHelperText>
                            )
                        }

                    </StyledTextFieldWrap>
                );
            }
    
    }

    private handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (this.valueName) {
            this.setFormDataValue(this.valueName, event.currentTarget.value);
        }
    }

    renderEditUI(): JSX.Element | null {
        return  <XTextFieldEditUI editMe={this} />;
    }


}

function XTextFieldEditUI(props: { editMe: XTextField }) {
    return (
        <>
            {props.editMe.renderBaseDataControlEditor()}
            {props.editMe.renderTextControlBasePropertyEditor()}
            {props.editMe.renderTextStyleSelectionEditor()}
        </>
    );
}

const StyledTextFieldWrap = styled.div<{width?: string}>`
    width: ${({width}) => width} !important;
    height: 100% !important;
    box-sizing: border-box !important;
    position: relative !important;
`