import React from "react";
import styled from "styled-components";
import {
    Select
} from '@material-ui/core';

import {RegisterUIControl, ControlType} from "../Utilities/RegisterUIControl";
import { PropertyEditorList } from '../../CommonUI/PropertyEditing/PropertyEditorList';
import { PropertyEditorText } from "../../CommonUI/PropertyEditing/PropertyEditorText";
import {BaseTextEntryControl} from "./BaseTextEntryControl";
import {SelectBoxIcon} from "../../CommonUI/Icon/SelectBoxIcon";
import { StyledInputLabel, StyledFormHelperText } from "./XCommonStyled";
import {IssueData} from "../Utilities/FormContext";
import "./XControls.css"


interface XSelectboxItem {
    value: string,
    label: string
}

@RegisterUIControl('Data (Pick)', 'Selectbox', ControlType.Control, <SelectBoxIcon />)
export class XSelectbox extends BaseTextEntryControl {
    items: XSelectboxItem[] = [];
    render() {

        const issueData : IssueData | null =  this.getFormContext()!.getControlContext(this)!.getRuntimeIssueData();
        const issueText: string = issueData?.text || '';
        const customWidth = this.fullWidth ? '100%' : this.width ? `${this.width}px` : '200px';
        
        return (
            <>
                {this.label && <StyledInputLabel>{this.label}</StyledInputLabel>}
                <StyledSelect     
                    value={(this.valueName) ? this.getFormDataValue(this.valueName) : ""}
                    native
                    onChange={this.handleChange}
                    data-testid={this.valueName}
                    width={customWidth}
                    error={Boolean(issueText)}
                >
                    {this.items.map((item, index) => {
                        return (
                            <option value={item.value} key={index} >{item.label}</option>   
                        );
                    })}
                </StyledSelect>
                {
                    (issueText || this.hintText) && (
                        <StyledFormHelperText error={Boolean(issueText)} data-testid={`${this.valueName || 'selectbox'}-hinttext`}>
                            {issueText ? issueText: this.hintText}
                        </StyledFormHelperText>
                    )
                }
            </>
        );
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

const StyledSelect = styled(Select)<{width?: string}>`
    width: ${({width}) => width} !important;
    select {
        height: 59px !important;
        box-sizing: border-box !important;
        border-radius: 5px !important;    
        padding-left: 20px !important;
        padding-right: 20px !important;
        color: #01244E !important;
        font-weight: 400 !important;
        line-height: 20px !important;    
        &:focus {
            border: 1.35302px solid #1873B9 !important;    
            border: 1.35302px solid ${({error}) => error? '#F65C66' : '#1873B9'} !important;
        }
        border: 1.35302px solid ${({error}) => error? '#F65C66' : '#E6E9ED'} !important;
    }
    .MuiSelect-icon {
        right: 15px;
    }
`
