import React from "react";
import styled from "styled-components";
import {
    Button,
    IconButton,
    List, ListItem, ListItemSecondaryAction, ListItemText,
    Select
} from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import {RegisterUIControl, ControlType} from "../Utilities/RegisterUIControl";
import {BaseTextEntryControl} from "./BaseTextEntryControl";
import {TextControlStyle} from "../FormDesignConstants";
import {SelectBoxIcon} from "../../CommonUI/Icon/SelectBoxIcon";
import { StyledInputLabel, StyledFormHelperText } from "./XCommonStyled";
import TextField from "@material-ui/core/TextField";
import RemoveIcon from "@material-ui/icons/Remove";
import {ValidationIssue} from "../../Common/IDesignValidationProvider";
import {IssueData} from "../Utilities/ControlRenderContext";

interface XSelectboxItem {
    value: string,
    label: string
}

@RegisterUIControl('Data (Pick)', 'Selectbox', ControlType.Control, <SelectBoxIcon />)
export class XSelectbox extends BaseTextEntryControl {
    list: string[] = [];


    getRuntimeValidationIssues(): ValidationIssue[] {
        let issues = super.getRuntimeValidationIssues() ?? [];

        if (this.valueName) {
            let value = this.getFormDataValue(this.valueName);

            if (value) {
                if (this.list.length === 0 || this.list.indexOf(value) === -1){
                    let issue = new ValidationIssue(
                        'Value [' + value + '] is not in selection list',
                        this.valueName,
                        this.id);
                    issues.push(issue);
                }

            }
        }

        return issues;
    }

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
                    <>
                        {this.label && <StyledInputLabel>{this.label}</StyledInputLabel>}
                        <StyledFormControl
                            size={size}
                            data-size={size}
                            variant="outlined"
                            width={customWidth}
                            error={Boolean(issueText)}
                        >
                            <Select
                                defaultValue={'Pizza'}
                                value={(this.valueName) ? this.getFormDataValue(this.valueName) : ""}
                                native
                                onChange={this.handleChange}
                                data-testid={this.valueName}
                            >
                                {this.list.map((item, index) => {
                                    return (
                                        <option value={item} key={index} >{item}</option>
                                    );
                                })}
                            </Select>
                            {
                                (issueText || this.hintText) && (
                                    <StyledFormHelperText error={Boolean(issueText)} data-testid={`${this.valueName || 'selectbox'}-hinttext`}>
                                        {issueText ? issueText: this.hintText}
                                    </StyledFormHelperText>
                                )
                            }
                        </StyledFormControl>
                    </>
                );
            case TextControlStyle.SHADED :
                return (
                    <StyledFormControl
                        size={size}
                        data-size={size}
                        variant="filled"
                        customstyle={"filled"}
                        width={customWidth}
                        error={Boolean(issueText)}
                    >
                        <InputLabel >{this.valueName}</InputLabel>
                        <Select
                            defaultValue={'Pizza'}
                            value={(this.valueName) ? this.getFormDataValue(this.valueName) : ""}
                            native
                            onChange={this.handleChange}
                            data-testid={this.valueName}
                        >
                            {this.list.map((item, index) => {
                                return (
                                    <option value={item} key={index} >{item}</option>
                                );
                            })}
                        </Select>
                        {
                            (issueText || this.hintText) && (
                                <StyledFormHelperText error={Boolean(issueText)} data-testid={`${this.valueName || 'selectbox'}-hinttext`}>
                                    {issueText ? issueText: this.hintText}
                                </StyledFormHelperText>
                            )
                        }
                    </StyledFormControl>
                );
            case TextControlStyle.OUTLINE :
                return (
                    <StyledFormControl
                        size={size}
                        data-size={size}
                        variant="outlined"
                        customstyle={"outlined"}
                        width={customWidth}
                        error={Boolean(issueText)}
                    >
                        <InputLabel >{this.valueName}</InputLabel>
                        <Select
                            defaultValue={'Pizza'}
                            value={(this.valueName) ? this.getFormDataValue(this.valueName) : ""}
                            native
                            onChange={this.handleChange}
                            data-testid={this.valueName}
                        >
                            {this.list.map((item, index) => {
                                return (
                                    <option value={item} key={index} >{item}</option>
                                );
                            })}
                        </Select>
                        {
                            (issueText || this.hintText) && (
                                <StyledFormHelperText error={Boolean(issueText)} data-testid={`${this.valueName || 'selectbox'}-hinttext`}>
                                    {issueText ? issueText: this.hintText}
                                </StyledFormHelperText>
                            )
                        }
                    </StyledFormControl>
                );
            case TextControlStyle.UNDERLINED :
                return (
                    <StyledFormControl
                        size={size}
                        data-size={size}
                        variant="standard"
                        customstyle={"standard"}
                        width={customWidth}
                        error={Boolean(issueText)}
                    >
                        <InputLabel >{this.valueName}</InputLabel>
                        <Select
                            defaultValue={'Pizza'}
                            value={(this.valueName) ? this.getFormDataValue(this.valueName) : ""}
                            native
                            onChange={this.handleChange}
                            data-testid={this.valueName}
                        >
                            {this.list.map((item, index) => {
                                return (
                                    <option value={item} key={index} >{item}</option>
                                );
                            })}
                        </Select>
                        {
                            (issueText || this.hintText) && (
                                <StyledFormHelperText error={Boolean(issueText)} data-testid={`${this.valueName || 'selectbox'}-hinttext`}>
                                    {issueText ? issueText: this.hintText}
                                </StyledFormHelperText>
                            )
                        }
                    </StyledFormControl>
                );
        }
    }

    private handleChange = (event: React.ChangeEvent<{name?: string | null, value: unknown}>) => {
        if (this.valueName) {
            this.setFormDataValue(this.valueName, event.target.value);
        }
    }


    renderEditUI(): JSX.Element | null {
        return (
            <>
                {this.renderBaseDataControlEditor()}
                {this.renderTextControlBasePropertyEditor()}

                <List style={{ width: "100%" }}>
                    {this.list.map((s: string, idx: number) => (
                        <ListItem>
                            <ListItemText>
                                <TextField
                                    label="Option Label"
                                    value={s}
                                    size="small"
                                    onChange={(event) => {
                                        this.list[idx] =
                                            event.target.value;
                                        this.controlUpdate();
                                    }}
                                    key={idx}
                                />
                            </ListItemText>
                            <ListItemSecondaryAction>
                                <IconButton
                                    color="secondary"
                                    size="small"
                                    onClick={() => {
                                        this.list.splice(idx, 1);
                                        this.controlUpdate();
                                    }}
                                >
                                    <RemoveIcon />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    ))}
                </List>
                <Button
                    color="primary"
                    onClick={() => {
                        this.list.push("");
                        this.controlUpdate();
                    }}
                >
                    Add Item
                </Button>
                {this.renderTextStyleSelectionEditor()}

            </>
        )
    }

}

interface FormControlProps {
    variant: string,
    size: string,
    width?: string,
    customstyle?: string,
    error: boolean,
}

const StyledFormControl = styled(FormControl)`
    width: ${(props: FormControlProps) => props.width} !important;
    fieldset {
        border: none !important;
    }
    label {
        padding: 0 5px;
        background-color: ${({customstyle}) => customstyle==='outlined'? '#FFF' : 'unset'};
    }
    select {
        color: #01244E;
        font-weight: 400 !important;
        line-height: 20px !important;    
        border-radius: 5.65107px;
        background-color: ${({customstyle}) => customstyle==='filled'? '#E6E9ED' : 'unset'};
        padding-left: ${({customstyle}) => customstyle!=='standard'? '20px' : '0px'};
        padding-right: ${({customstyle}) => customstyle!=='standard'? '20px' : '0px'};
        &:focus {
            border-radius: 5.65107px;
            border: ${({customstyle}) => customstyle==='filled' || customstyle==='standard'? '0px' : '1.35302px'} solid ${({error}) => error? '#F65C66' : '#1873B9'};
        }
        border: ${({customstyle}) => customstyle==='filled' || customstyle==='standard'? '0px' : '1.35302px'} solid ${({error}) => error? '#F65C66' : '#E6E9ED'};
    }
    .MuiFormLabel-root.Mui-focused {
        color: ${({error}) => error? '#F65C66' : '#15466B'};
    }
    .MuiFormHelperText-contained {
        margin-left: 0px;
    }
    .MuiSelect-select.MuiSelect-select: focus {
        background-color: ${({customstyle}) => customstyle==='filled'? '#E6E9ED' : 'unset'};
    }
    .MuiFilledInput-underline:after, .MuiInput-underline:after {
        border-bottom: 1px solid #15466B;
    }
    .MuiFilledInput-underline:before, .MuiInput-underline:before {
        border-bottom: 1px solid #677C95;
        opacity: 0.3;
    }
`   as React.ComponentType<FormControlProps>