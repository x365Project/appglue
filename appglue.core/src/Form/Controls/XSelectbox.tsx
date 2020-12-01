import React from "react";
import styled from "styled-components";
import {
    Select
} from '@material-ui/core';
import FormHelperText from '@material-ui/core/FormHelperText';
import {InputLabel} from "@material-ui/core";

import {RegisterUIControl, ControlType} from "../Utilities/RegisterUIControl";
import { PropertyEditorList } from '../../CommonUI/PropertyEditing/PropertyEditorList';
import { PropertyEditorText } from "../../CommonUI/PropertyEditing/PropertyEditorText";
import {BaseTextEntryControl} from "./BaseTextEntryControl";
import {SelectBoxIcon} from "../../CommonUI/Icon/SelectBoxIcon";
import "./XControls.css"


interface XSelectboxItem {
    value: string,
    label: string
}

@RegisterUIControl('Data (Pick)', 'Selectbox', ControlType.Control, <SelectBoxIcon />)
export class XSelectbox extends BaseTextEntryControl {
    items: XSelectboxItem[] = [];
    render() {
        return (
            <>
                {
                    this.label && (
                        <StyledInputLabel>{this.label}</StyledInputLabel>
                    )
                }            
                <StyledSelect     
                    style={{width: '100%'}}    
                    value={''}
                    native
                    onChange={this.handleChange}
                    data-testid={this.valueName}
                >
                    {this.items.map((item, index) => {
                        return (
                            <option value={item.value} key={index} >{item.label}</option>   
                        );
                    })}
                </StyledSelect>
                {
                    this.hintText && (
                        <StyledFormHelperText>{this.hintText}</StyledFormHelperText>
                    )
                }
            </>
        );
    }

    private handleChange = (event: React.ChangeEvent<{name?: string | null, value: unknown}>) => {
        if(this.valueName) {
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
                        (item: {index: number, content: XSelectboxItem}) => ({
                            onComplete : (item: {index: number, content: XSelectboxItem | null}) => {
                                if (item.content) {
                                    Reflect.set(this.items, item.index, item.content);
                                } else {
                                    this.items.splice(item.index, 1);
                                }
                                this.designerUpdate();
                            },
                            onCancel: () => {
                                // delete item.content;
                                // this.designerUpdate();
                            },
                            ui: (
                                <div>
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
                                </div>
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

const StyledSelect = styled(Select)`
    min-width: 246px;
    height: 59px;
    border: 1px solid #E6E9ED;
    box-sizing: border-box;
    border-radius: 5px;    
    padding-left: 20px;
    padding-right: 25px;
    color: #01244E;
    font-weight: 400;
    line-height: 20px;
    &:focus {
        background-color: #FFF;
        border: 2px solid rgb(63, 81, 181) !important;
        box-sizing: border-box;
        border-radius: 5px 5px 0px 0px;
    }
`
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
