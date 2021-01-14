import React from "react";
import Tooltip from '@material-ui/core/Tooltip';

import {RegisterUIControl, ControlType} from "../Utilities/RegisterUIControl";
import {BaseTextEntryControl} from "./BaseTextEntryControl";
import {TextControlStyle} from "../FormDesignConstants";
import {TimePickerIcon} from "../../CommonUI/Icon/TimePickerIcon";
import { StyledInputLabel, StyledFormHelperText } from "./XCommonStyled";
import {IssueData} from "../Utilities/ControlRenderContext";
import {StyledTextField} from "./XCommonStyled";


@RegisterUIControl('Data (Entry)', 'Time Picker', ControlType.Control, <TimePickerIcon />)
export class XTimePicker extends BaseTextEntryControl {

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
                    <>
                        {this.label && <StyledInputLabel data-role={TextControlStyle.LABELED}>{this.label}</StyledInputLabel>}
                        <StyledTextField
                            size={size}
                            data-size={size}
                            variant={"outlined"}
                            fullWidth={this.fullWidth}
                            type="time"
                            value={this.valueName?this.getFormDataValue(this.valueName): String}
                            onChange={this.handleChange}
                            data-testid={this.valueName}
                            width={customWidth}
                            error={Boolean(issueText)}
                        />
                        {
                            (issueText && issueText.length > 30)  && (
                                <Tooltip title={issueText} arrow placement="bottom">
                                    <StyledFormHelperText error={Boolean(issueText)} data-testid={`${this.valueName || 'timepicker'}-hinttext`}>
                                        {issueText.slice(0, 30) + '...'}
                                    </StyledFormHelperText>
                                </Tooltip>
                            ) 
                        }
                        {
                            ((issueText && issueText.length < 31) || this.hintText) && (
                                <StyledFormHelperText error={Boolean(issueText)} data-testid={`${this.valueName || 'timepicker'}-hinttext`}>
                                    {issueText ? issueText: this.hintText}
                                </StyledFormHelperText>
                            )
                        }
                    </>
                );
            case TextControlStyle.SHADED :
                return (
                    <>
                        <StyledTextField
                            size={size}
                            data-size={size}
                            variant={"filled"}
                            customstyle={"filled"}
                            fullWidth={this.fullWidth}
                            type="time"
                            value={this.valueName?this.getFormDataValue(this.valueName): String}
                            onChange={this.handleChange}
                            data-testid={this.valueName}
                            width={customWidth}
                            error={Boolean(issueText)}
                            label={this.valueName}
                        />
                        {
                            (issueText && issueText.length > 30)  && (
                                <Tooltip title={issueText} arrow placement="bottom">
                                    <StyledFormHelperText error={Boolean(issueText)} data-testid={`${this.valueName || 'timepicker'}-hinttext`}>
                                        {issueText.slice(0, 30) + '...'}
                                    </StyledFormHelperText>
                                </Tooltip>
                            ) 
                        }
                        {
                            ((issueText && issueText.length < 31) || this.hintText) && (
                                <StyledFormHelperText error={Boolean(issueText)} data-testid={`${this.valueName || 'timepicker'}-hinttext`}>
                                    {issueText ? issueText: this.hintText}
                                </StyledFormHelperText>
                            )
                        }
                    </>
                );
            case TextControlStyle.UNDERLINED :
                return (
                    <>
                        <StyledTextField
                            size={size}
                            data-size={size}
                            variant={"standard"}
                            customstyle={"standard"}
                            fullWidth={this.fullWidth}
                            type="time"
                            value={this.valueName?this.getFormDataValue(this.valueName): String}
                            onChange={this.handleChange}
                            data-testid={this.valueName}
                            width={customWidth}
                            error={Boolean(issueText)}
                            label={this.valueName}
                            ispicker={'true'}
                        />
                        {
                            (issueText && issueText.length > 30)  && (
                                <Tooltip title={issueText} arrow placement="bottom">
                                    <StyledFormHelperText error={Boolean(issueText)} data-testid={`${this.valueName || 'timepicker'}-hinttext`}>
                                        {issueText.slice(0, 30) + '...'}
                                    </StyledFormHelperText>
                                </Tooltip>
                            ) 
                        }
                        {
                            ((issueText && issueText.length < 31) || this.hintText) && (
                                <StyledFormHelperText error={Boolean(issueText)} data-testid={`${this.valueName || 'timepicker'}-hinttext`}>
                                    {issueText ? issueText: this.hintText}
                                </StyledFormHelperText>
                            )
                        }
                    </>
                );  
            case TextControlStyle.OUTLINE :
                return (
                    <>
                        <StyledTextField
                            size={size}
                            data-size={size}
                            variant={"outlined"}
                            customstyle={"outlined"}
                            fullWidth={this.fullWidth}
                            type="time"
                            value={this.valueName?this.getFormDataValue(this.valueName): String}
                            onChange={this.handleChange}
                            data-testid={this.valueName}
                            width={customWidth}
                            error={Boolean(issueText)}
                            label={this.valueName}
                            ispicker={'true'}
                        />
                        {
                            (issueText && issueText.length > 30)  && (
                                <Tooltip title={issueText} arrow placement="bottom">
                                    <StyledFormHelperText error={Boolean(issueText)} data-testid={`${this.valueName || 'timepicker'}-hinttext`}>
                                        {issueText.slice(0, 30) + '...'}
                                    </StyledFormHelperText>
                                </Tooltip>
                            ) 
                        }
                        {
                            ((issueText && issueText.length < 31) || this.hintText) && (
                                <StyledFormHelperText error={Boolean(issueText)} data-testid={`${this.valueName || 'timepicker'}-hinttext`}>
                                    {issueText ? issueText: this.hintText}
                                </StyledFormHelperText>
                            )
                        }
                    </>
                );
        }

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