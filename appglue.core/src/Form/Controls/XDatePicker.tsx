import React from "react";
import Tooltip from '@material-ui/core/Tooltip';
import {RegisterUIControl, ControlType} from "../Utilities/RegisterUIControl";
import {BaseTextEntryControl} from "./BaseTextEntryControl";
import {TextControlStyle} from "../FormDesignConstants";
import {DatePickerIcon} from "../../CommonUI/Icon/DatePickerIcon";
import { StyledInputLabel, StyledFormHelperText } from "./XCommonStyled";
import {IssueData} from "../Utilities/ControlRenderContext";
import {StyledTextField} from "./XCommonStyled";

@RegisterUIControl('Data (Entry)', 'Date Picker', ControlType.Control, <DatePickerIcon />)
export class XDatePicker extends BaseTextEntryControl {

    formatDate(date: Date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
    
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
    
        return [year, month, day].join('-');
    }

    render () {
        
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
                    <form noValidate>
                        {this.label && <StyledInputLabel>{this.label}</StyledInputLabel>}
                        <StyledTextField
                            size={size}
                            data-size={size}
                            variant={"outlined"}
                            type="date"
                            fullWidth={this.fullWidth}
                            value={this.valueName?this.getFormDataValue(this.valueName):this.formatDate(new Date())}
                            onChange={this.handleChange}
                            data-testid={this.valueName}
                            width={customWidth}
                            error={Boolean(issueText)}
                        />
                        {
                            (issueText && issueText.length > 30)  && (
                                <Tooltip title={issueText} arrow placement="bottom">
                                    <StyledFormHelperText error={Boolean(issueText)} data-testid={`${this.valueName || 'datepicker'}-hinttext`}>
                                        {issueText.slice(0, 30) + '...'}
                                    </StyledFormHelperText>
                                </Tooltip>
                            ) 
                        }
                        {
                            ((issueText && issueText.length < 31) || this.hintText) && (
                                <StyledFormHelperText error={Boolean(issueText)} data-testid={`${this.valueName || 'datepicker'}-hinttext`}>
                                    {issueText ? issueText: this.hintText}
                                </StyledFormHelperText>
                            )
                        }
                    </form>
                );
            case TextControlStyle.SHADED :
                return (
                    <form noValidate>
                        <StyledTextField
                            size={size}
                            data-size={size}
                            variant={"filled"}
                            customstyle={"filled"}
                            type="date"
                            fullWidth={this.fullWidth}
                            value={this.valueName?this.getFormDataValue(this.valueName):this.formatDate(new Date())}
                            onChange={this.handleChange}
                            data-testid={this.valueName}
                            width={customWidth}
                            error={Boolean(issueText)}
                            label={this.label}
                        />
                        {
                            (issueText && issueText.length > 30)  && (
                                <Tooltip title={issueText} arrow placement="bottom">
                                    <StyledFormHelperText error={Boolean(issueText)} data-testid={`${this.valueName || 'datepicker'}-hinttext`}>
                                        {issueText.slice(0, 30) + '...'}
                                    </StyledFormHelperText>
                                </Tooltip>
                            ) 
                        }
                        {
                            ((issueText && issueText.length < 31) || this.hintText) && (
                                <StyledFormHelperText error={Boolean(issueText)} data-testid={`${this.valueName || 'datepicker'}-hinttext`}>
                                    {issueText ? issueText: this.hintText}
                                </StyledFormHelperText>
                            )
                        }
                    </form>
                );
            case TextControlStyle.UNDERLINED :
                return (
                    <form noValidate>
                        <StyledTextField
                            size={size}
                            data-size={size}
                            variant={"standard"}
                            customstyle={"standard"}
                            type="date"
                            fullWidth={this.fullWidth}
                            value={this.valueName?this.getFormDataValue(this.valueName):this.formatDate(new Date())}
                            onChange={this.handleChange}
                            data-testid={this.valueName}
                            width={customWidth}
                            error={Boolean(issueText)}
                            label={this.label}
                            ispicker={'true'}
                        />
                        {
                            (issueText && issueText.length > 30)  && (
                                <Tooltip title={issueText} arrow placement="bottom">
                                    <StyledFormHelperText error={Boolean(issueText)} data-testid={`${this.valueName || 'datepicker'}-hinttext`}>
                                        {issueText.slice(0, 30) + '...'}
                                    </StyledFormHelperText>
                                </Tooltip>
                            ) 
                        }
                        {
                            ((issueText && issueText.length < 31) || this.hintText) && (
                                <StyledFormHelperText error={Boolean(issueText)} data-testid={`${this.valueName || 'datepicker'}-hinttext`}>
                                    {issueText ? issueText: this.hintText}
                                </StyledFormHelperText>
                            )
                        }
                    </form>
                );
            case TextControlStyle.OUTLINE :
                return (
                    <form noValidate>
                        <StyledTextField
                            size={size}
                            data-size={size}
                            variant={"outlined"}
                            customstyle={"outlined"}
                            type="date"
                            fullWidth={this.fullWidth}
                            value={this.valueName?this.getFormDataValue(this.valueName):this.formatDate(new Date())}
                            onChange={this.handleChange}
                            data-testid={this.valueName}
                            width={customWidth}
                            error={Boolean(issueText)}
                            label={this.label}
                            ispicker={'true'}
                        />
                        {
                            (issueText && issueText.length > 30)  && (
                                <Tooltip title={issueText} arrow placement="bottom">
                                    <StyledFormHelperText error={Boolean(issueText)} data-testid={`${this.valueName || 'datepicker'}-hinttext`}>
                                        {issueText.slice(0, 30) + '...'}
                                    </StyledFormHelperText>
                                </Tooltip>
                            ) 
                        }
                        {
                            ((issueText && issueText.length < 31) || this.hintText) && (
                                <StyledFormHelperText error={Boolean(issueText)} data-testid={`${this.valueName || 'datepicker'}-hinttext`}>
                                    {issueText ? issueText: this.hintText}
                                </StyledFormHelperText>
                            )
                        }
                    </form>
                );
        }
    }

    private handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//        console.log(event.currentTarget.value);
        if(this.valueName) {
            this.setFormDataValue(this.valueName, event.currentTarget.value);
        }
    }

    renderEditUI(): JSX.Element | null {
        return <XDatePickerEditUI editMe={this} />;
    }
}

class XDatePickerEditUI extends React.Component<{editMe: XDatePicker}> {
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