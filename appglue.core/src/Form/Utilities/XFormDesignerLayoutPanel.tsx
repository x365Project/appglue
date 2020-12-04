import React from "react";
import {Paper} from "@material-ui/core";
import styled from "styled-components";
import { FormDesignConstants, FormMode } from "../FormDesignConstants";
import {FormEditContext} from "./FormEditContext";


const FormWrapper = styled("div")<{
    background?: string;
}>`
    display: flex;
    flex: 1;
    overflow: auto;
    background: ${props => (props.background || '#fff') };
    position: relative;
    max-height: 100vh;
`;

const FormContent = styled("div")<{
    scroll?: boolean;
    marginTop?: number;
    marginLeft?: number;
    height?: number;
}>`
    margin-left: ${props => props.marginLeft || FormDesignConstants.FORM_OUTER_MARGIN}px;
    margin-top: ${props => props.marginTop || FormDesignConstants.FORM_OUTER_MARGIN}px;
    max-height: ${props => props.scroll ? (props.height && `${props.height}px`) || '100%' : 'none'};
    position: relative;
`;

export class XFormDesignerLayoutPanel extends React.Component<{ editContext: FormEditContext, height?: number }> {

    render() {
        const formStyles: {[key: string]: any} = {
            marginBottom: 30,
            width: this.props.editContext.form.getWidth()
        };

        const hasScroll = this.props.editContext.designConfig?.size !== FormDesignConstants.FORM_SIZE_MODE_DEFINED && (
            this.props.editContext.mode === FormMode.Runtime ||
            (
                this.props.editContext.mode !== FormMode.Runtime && !(
                    this.props.editContext.form.doNotScrollLastContainerOnForm || this.props.editContext.form.doNotScrollFirstContainerOnForm
                )
            )
        );

        if (this.props.editContext.designConfig?.size === FormDesignConstants.FORM_SIZE_MODE_TABLET_VERTICAL) {
            formStyles.height = 1024;
            formStyles.width = 768;
        } else if (this.props.editContext.designConfig?.size === FormDesignConstants.FORM_SIZE_MODE_TABLET_HORIZONTAL) {
            formStyles.height = 768;
            formStyles.width = 1024;
        } else if (this.props.editContext.designConfig?.size === FormDesignConstants.FORM_SIZE_MODE_PHONE_VERTICAL) {
            formStyles.height = 667;
            formStyles.width = 375;
        } else if (this.props.editContext.designConfig?.size === FormDesignConstants.FORM_SIZE_MODE_PHONE_HORIZONTAL) {
            formStyles.height = 375;
            formStyles.width = 667;
        }

        const hasPinned = this.props.editContext.mode !== FormMode.Runtime && (
            this.props.editContext.form.doNotScrollLastContainerOnForm || this.props.editContext.form.doNotScrollFirstContainerOnForm
        );
        
        if (hasPinned) {
            formStyles.height = undefined;
        }

        if (
            this.props.editContext.mode === FormMode.Runtime && (
                this.props.editContext.form.doNotScrollLastContainerOnForm || this.props.editContext.form.doNotScrollFirstContainerOnForm
            ) && this.props.editContext.designConfig?.size === FormDesignConstants.FORM_SIZE_MODE_DEFINED
        ) {
            formStyles.height = this.props.height ? this.props.height : 'calc(100% - 30px)';
        }

        if (hasScroll) {
            formStyles.overflowY = 'auto';
            formStyles.overflowX = 'visible';
            formStyles.position = 'relative';
        }

        return (
            <FormWrapper
                background={this.props.editContext.designConfig?.background === FormDesignConstants.FORM_BACKGROUND_MODE_GRAY ? FormDesignConstants.DESIGN_AREA_BACKGROUND_COLOR : undefined}
            >
                <FormContent
                    scroll={hasScroll}
                    marginLeft={hasPinned ? 83 : undefined}
                    data-testid="form-wrapper"
                >
                    {
                        (!this.props.editContext.designConfig ||
                            this.props.editContext.designConfig?.background === FormDesignConstants.FORM_BACKGROUND_MODE_PAPER) && (
                            <Paper elevation={8} style={formStyles} data-testid="background-paper">
                                {this.props.editContext.form.render()}
                            </Paper>
                        )
                    }
                    {
                        this.props.editContext.designConfig?.background === FormDesignConstants.FORM_BACKGROUND_MODE_OUTLINE && (
                            <Paper variant="outlined" style={formStyles} data-testid="background-outline">
                                {this.props.editContext.form.render()}
                            </Paper>
                        )
                    }
                    {
                        this.props.editContext.designConfig?.background === FormDesignConstants.FORM_BACKGROUND_MODE_GRAY && (
                            <div style={formStyles}  data-testid="background-gray">
                                {this.props.editContext.form.render()}
                            </div>
                        )
                    }
                    {
                        this.props.editContext.designConfig?.background === FormDesignConstants.FORM_BACKGROUND_MODE_NONE && (
                            <div style={formStyles} data-testid="background-white">
                                {this.props.editContext.form.render()}
                            </div>
                        )
                    }
                </FormContent>
            </FormWrapper>
        )
    }
}