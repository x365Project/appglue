import React from 'react';
import {Tab, Tooltip} from "@material-ui/core";
import {TabContext, TabList, TabPanel} from '@material-ui/lab';
import styled from "styled-components";
import {XFormDataEditing} from './Components/XFormDataEditing';
import {FormDesignConstants, FormMode, IDesignPanelConfig} from './FormDesignConstants';
import {XFormConfiguration} from './XFormConfiguration';
import {XFormAndLayoutDesignPanel} from './Utilities/XFormAndLayoutDesignPanel';
import {IAction} from "../CommonUI/IAction";
import {Topbar} from "./Components/Topbar";
import {AutoBind} from '../Common/AutoBind';
import {ISampleDataProvider} from "../Common/ISampleDataProvider";
import {IDesignValidationProvider} from "../Common/IDesignValidationProvider";
import {FormContext} from './Utilities/FormContext';
import {UserFormData} from "./UserFormData";
import {XUserFormTester} from "./Utilities/XUserFormTester";
import { LayoutIcon } from '../CommonUI/Icon/LayoutIcon';
import { FormIcon } from '../CommonUI/Icon/FormIcon';
import { RuntimeIcon } from '../CommonUI/Icon/RuntimeIcon';
import { FormEditIcon } from '../CommonUI/Icon/FormEditIcon';
import { DataIcon } from '../CommonUI/Icon/DataIcon';
import { RulesIcon } from '../CommonUI/Icon/RulesIcon';
import "./XFormDesigner.css";




export const StyledTab = styled(Tab)`
    && {
        min-width: 50px;
        width: 50px;
        height: 50px;

        color: #01244E;
        border-top: 1px solid #E6E9ED;
        border-bottom: 1px solid #E6E9ED;
        border-left: 3px solid transparent;
        text-transform: capitalize;
        font-family: Mulish;
        font-weight: 600;
        text-align: center;

        &.SidebarTab-selected {
            color: #15466B;
            border-left: 3px solid #15466B;
            background-color: #DCEAF5;
        }

		@media (min-width: 1366px) {
			min-width: calc(96px + 7 * (100vw - 1366px) / 554);
			width: calc(96px + 7 * (100vw - 1366px) / 554);
            height: auto;
            padding: calc(18px + 3 * (100vw - 1366px) / 554) 0;
            font-size: 13px;
            line-height: 16px;
		}

		@media (min-width: 1920px) {
            min-width: 103px;
            width: 103px;
            padding: 21px 0; 
            font-size: 14px;
            line-height: 18px;
		}

        .SidebarTabWrapper {
            display: flex;
            flex-flow: column;

            img {
                margin-bottom: 0px;
                @media (min-width: 1366px) {
                    margin-bottom: 9px;
                }
            }

            span {
                display: none;

                @media (min-width: 1366px) {
                    display: inline
                }
            }
        }
    }
`;

const StyledTabPanel = styled(TabPanel)`
    && {

        &:not([hidden]) {
            padding: 0;
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            overflow: auto;
            display: flex;
        }
    }
`;

const TabWrapper = styled.div`
    position: relative;
    display: flex;
    width: 100%;
    overflow: auto;
    flex: 1;
`;


export class XFormDesigner extends React.Component<{
        form: XFormConfiguration,
        formData?: UserFormData,
        formName?: string,
        onFormClose?: () => void,
        onFormSave?: (data: any) => void,
        sampleDataProvider? : ISampleDataProvider ,
        topDesignerExtensions?: IAction[],
        bottomDesignerExtensions?: IAction[],
        designConfig?: IDesignPanelConfig,
        designValidationProvider? : IDesignValidationProvider,
        initialMode?: FormMode
    },
    {
        mode: FormMode | string,
        isJsonEditing: boolean,
        nextMode: FormMode | string
    }>
{
    formName: string = '';
    // this is either designer or runtime form
    editContext: FormContext ;

    tabs: JSX.Element[] = [
        <StyledTab
            label={<TabLabelWithIcon label="Layout" icon={<LayoutIcon />} />}
            classes={{root: 'SidebarTab-root', selected: 'SidebarTab-selected'}}
            value={FormMode.LayoutDesign}
            key={FormMode.LayoutDesign}
            data-testid={FormMode.LayoutDesign}
        />,
        <StyledTab    
            label={<TabLabelWithIcon label="Form" icon={<FormIcon />} />}
            classes={{root: 'SidebarTab-root', selected: 'SidebarTab-selected'}}
            value={FormMode.FormDesign}
            key={FormMode.FormDesign}
            data-testid={FormMode.FormDesign}
        />,
        <StyledTab
            label={<TabLabelWithIcon label="Test Form" icon={<RuntimeIcon />} />}
            classes={{root: 'SidebarTab-root', selected: 'SidebarTab-selected'}}
            value={FormMode.Runtime}
            key={FormMode.Runtime}
            data-testid={FormMode.Runtime}
        />,
        <StyledTab
            label={<TabLabelWithIcon label="Edit Configuration" icon={< FormEditIcon />} />}
            classes={{root: 'SidebarTab-root', selected: 'SidebarTab-selected'}}
            value={FormMode.JSON}
            key={FormMode.JSON}
            data-testid={FormMode.JSON}
        />,
        <StyledTab
            label={<TabLabelWithIcon label="Data" icon={<DataIcon />} />}
            classes={{root: 'SidebarTab-root', selected: 'SidebarTab-selected'}}
            value={FormMode.Data}
            key={FormMode.Data}
            data-testid={FormMode.Data}
        />,
        <StyledTab
            label={<TabLabelWithIcon label="Rules" icon={<RulesIcon />} />}
            classes={{root: 'SidebarTab-root', selected: 'SidebarTab-selected'}}
            value={FormMode.Rules}
            key={FormMode.Rules}
            data-testid={FormMode.Rules}
        />
    ];

    constructor(props: {
        form: XFormConfiguration,
        formData?: UserFormData,
        formName?: string,
        onFormSave?: (data: any) => void,
        onFormClose?: () => void,
        sampleDataProvider? : ISampleDataProvider ,
        topDesignerExtensions?: IAction[],
        bottomDesignerExtensions?: IAction[],
        designConfig?: IDesignPanelConfig,
        designValidationProvider? : IDesignValidationProvider,
        initialMode?: FormMode
    })
    {

        super(props);
        this.state = {
            mode: FormMode.FormDesign,
            isJsonEditing: false,
            nextMode: FormMode.FormDesign
        }

        let eContext = new FormContext(props.form);
        eContext.designer = this;
        this.editContext = eContext;

        if (props.formData)
            eContext.setFormData(props.formData);

        eContext.formName = props.formName;
        eContext.designValidationProvider = props.designValidationProvider;
        eContext.onFormClose = props.onFormClose;
        eContext.onFormSave = props.onFormSave;
        eContext.sampleDataProvider = props.sampleDataProvider ;
        eContext.topDesignerExtensions = props.topDesignerExtensions;
        eContext.bottomDesignerExtensions = props.bottomDesignerExtensions;
        eContext.designConfig = props.designConfig || this.designConfig;

        if (props.initialMode) {
            eContext.mode = props.initialMode;
            //
            // console.log('mode:', eContext.mode);
        }

        this.props.form.setFormContext(eContext) ;

        if (props.formName) {
            this.formName = props.formName;
        }
        const { topDesignerExtensions, bottomDesignerExtensions } = props;
        if (topDesignerExtensions) {
            this.tabs.splice(
                0, 
                0, 
                ...topDesignerExtensions.map((d) => (
                    <StyledTab
                        label={<TabLabelWithIcon label={d.name} icon={d.icon} />}
                        classes={{root: 'SidebarTab-root', selected: 'SidebarTab-selected'}}
                        value={d.name}
                        key={d.name}
                        data-testid={d.name}
                    />
                ))
            )
        }
        if (bottomDesignerExtensions) {
            this.tabs = [
                ...this.tabs, 
                ...bottomDesignerExtensions.map((d) => (
                    <StyledTab
                        label={<TabLabelWithIcon label={d.name} icon={d.icon} />}
                        classes={{root: 'SidebarTab-root', selected: 'SidebarTab-selected'}}
                        value={d.name}
                        key={d.name}
                        data-testid={d.name}
                    />
                ))
            ];
        }
    }


    // form events.
    @AutoBind
    onFormSave() {
        //Save Action

        this.props.onFormSave!(this.editContext.getFormData());
    };

    @AutoBind
    onFormClose () {
        this.props.onFormClose!();
    };

    @AutoBind
    onCopy() {};

    @AutoBind
    onCut() {};

    @AutoBind
    onDelete() {};

    designConfig: IDesignPanelConfig = {
        data: FormDesignConstants.FORM_DATA_MODE_CURRENT,
        mode: FormDesignConstants.FORM_MODE_PAPER
    }

    runtimeConfig: IDesignPanelConfig = {
        data: FormDesignConstants.FORM_DATA_MODE_CURRENT,
        mode: FormDesignConstants.FORM_MODE_PAPER
    }


    @AutoBind
    handleModeChange(_event: any, mode: FormMode) {
        if (this.state.mode === FormMode.Runtime) {
            this.editContext.designConfig = this.runtimeConfig;
        } else {
            this.editContext.designConfig = this.designConfig;
        }

        if (this.state.mode !== FormMode.JSON || !this.state.isJsonEditing) {   
            this.editContext.mode = mode;
            this.setState({ mode, nextMode: mode });
        } else {
            this.setState({ nextMode: mode })
        }
    }

    onJsonEditing = (isJsonEditing: boolean) => {
        this.setState({
            isJsonEditing,
        });
    }

    onNextMode = (isLeaving: boolean) => {
        if (isLeaving) {
            this.editContext.mode = this.state.nextMode;
            this.setState({
                mode: this.state.nextMode
            });
        } else {
            this.setState({
                nextMode: this.state.mode
            });
        }

    }

    render() {

        return (
            <div style={{display: 'flex', flexDirection: 'column', height: '100vh'}}>
                <Topbar
                    editContext={this.editContext}
                />
                <TabWrapper>
                    <TabContext value={this.editContext.mode}>
                        <TabList
                            orientation="vertical"
                            onChange={this.handleModeChange}
                            classes={{indicator: 'SidebarTab-indicator', root: 'SidebarTabs', scroller: 'SidebarScroller'}}
                        >
                            {this.tabs}
                        </TabList>
                        <div style={{ display: 'flex', flex: 1, overflow: 'auto', position: 'relative' }}>
                            <StyledTabPanel value={FormMode.FormDesign}>
                                <XFormAndLayoutDesignPanel editContext={this.editContext!}/>
                            </StyledTabPanel>
                            <StyledTabPanel value={FormMode.LayoutDesign}>
                                <XFormAndLayoutDesignPanel editContext={this.editContext!} />
                            </StyledTabPanel>
                            <StyledTabPanel value={FormMode.Runtime}>
                                <XUserFormTester  editContext={this.editContext}  />
                            </StyledTabPanel>
                            <StyledTabPanel value={FormMode.JSON}>
                                <XFormDataEditing form={this.props.form} onJSONUpdating={this.onJsonEditing} isLeaving={this.state.nextMode !== FormMode.JSON} onNextMode={this.onNextMode} />
                            </StyledTabPanel>
                            <StyledTabPanel value={FormMode.Data}>
                            </StyledTabPanel>
                            <StyledTabPanel value={FormMode.Rules}>
                            </StyledTabPanel>
                            {
                                this.props.topDesignerExtensions && this.props.topDesignerExtensions.map(d => (
                                    <StyledTabPanel value={d.name} key={d.name}>
                                        {d.renderUI()}
                                    </StyledTabPanel>
                                ))
                            }
                            {
                                this.props.bottomDesignerExtensions && this.props.bottomDesignerExtensions.map(d => (
                                    <StyledTabPanel value={d.name} key={d.name}>
                                        {d.renderUI()}
                                    </StyledTabPanel>
                                ))
                            }
                        </div>
                    </TabContext>
                </TabWrapper>
            </div>
        )
    }
}

export const TabLabelWithIcon : React.FC<{icon?: JSX.Element | null, label: string}> = (props) => {
    return (
        <Tooltip title={props.label} placement="top" arrow>
            <div className="SidebarTabWrapper">
                {props.icon}
                <span>
                    {props.label}
                </span>
            </div>
        </Tooltip>
    )
}




