import React from "react";

import styled from "styled-components";

import {UserFormData} from "./UserFormData";
import {XFormConfiguration} from "./XFormConfiguration";
import {FormContext} from "./Utilities/FormContext";
import {Button, TextField} from "@material-ui/core";
import {CloseIcon} from "../CommonUI/Icon/CloseIcon";
import {FormMode} from "./FormDesignConstants";

const Header = styled.div`
    display: flex;
    align-items: center;
    padding: 10px 15px;
    bottom: 100%;
    left: 0;
    width: 100%;
    position: absolute;

    .MuiButtonBase-root {
        margin-left: auto;
    }

`;

export interface IUserFormParameters {
    form: XFormConfiguration;
    formTitle?: string;
    formData?: UserFormData;
    onFormDataChange? : (data: UserFormData) => void ;
    onFormButtonClick? : (buttonName: string, data: UserFormData) => void ;
    onFormCancelButton? : () => void ;
    onFormClose? : (data: UserFormData) => void ;
}

export class XUserForm extends React.Component<IUserFormParameters, any> {
    name? : string;

    formContext: FormContext;


    constructor(props: IUserFormParameters) {
        super(props, {});

        let fContext = new FormContext(props.form);
        fContext.mode = FormMode.Runtime;

        if (this.props.formData)
            fContext.setFormData(this.props.formData);

        if (this.props.onFormDataChange)
            fContext.onFormDataChange = this.props.onFormDataChange;

        if (this.props.onFormButtonClick)
            fContext.onFormButtonClick = this.props.onFormButtonClick;

        if (this.props.onFormCancelButton)
            fContext.onFormCancelButton = this.props.onFormCancelButton;

        if (this.props.onFormClose)
            fContext.onFormClose = this.props.onFormClose;

        if (this.props.formTitle)
            fContext.formTitle = this.props.formTitle;
        
        this.formContext = fContext;

        this.props.form.setFormContext(fContext);

    }

    hasHeader = () : boolean => {
        return !!this.props.formTitle || !!this.props.onFormClose;
    }

    render() {
        return (
            <>
                {
                    this.hasHeader() && 
                    <Header>
                        {
                            this.props.formTitle && <TextField value={this.props.formTitle} data-testid="test-form-title" />
                        }
                        {
                            this.props.onFormClose && <Button onClick={() => this.props.onFormClose!(this.formContext.getFormData())} data-testid="btn-form-close">
                                <CloseIcon />
                            </Button>
                        }   
                    </Header>
                }
                {this.props.form.render()}
            </>
        );
    }
}


