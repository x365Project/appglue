import React from "react";
import styled from "styled-components";
import {
    Select
} from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

import {RegisterUIControl, ControlType} from "../Utilities/RegisterUIControl";
import {PropertyEditorList} from '../../CommonUI/PropertyEditing/PropertyEditorList';
import {PropertyEditorText} from "../../CommonUI/PropertyEditing/PropertyEditorText";
import {BaseTextEntryControl} from "./BaseTextEntryControl";
import {TextControlStyle} from "../FormDesignConstants";
import {SelectBoxIcon} from "../../CommonUI/Icon/SelectBoxIcon";
import { StyledInputLabel, StyledFormHelperText } from "./XCommonStyled";
import {IssueData} from "../Utilities/FormEditContext";
import "./XControls.css"


interface XSelectboxItem {
    value: string,
    label: string
}

@RegisterUIControl('Data (Pick)', 'Selectbox', ControlType.Control, <SelectBoxIcon />)
export class XSelectbox extends BaseTextEntryControl {
    items: XSelectboxItem[] = [];
    render() {

        let style = (this.getFormRuntimeContext()?.form)?.defaultTextStyle;

        if (this.overrideStyle && this.style)
            style = this.style;

        let size : 'medium' | 'small' = (this.getFormRuntimeContext()?.form)?.defaultTextSize ?? 'medium';

        if (this.overrideStyle && this.size)
            size = this.size;

        const issueData : IssueData | null =  this.getFormRuntimeContext()!.getControlContext(this)!.getRuntimeIssueData();
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
                                {this.items.map((item, index) => {
                                    return (
                                        <option value={item.value} key={index} >{item.label}</option>   
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
                        customStyle={"filled"}
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
                            {this.items.map((item, index) => {
                                return (
                                    <option value={item.value} key={index} >{item.label}</option>   
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
                        customStyle={"outlined"}
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
                            {this.items.map((item, index) => {
                                return (
                                    <option value={item.value} key={index} >{item.label}</option>   
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
                        customStyle={"standard"}
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
                            {this.items.map((item, index) => {
                                return (
                                    <option value={item.value} key={index} >{item.label}</option>   
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

                <PropertyEditorList
                    label="Options"
                    list={this.items.map((item, index) => ({name: `Option ${index + 1}`, item: item}))}
                    showDialogCancel={false}
                    itemUI={
                        (item: {index: number, content?: XSelectboxItem}) => ({
                            onComplete : (item: {index: number, content: XSelectboxItem | null}) => {
                                if (item.content) {
                                    Reflect.set(this.items, item.index, item.content);
                                } else {
                                    this.items.splice(item.index, 1);
                                }
                                this.designerUpdate();
                            },
                            onCancel: () => {
                                delete item.content;
                                // this.designerUpdate();
                            },
                            ui: (
                                item.content && 
                                (<div>
                                    <PropertyEditorText
                                        editObject={item.content}
                                        label="Label"
                                        propertyName="label"
                                        updateCallback={this.designerUpdate}
                                    />
                                    <PropertyEditorText
                                        editObject={item.content}
                                        label="Value"
                                        propertyName="value"
                                        updateCallback={this.designerUpdate}
                                    />
                                </div>)
                            )
                        })
                    }
                    prototype={() => ({label: '', value: ''})}
                />
                {this.renderTextStyleSelectionEditor()}

            </>
        )
    }

}

interface FormControlProps {
    variant: string,
    size: string,
    width?: string,
    customStyle?: string,
    error: boolean,
}

const StyledFormControl = styled(FormControl)`
    width: ${(props: FormControlProps) => props.width} !important;
    fieldset {
        border: none !important;
    }
    label {
        padding: 0 5px;
        background-color: ${({customStyle}) => customStyle==='outlined'? '#FFF' : 'unset'};
    }
    select {
        color: #01244E;
        font-weight: 400 !important;
        line-height: 20px !important;    
        border-radius: 5.65107px;
        padding-left: ${({customStyle}) => customStyle!=='standard'? '20px' : '0px'};
        padding-right: ${({customStyle}) => customStyle!=='standard'? '20px' : '0px'};
        &:focus {
            border-radius: 5.65107px;
            border: ${({customStyle}) => customStyle==='filled' || customStyle==='standard'? '0px' : '1.35302px'} solid ${({error}) => error? '#F65C66' : '#1873B9'};
        }
        border: ${({customStyle}) => customStyle==='filled' || customStyle==='standard'? '0px' : '1.35302px'} solid ${({error}) => error? '#F65C66' : '#E6E9ED'};
    }
    .MuiFormLabel-root.Mui-focused {
        color: ${({error}) => error? '#F65C66' : '#15466B'};
    }
    .MuiFormHelperText-contained {
        margin-left: 0px;
    }
    .MuiSelect-select.MuiSelect-select: focus {
        background-color: ${({customStyle}) => customStyle==='filled'? '#E6E9ED' : 'unset'};
    }
    .MuiFilledInput-underline:after, .MuiInput-underline:after {
        border-bottom: 1px solid #15466B;
    }
    .MuiFilledInput-underline:before, .MuiInput-underline:before {
        border-bottom: 1px solid #677C95;
        opacity: 0.3;
    }
`   as React.ComponentType<FormControlProps>