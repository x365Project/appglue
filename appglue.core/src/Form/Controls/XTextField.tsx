import React from "react";
import styled from "styled-components";
import TextField from "@material-ui/core/TextField";
import FormHelperText from '@material-ui/core/FormHelperText';
import { RegisterUIControl, ControlType } from "../Utilities/RegisterUIControl";
import { BaseTextEntryControl} from "./BaseTextEntryControl";
import {TextControlStyle} from "../FormDesignConstants";
import {InputLabel} from "@material-ui/core";
import {TextFieldIcon} from "../../CommonUI/Icon/TextFieldIcon";



@RegisterUIControl('Data (Entry)', 'Text Field', ControlType.Control, <TextFieldIcon />)
export class XTextField extends BaseTextEntryControl {


    render() {
        let style = (this.getFormRuntimeContext()?.form)?.defaultTextStyle;

        if (this.overrideStyle && this.style)
            style = this.style;

        let size : 'medium' | 'small' = (this.getFormRuntimeContext()?.form)?.defaultTextSize ?? 'medium';

        if (this.overrideStyle && this.size)
            size = this.size;

        switch(style) {
            case TextControlStyle.LABELED :
                return (
                    <>
                        {
                            this.label && (
                                <StyledInputLabel>{this.label}</StyledInputLabel>
                            )
                        }
                        
                        <TextField
                            size={size}
                            data-testid={this.valueName}
                            variant={"outlined"}
                            fullWidth={true}
                            value={(this.valueName) ? this.getFormDataValue(this.valueName) : ""}
                            onChange={this.handleChange}
                        >
    
                        </TextField>
                        {
                            this.hintText && (
                                <StyledFormHelperText>{this.hintText}</StyledFormHelperText>
                            )
                        }
                    </>
                );
            case TextControlStyle.SHADED :
                return (
                    <TextField
                        size={size}
                        variant={'filled'}
                        data-testid={this.valueName}
                        fullWidth={true}
                        value={(this.valueName) ? this.getFormDataValue(this.valueName) : ""}
                        label={this.label}
                        onChange={this.handleChange}
                    >
    
                    </TextField>
                );
            case TextControlStyle.UNDERLINED :
                return (
                    <TextField
                        size={size}
                        variant={'standard'}
                        data-testid={this.valueName}
                        fullWidth={true}
                        value={(this.valueName) ? this.getFormDataValue(this.valueName) : ""}
                        label={this.label}
                        onChange={this.handleChange}
                    >
    
                    </TextField>
                );
            case TextControlStyle.OUTLINE :
                return (
                    <TextField
                        size={size}
                        variant={'outlined'}
                        data-testid={this.valueName}
                        fullWidth={true}
                        value={(this.valueName) ? this.getFormDataValue(this.valueName) : ""}
                        label={this.label}
                        onChange={this.handleChange}
                    >
    
                    </TextField>
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

// https://styled-components.com/docs/faqs#how-can-i-override-inline-styles
const StyledInputLabel = styled(InputLabel)`
    font-family: Mulish !important;
    font-weight: 400 !important;
    font-size: 14px !important;
    line-height: 18px !important;
    margin-bottom: 12px !important;
`;

const StyledFormHelperText = styled(FormHelperText)`
    font-family: Mulish !important;
    font-weight: 600 !important;
    font-size: 12px !important;
    line-height: 15px !important;
    color: #677C95 !important;
    margin-top: 6px !important;
`;
