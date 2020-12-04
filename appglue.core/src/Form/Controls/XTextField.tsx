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
    
    innerComponentRef: HTMLDivElement | null = null;
    
    constructor () {
        super();

        this.state = {
            open: false,
        }
    }
    
    onSelect = (event: React.MouseEvent<HTMLDivElement>) => {
        event.preventDefault();
        this.selectInDesigner();
    }

    render() {

        let style = (this.getFormRuntimeContext()?.form)?.defaultTextStyle;

        if (this.overrideStyle && this.style)
            style = this.style;

        let size : 'medium' | 'small' = (this.getFormRuntimeContext()?.form)?.defaultTextSize ?? 'medium';

        if (this.overrideStyle && this.size)
            size = this.size;
        
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
        
        let customWidth = this.fullWidth ? '100%' : this.width ? `${this.width}px` : '200px';
        
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
                            error={Boolean(runtimeError.message)}
                        />
                        
                        {
                            (runtimeError.message || this.hintText) && (
                                <StyledFormHelperText  error={Boolean(runtimeError.message)}  data-testid={`${this.valueName || 'textfield'}-hinttext`}>{runtimeError.message ? runtimeError.message: this.hintText}</StyledFormHelperText>
                            )
                        }
                    </StyledTextFieldWrap>
                );
            case TextControlStyle.SHADED :
                return (
                    <StyledTextFieldWrap width={customWidth}>
                    {
                        this.label && (
                            <StyledInputLabel data-role={TextControlStyle.SHADED}>{this.label}</StyledInputLabel>
                        )
                    }
                        
                        <StyledTextField
                            size={size}
                            data-size={size}
                            data-testid={this.valueName}
                            variant={"filled"}
                            fullWidth={this.fullWidth}
                            width={customWidth}
                            value={(this.valueName) ? this.getFormDataValue(this.valueName) : ""}
                            onChange={this.handleChange}
                            error={Boolean(runtimeError.message)}
                        >
                        </StyledTextField>
                        
                        {
                            (runtimeError.message || this.hintText) && (
                                <StyledFormHelperText error={Boolean(runtimeError.message)} data-testid={`${this.valueName || 'textfield'}-hinttext`}>{runtimeError.message ? runtimeError.message: this.hintText}</StyledFormHelperText>
                            )
                        }
                    </StyledTextFieldWrap>
                );
            case TextControlStyle.UNDERLINED :
                return (
                    <StyledTextFieldWrap width={customWidth}>
                    {
                        this.label && (
                            <StyledInputLabel data-role={TextControlStyle.UNDERLINED}>{this.label}</StyledInputLabel>
                        )
                    }
                        
                        <StyledTextField
                            size={size}
                            data-size={size}
                            data-testid={this.valueName}
                            variant={"standard"}
                            fullWidth={this.fullWidth}
                            width={customWidth}
                            value={(this.valueName) ? this.getFormDataValue(this.valueName) : ""}
                            onChange={this.handleChange}
                            error={Boolean(runtimeError.message)}
                        >
                        </StyledTextField>
                        
                        {
                            (runtimeError.message || this.hintText) && (
                                <StyledFormHelperText error={Boolean(runtimeError.message)} data-testid={`${this.valueName || 'textfield'}-hinttext`}>{runtimeError.message ? runtimeError.message: this.hintText}</StyledFormHelperText>
                            )
                        }
                    </StyledTextFieldWrap>
                );
            case TextControlStyle.OUTLINE :
                return (
                    <StyledTextFieldWrap width={customWidth}>
                    {
                        this.label && (
                            <StyledInputLabel data-role={TextControlStyle.OUTLINE}>{this.label}</StyledInputLabel>
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
                            error={Boolean(runtimeError.message)}
                        >
                        </StyledTextField>
                        
                        {
                            (runtimeError.message || this.hintText) && (
                                <StyledFormHelperText error={Boolean(runtimeError.message)} data-testid={`${this.valueName || 'textfield'}-hinttext`}>{runtimeError.message ? runtimeError.message: this.hintText}</StyledFormHelperText>
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

interface ValidationError {
    type?: 'error' | 'warning';
    message?: string;
}

const StyledTextFieldWrap = styled.div<{width?: string}>`
    width: ${({width}) => width} !important;
    height: 100% !important;
    box-sizing: border-box !important;
    position: relative !important;
`

const StyledTextField = styled(TextField)<{width?: string}>`
    width: ${({width}) => width} !important;
    height: 59px !important;
    box-sizing: border-box !important;
    z-index: 1 !important;
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