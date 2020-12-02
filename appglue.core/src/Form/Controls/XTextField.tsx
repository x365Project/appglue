import React from "react";
import styled from "styled-components";
import TextField from "@material-ui/core/TextField";
import { RegisterUIControl, ControlType } from "../Utilities/RegisterUIControl";
import { BaseTextEntryControl} from "./BaseTextEntryControl";
import {TextControlStyle} from "../FormDesignConstants";
import {TextFieldIcon} from "../../CommonUI/Icon/TextFieldIcon";
import { StyledInputLabel, StyledFormHelperText } from "./XCommonStyled";



@RegisterUIControl('Data (Entry)', 'Text Field', ControlType.Control, <TextFieldIcon />)
export class XTextField extends BaseTextEntryControl {


    render() {
        let style = (this.getFormRuntimeContext()?.form)?.defaultTextStyle;

        if (this.overrideStyle && this.style)
            style = this.style;

        let size : 'medium' | 'small' = (this.getFormRuntimeContext()?.form)?.defaultTextSize ?? 'medium';

        if (this.overrideStyle && this.size)
            size = this.size;
        
        let customWidth = this.fullWidth ? '100%' : this.width ? `${this.width}px` : '200px';
        switch(style) {
            case TextControlStyle.LABELED :
                return (
                    <>
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
                        >
    
                        </StyledTextField>
                        {
                            this.hintText && (
                                <StyledFormHelperText data-testid={`${this.valueName || 'textfield'}-hinttext`}>{this.hintText}</StyledFormHelperText>
                            )
                        }
                    </>
                );
            case TextControlStyle.SHADED :
                return (
                    <>
                        <TextField
                            data-role={TextControlStyle.SHADED}
                            data-size={size}
                            size={size}
                            variant={'filled'}
                            data-testid={this.valueName}
                            fullWidth={true}
                            value={(this.valueName) ? this.getFormDataValue(this.valueName) : ""}
                            label={this.label}
                            onChange={this.handleChange}
                        />
                        {
                            this.hintText && (
                                <StyledFormHelperText data-testid={`${this.valueName || 'textfield'}-hinttext`}>{this.hintText}</StyledFormHelperText>
                            )
                        }
                    </>
                );
            case TextControlStyle.UNDERLINED :
                return (
                    <>
                        <TextField
                            size={size}
                            data-role={TextControlStyle.UNDERLINED}
                            data-size={size}
                            variant={'standard'}
                            data-testid={this.valueName}
                            fullWidth={true}
                            value={(this.valueName) ? this.getFormDataValue(this.valueName) : ""}
                            label={this.label}
                            onChange={this.handleChange}
                        />
                        {
                            this.hintText && (
                                <StyledFormHelperText data-testid={`${this.valueName || 'textfield'}-hinttext`}>{this.hintText}</StyledFormHelperText>
                            )
                        }
                    </>
                );
            case TextControlStyle.OUTLINE :
                return (
                    <>
                        <TextField
                            size={size}
                            data-role={TextControlStyle.OUTLINE}
                            data-size={size}
                            variant={'outlined'}
                            data-testid={this.valueName}
                            fullWidth={true}
                            value={(this.valueName) ? this.getFormDataValue(this.valueName) : ""}
                            label={this.label}
                            onChange={this.handleChange}
                        />
                        {
                            this.hintText && (
                                <StyledFormHelperText data-testid={`${this.valueName || 'textfield'}-hinttext`}>{this.hintText}</StyledFormHelperText>
                            )
                        }
                    </>
                );
            }
    
    }


    private handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (this.valueName) {
            this.setFormDataValue(this.valueName, event.currentTarget.value);
        }
    }

    renderEditUI(): JSX.Element | null {
        return (
            <XTextFieldEditUI
                editMe={this}
            />
        );;
    }
}

class XTextFieldEditUI extends React.Component<{ editMe: XTextField }> {

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
    height: 59px !important;
    box-sizing: border-box !important;
    fieldset {
        border: unset !important;
    }
    input {
        color: #01244E !important;
        border-radius: 5.65107px !important;
        &:focus {
            border: 1.35302px solid #1873B9 !important;
        }
        border: 1.35302px solid #E6E9ED !important;
    }
`