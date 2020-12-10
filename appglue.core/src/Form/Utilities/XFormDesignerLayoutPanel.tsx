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
    isDevice: boolean;
    mode?: string;
}>`
    margin-left: ${props => props.marginLeft || FormDesignConstants.FORM_OUTER_MARGIN}px;
    margin-top: ${props => props.marginTop || FormDesignConstants.FORM_OUTER_MARGIN}px;
    width: ${props => props.width}px;
    height: ${props => props.height ? `${props.height}` : 'auto'};
    position: relative;
    margin-bottom: 50px;

    ${props =>
        props.mode === FormDesignConstants.FORM_MODE_PAPER && `
            box-shadow: 0px 5px 5px -3px rgba(0,0,0,0.2), 0px 8px 10px 1px rgba(0,0,0,0.14), 0px 3px 14px 2px rgba(0,0,0,0.12);
        `
    }

    ${props =>
        props.mode === FormDesignConstants.FORM_MODE_OUTLINE && `
            border: 1px solid rgba(0, 0, 0, 0.12);
        `
    }

    ${props => 
        props.isDevice && `
            border-radius: 36px;
            border-width: 60px 24px;
            border-style: solid;
            border-color: black;
            background-color: black;
            box-sizing: content-box;
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
  
        let height: string | undefined = 'auto';
        let width = FormDesignConstants.DESIGN_WIDTH;

        let isDevice = false;


        if (this.props.editContext.designConfig?.mode === FormDesignConstants.FORM_MODE_TABLET_VERTICAL) {
            height = '1024px';
            width = 768;
            isDevice = true;
        } else if (this.props.editContext.designConfig?.mode === FormDesignConstants.FORM_MODE_TABLET_HORIZONTAL) {
            height = '768px';
            width = 1024;
            isDevice = true;
        } else if (this.props.editContext.designConfig?.mode === FormDesignConstants.FORM_MODE_PHONE_VERTICAL) {
            height = '667px';
            width = 375;
            isDevice = true;
        } else if (this.props.editContext.designConfig?.mode === FormDesignConstants.FORM_MODE_PHONE_HORIZONTAL) {
            height = '375px';
            width = 667;
            isDevice = true;
        }

        const hasScroll = isDevice;

        const hasPinned = this.props.editContext.mode !== FormMode.Runtime && (
            this.props.editContext.form.doNotScrollLastContainerOnForm || this.props.editContext.form.doNotScrollFirstContainerOnForm
        );
        
        if (hasPinned && !isDevice) {
            height = undefined;
        }

        if (
            this.props.editContext.mode === FormMode.Runtime && (
                this.props.editContext.form.doNotScrollLastContainerOnForm || this.props.editContext.form.doNotScrollFirstContainerOnForm
            ) && !isDevice
        ) {
            height = this.props.height ? `${this.props.height}px` : 'calc(100% - 30px)';
        }
        return (
            <FormWrapper
                background={this.props.editContext.designConfig?.mode === FormDesignConstants.FORM_MODE_GRAY ? FormDesignConstants.DESIGN_AREA_BACKGROUND_COLOR : undefined}
                data-testid="form-wrapper"
            >
                <FormContent
                    width={width}
                    height={height}
                    marginLeft={hasPinned ? 83 : undefined}
                    data-testid={this.props.editContext.designConfig?.mode === FormDesignConstants.FORM_MODE_GRAY ? 'background-gray': 'background-white'}
                    isDevice={isDevice}
                    mode={this.props.editContext.designConfig?.mode}   
                >
                    <Form hasScroll={hasScroll} fullHeight={this.props.editContext.mode === FormMode.Runtime}>
                        {this.props.editContext.form.render()}
                    </Form>
                </FormContent>
            </FormWrapper>
        )
    }
}