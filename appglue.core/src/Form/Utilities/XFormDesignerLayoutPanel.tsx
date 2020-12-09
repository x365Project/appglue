import React from "react";
import styled from "styled-components";
import { FormDesignConstants, FormMode } from "../FormDesignConstants";
import {FormContext} from "./FormContext";


const FormWrapper = styled("div")<{
    background?: string;
}>`
    display: flex;
    flex: 1;
    overflow: auto;
    background: ${props => (props.background || '#fff') };
    position: relative;
    flex-direction: column;
`;

const FormContent = styled("div")<{
    scroll?: boolean;
    marginTop?: number;
    marginLeft?: number;
    height?: string;
    width: number;
}>`
    margin-left: ${props => props.marginLeft || FormDesignConstants.FORM_OUTER_MARGIN}px;
    margin-top: ${props => props.marginTop || FormDesignConstants.FORM_OUTER_MARGIN}px;
    width: ${props => props.width}px;
    height: ${props => props.height ? `${props.height}` : 'auto'};
    position: relative;
    border-radius: ${props => props.width === 1336 ? '6px' : '36px'};;
    border-style: solid;
    border-color: black;
    border-width: ${props => props.width === 1336 ? '24px 24px 80px' : '60px 24px'};
    background-color: black;
    box-sizing: content-box;
    margin-bottom: 50px;

    ${
        props => 
            props.width === 1336 
            ? ` 
                &::after {
                    content: '';
                    display: block;
                    position: absolute;
                    height: 30px;
                    background: black;
                    border-radius: 6px;
                    bottom: -110px;
                    left: -80px;
                    right: -80px;
                }
                &::before {
                    content: '';
                    display: block;
                    position: absolute;
                    width: 250px;
                    height: 10px;
                    bottom: -90px;
                    left: 50%;
                    -webkit-transform: translate(-50%);
                    transform: translate(-50%);
                    background: #f1f1f1;
                    border-bottom-left-radius: 5px;
                    border-bottom-right-radius: 5px;
                    z-index: 1;
                }
            `
            : `
                &::before {
                    content: '';
                    display: block;
                    width: 60px;
                    height: 5px;
                    position: absolute;
                    top: -30px;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    background: #333;
                    border-radius: 10px;
                }
                &::after {
                    content: '';
                    display: block;
                    width: 35px;
                    height: 35px;
                    position: absolute;
                    left: 50%;
                    bottom: -65px;
                    transform: translate(-50%, -50%);
                    background: #333;
                    border-radius: 50%;
                  }
            `
    } 

`;

const Form = styled("div")<{
    hasScroll: boolean;
    fullHeight: boolean;
}>`
    overflow-y: ${props => props.hasScroll ? 'auto': 'inherit'};
    height: ${props => props.hasScroll || props.fullHeight ? '100%' : 'auto'};
`;

export class XFormDesignerLayoutPanel extends React.Component<{ editContext: FormContext, height?: number}> {

    render() {
        const hasScroll = this.props.editContext.designConfig?.size !== FormDesignConstants.FORM_SIZE_MODE_DEFINED && (
            this.props.editContext.mode === FormMode.Runtime ||
            (
                this.props.editContext.mode !== FormMode.Runtime && !(
                    this.props.editContext.form.doNotScrollLastContainerOnForm || this.props.editContext.form.doNotScrollFirstContainerOnForm
                )
            )
        );
        let height: string | undefined = 'auto';
        let width = FormDesignConstants.DESIGN_WIDTH;


        if (this.props.editContext.designConfig?.size === FormDesignConstants.FORM_SIZE_MODE_TABLET_VERTICAL) {
            height = '1024px';
            width = 768;
        } else if (this.props.editContext.designConfig?.size === FormDesignConstants.FORM_SIZE_MODE_TABLET_HORIZONTAL) {
            height = '768px';
            width = 1024;
        } else if (this.props.editContext.designConfig?.size === FormDesignConstants.FORM_SIZE_MODE_PHONE_VERTICAL) {
            height = '667px';
            width = 375;
        } else if (this.props.editContext.designConfig?.size === FormDesignConstants.FORM_SIZE_MODE_PHONE_HORIZONTAL) {
            height = '375px';
            width = 667;
        }

        const hasPinned = this.props.editContext.mode !== FormMode.Runtime && (
            this.props.editContext.form.doNotScrollLastContainerOnForm || this.props.editContext.form.doNotScrollFirstContainerOnForm
        );
        
        if (hasPinned) {
            height = undefined;
        }

        if (
            this.props.editContext.mode === FormMode.Runtime && (
                this.props.editContext.form.doNotScrollLastContainerOnForm || this.props.editContext.form.doNotScrollFirstContainerOnForm
            ) && this.props.editContext.designConfig?.size === FormDesignConstants.FORM_SIZE_MODE_DEFINED
        ) {
            height = this.props.height ? `${this.props.height}px` : 'calc(100% - 30px)';
        }
        return (
            <FormWrapper
                background={this.props.editContext.designConfig?.background === FormDesignConstants.FORM_BACKGROUND_MODE_GRAY ? FormDesignConstants.DESIGN_AREA_BACKGROUND_COLOR : undefined}
                data-testid="form-wrapper"
            >
                <FormContent width={width} height={height} marginLeft={hasPinned ? 83 : undefined} data-testid={this.props.editContext.designConfig?.background === FormDesignConstants.FORM_BACKGROUND_MODE_GRAY ? 'background-gray': 'background-white'}>
                    <Form hasScroll={hasScroll} fullHeight={this.props.editContext.mode === FormMode.Runtime}>
                        {this.props.editContext.form.render()}
                    </Form>
                </FormContent>
            </FormWrapper>
        )
    }
}