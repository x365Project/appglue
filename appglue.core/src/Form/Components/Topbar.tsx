import React from "react";
import styled from "styled-components";
import { 
	Button,
	ButtonGroup,
	InputLabel,
	Input,
	Tooltip
} from "@material-ui/core";

import {ThemeProvider} from "@material-ui/styles";

import { AutoBind } from "../../Common/AutoBind";
import { FormDesignConstants,  FormMode } from "../FormDesignConstants";

import "./Topbar.css"
import {FormContext} from "../Utilities/FormContext";
import {theme} from "../Utilities/UITheme";
import { DropdownIcon } from "../../CommonUI/Icon/DropdownIcon";
import { DefinedIcon } from "../../CommonUI/Icon/DefinedIcon";
import { TabletHorizontalIcon } from "../../CommonUI/Icon/TabletHorizontalIcon";
import { TabletVerticalIcon } from "../../CommonUI/Icon/TabletVerticalIcon";
import { CellphoneHorizontalIcon } from "../../CommonUI/Icon/CellphoneHorizontalIcon";
import { CellphoneVerticalIcon } from "../../CommonUI/Icon/CellphoneVerticalIcon";
import { PaperIcon } from "../../CommonUI/Icon/PaperIcon";
import { BrushIcon } from "../../CommonUI/Icon/BrushIcon";
import { OutlineIcon } from "../../CommonUI/Icon/OutlineIcon";
import { NoneIcon } from "../../CommonUI/Icon/NoneIcon";
import { DeleteIcon } from "../../CommonUI/Icon/DeleteIcon";
import { CutIcon } from "../../CommonUI/Icon/CutIcon";
import { CopyIcon } from "../../CommonUI/Icon/CopyIcon";
import { CloseIcon } from "../../CommonUI/Icon/CloseIcon";
import { PasteIcon } from "../../CommonUI/Icon/PasteIcon";
import { ObserveState } from "../../CommonUI/StateManagement/ObserveState";
import { TopbarIconButton, TopbarSaveButton, IconButtonWithTitle, StyledButtonGroup } from "../../CommonUI/CommonStyles";

const SelectDiv = styled.div`
	position: relative;
`;

const DropDownDiv = styled.div`
	position: absolute;
	right: 0;
	top: 0;
	height: 100%;
	width: 36px;
	display: flex;
	align-items: center;
	justify-content: center;
	background: #E6E9ED;
	width: 25px;

	@media (min-width: 768px) {
		width: calc(25px + 2 * (100vw - 768px) / 598);
	}

	@media (min-width: 1366px) {
		width: calc(27px + 9 * (100vw - 1366px) / 554);
	}

	@media (min-width: 1920px) {
		width: 36px;
	}
`;


const FormTitleInput = styled(Input)`
	&& {
		color: #01244E;
		font-size: 14px;
		font-weight: bold;

		@media (min-width: 768px) {
			font-size: (14px + 4 * (100vw - 768px) / 598);
		}

		@media (min-width: 1366px) {
			font-size: calc(18px + 6 * (100vw - 1366px) / 554);
		}

		@media (min-width: 1920px) {
			font-size: 24px;
		}

		input {
			padding: 0px 6px;
			height: 27px;

			@media (min-width: 768px) {
				height: calc(27px + 2 * (100vw - 768px) / 598);
			}
	
			@media (min-width: 1366px) {
				height: calc(29px + 9 * (100vw - 1366px) / 554);
			}
	
			@media (min-width: 1920px) {
				height: 40px;
			}
		}
	}
`;

const TopbarDiv = styled.div`
	display: flex;
	width: 100%;
	align-items: flex-end;
	padding: 13px 15px;

	@media (min-width: 768px) {
		padding-left: calc(15px + 4 * (100vw - 768px) / 598);
		padding-right: calc(15px + 4 * (100vw - 768px) / 598);
		padding-top: calc(13px + 6 * (100vw - 768px) / 598);
		padding-bottom: calc(13px + 6 * (100vw - 768px) / 598);
	}

	@media (min-width: 1366px) {
		padding-left: calc(19px + 4 * (100vw - 1366px) / 554);
		padding-right: calc(19px + 4 * (100vw - 1366px) / 554);
		padding-top: calc(19px + 4 * (100vw - 1366px) / 554);
		padding-bottom: calc(19px + 4 * (100vw - 1366px) / 554);
	}

	@media (min-width: 1920px) {
		padding: 23px;
	}
`;

const TopbarItemDiv = styled.div`
	display: flex;
	align-items: center;
	flex-direction: column;
	justify-content: flex-start;
	margin-left: 18px;

	&:first-child {
		margin-left: 0px;
	}

	@media (min-width: 1366px) {
		flex-direction: row;
		margin-left: calc(37px + 24 * (100vw - 1366px) / 554);
	}

	@media (min-width: 1920px) {
		margin-left: 70px;
	}

	> div {
		margin-left: 0px;

		@media (min-width: 1366px) {
			margin-left: calc(12px + 12 * (100vw - 1366px) / 554);

			&:first-child {
				margin-left: 0;
			}
		}
	
		@media (min-width: 1920px) {
			margin-left: 24px;
		}
	}
`

const Topbarlabel = styled(InputLabel)`
	&& {
		margin-bottom: 5px;
		font-size: 11px;
		font-weight: 600;
		font-family: Mulish;
		width: 100%;
		font-size: 11px;
		line-height: 14px;
	
		@media (min-width: 1366px) {
			width: auto;
			margin-bottom: 0px;
			font-size: 12px;
			line-height: 15px;
		}

		@media (min-width: 1920px) {
			font-size: 14px;
			line-height: 17px;
		}
	}
`;


class TopbarActionGroup extends React.Component<{editContext: FormContext}> {

	@AutoBind
	isActionDisabled() {
		return !(this.props.editContext.mode === FormMode.FormDesign || this.props.editContext.mode === FormMode.LayoutDesign) || !this.props.editContext.getLastSelectedId()
	}

	render() {
		return (
			<ObserveState
				listenTo={this.props.editContext}
				control={ () => 
					<StyledButtonGroup
						variant="outlined"
						size="small"
					>
						<IconButtonWithTitle
							title="Copy"
							icon={<CopyIcon />}
							disabled={this.isActionDisabled()}
							testId="btn-topbar-copy"
							action={this.props.editContext.onCopy}
						/>
						<IconButtonWithTitle
							title="Cut"
							icon={<CutIcon />}
							disabled={this.isActionDisabled()}
							testId="btn-topbar-cut"
							action={this.props.editContext.onCut}
						/>
						<IconButtonWithTitle
							title="Paste"
							icon={<PasteIcon />}
							disabled={this.isActionDisabled() || !this.props.editContext.clipboardControl || !this.props.editContext.getLastSelectedId()}
							testId="btn-topbar-paste"
							action={this.props.editContext.onPaste}
						/>
						<IconButtonWithTitle
							title="Delete"
							icon={<DeleteIcon />}
							disabled={this.isActionDisabled()}
							testId="btn-topbar-delete"
							action={this.props.editContext.onDelete}
						/>
					</StyledButtonGroup>
				}
			/>
		)
	}

}


export class Topbar extends React.Component<{editContext: FormContext}> {


	@AutoBind
	onChangeFormTitle(event: React.ChangeEvent<HTMLInputElement>) {
		let des = this.props.editContext;
		if (des) {
			des.formName =  event.target.value;
			this.props.editContext.refreshDesigner();
		}

	}

	@AutoBind
	onChangeFormDataMode(event: React.ChangeEvent<{name?: string, value: unknown}>) {
		let des = this.props.editContext.designConfig;

		if (des)
			des.data = event.target.value + '';

		this.props.editContext.refreshDesigner();
	}

	@AutoBind
	onClickConfigOption(key: string, value: string) {
		let des = this.props.editContext.designConfig;
		if (des) {
			const originValue = Reflect.get(des, key);
			if (originValue !== value) {
				Reflect.set(des, key, value);
			}

			this.props.editContext.refreshDesigner();
		}
	}

	render() {
		const formName = this.props.editContext.formName;
		return (
			<div style={{width: '100%', overflow: 'auto', borderBottom: '1px solid #E6E9ED'}}>
				<TopbarDiv>
					{
						formName &&
						<TopbarItemDiv>
							<FormTitleInput
								classes={{
									input: 'TopbarInput',
									focused: 'TopbarInput-focused',
									root: `TopbarInput-root`
								}}
								data-testid="formName"
								inputProps={{ 'aria-label': 'Form Name' }}
								value={formName}
								disableUnderline
								onChange={this.onChangeFormTitle}
							/>
						</TopbarItemDiv>
					}
					<TopbarItemDiv>
						<ThemeProvider theme={theme}>
							<Topbarlabel>
								Show Data
							</Topbarlabel>
							<SelectDiv className="TopbarSelect-root">
								<DropDownDiv>
									<DropdownIcon />
								</DropDownDiv>
								<select
									value={this.props.editContext.designConfig?.data}
									onChange={this.onChangeFormDataMode}
									className="MuiSelect-root MuiSelect-select TopbarSelect MuiSelect-outlined MuiInputBase-input MuiOutlinedInput-input"
								>
								{
									FormDesignConstants.FORM_DATA_MODE.map((m, idx) => (
										<option key={idx}>{m}</option>
									))
								}
								</select>
							</SelectDiv>
						</ThemeProvider>
					</TopbarItemDiv>
					<TopbarItemDiv style={{marginRight: this.props.editContext.mode !== FormMode.Runtime ? 'auto' : 0 }}>
						<ThemeProvider theme={theme}>
							<Topbarlabel>
								Display Format
							</Topbarlabel>
							<StyledButtonGroup
								variant="outlined"
								size="small"
							>
								<Tooltip title="Paper">
									<TopbarIconButton
										data-testid="btn-mode-paper"
										classes={{
											root: this.props.editContext.designConfig?.mode === FormDesignConstants.FORM_MODE_PAPER ? 'TopbarIconButton-selected' : undefined 
										}}
										onClick={() => this.onClickConfigOption('mode', FormDesignConstants.FORM_MODE_PAPER)}
									>
										<PaperIcon alt={FormDesignConstants.FORM_MODE_PAPER} />
									</TopbarIconButton>
								</Tooltip>
								<Tooltip title="Gray">
									<TopbarIconButton
										data-testid="btn-mode-gray"
										classes={{
											root: this.props.editContext.designConfig?.mode === FormDesignConstants.FORM_MODE_GRAY ? 'TopbarIconButton-selected' : undefined
										}}
										onClick={() => this.onClickConfigOption('mode', FormDesignConstants.FORM_MODE_GRAY)}
									>
										<BrushIcon alt={FormDesignConstants.FORM_MODE_GRAY} />
									</TopbarIconButton>
								</Tooltip>
								<Tooltip title="Outline">
									<TopbarIconButton
										data-testid="btn-mode-outline"
										classes={{
											root: this.props.editContext.designConfig?.mode === FormDesignConstants.FORM_MODE_OUTLINE ? 'TopbarIconButton-selected' : undefined 
										}}
										onClick={() => this.onClickConfigOption('mode', FormDesignConstants.FORM_MODE_OUTLINE)}
									>
										<OutlineIcon alt={FormDesignConstants.FORM_MODE_OUTLINE} />
									</TopbarIconButton>
								</Tooltip>
								<Tooltip title="White">
									<TopbarIconButton
										data-testid="btn-mode-white"
										classes={{
											root: this.props.editContext.designConfig?.mode === FormDesignConstants.FORM_MODE_WHITE ? 'TopbarIconButton-selected' : undefined 
										}}
										onClick={() => this.onClickConfigOption('mode', FormDesignConstants.FORM_MODE_WHITE)}
									>
										<NoneIcon alt={FormDesignConstants.FORM_MODE_WHITE} />
									</TopbarIconButton>
								</Tooltip>
								<Tooltip title={FormDesignConstants.FORM_MODE_TABLET_HORIZONTAL}>
									<TopbarIconButton
										data-testid="btn-mode-tablet-horizontal"
										classes={{
											root: this.props.editContext.designConfig?.mode === FormDesignConstants.FORM_MODE_TABLET_HORIZONTAL ? 'TopbarIconButton-selected': undefined
										}}
										onClick={() => this.onClickConfigOption('mode', FormDesignConstants.FORM_MODE_TABLET_HORIZONTAL)}
									>
										<TabletHorizontalIcon alt={FormDesignConstants.FORM_MODE_TABLET_HORIZONTAL} />
									</TopbarIconButton>
								</Tooltip>
								<Tooltip title={FormDesignConstants.FORM_MODE_TABLET_VERTICAL}>
									<TopbarIconButton
										data-testid="btn-mode-tablet-vertical"
										classes={{
											root: this.props.editContext.designConfig?.mode === FormDesignConstants.FORM_MODE_TABLET_VERTICAL ? 'TopbarIconButton-selected': undefined
										}}
										onClick={() => this.onClickConfigOption('mode', FormDesignConstants.FORM_MODE_TABLET_VERTICAL)}
									>
										<TabletVerticalIcon alt={FormDesignConstants.FORM_MODE_TABLET_VERTICAL}/>
									</TopbarIconButton>
								</Tooltip>
								<Tooltip title={FormDesignConstants.FORM_MODE_PHONE_HORIZONTAL}>
									<TopbarIconButton
										data-testid="btn-mode-phone-horizontal"
										classes={{
											root: this.props.editContext.designConfig?.mode === FormDesignConstants.FORM_MODE_PHONE_HORIZONTAL ? 'TopbarIconButton-selected': undefined
										}}
										onClick={() => this.onClickConfigOption('mode', FormDesignConstants.FORM_MODE_PHONE_HORIZONTAL)}
									>
										<CellphoneHorizontalIcon alt={FormDesignConstants.FORM_MODE_PHONE_HORIZONTAL} />
									</TopbarIconButton>
								</Tooltip>
								<Tooltip title={FormDesignConstants.FORM_MODE_PHONE_VERTICAL}>
									<TopbarIconButton
										data-testid="btn-mode-phone-vertical"
										classes={{
											root: this.props.editContext.designConfig?.mode === FormDesignConstants.FORM_MODE_PHONE_VERTICAL ? 'TopbarIconButton-selected': undefined
										}}
										onClick={() => this.onClickConfigOption('mode', FormDesignConstants.FORM_MODE_PHONE_VERTICAL)}
									>
										<CellphoneVerticalIcon alt={FormDesignConstants.FORM_MODE_PHONE_VERTICAL} />
									</TopbarIconButton>
								</Tooltip>
							</StyledButtonGroup>
						</ThemeProvider>
					</TopbarItemDiv>
					{
						this.props.editContext.mode !== FormMode.Runtime && 
						<TopbarItemDiv style={{marginRight: 'auto'}}>
							<ThemeProvider theme={theme}>	
								<TopbarActionGroup editContext={this.props.editContext} />
							</ThemeProvider>
						</TopbarItemDiv>
					}
					{
						this.props.editContext.onFormSave && <TopbarItemDiv>
							<TopbarSaveButton
								onClick={this.props.editContext.onFormSave}
								color="primary"
								variant="contained"
								data-testid="btn-form-save"
							>
								Save
							</TopbarSaveButton>
						</TopbarItemDiv>
					}
					{
						this.props.editContext.onFormClose && <TopbarItemDiv>
							<TopbarIconButton onClick={this.props.editContext.onFormClose} data-testid="btn-form-close">
								<CloseIcon />
							</TopbarIconButton>
						</TopbarItemDiv>
					}
				</TopbarDiv>
			</div>
		)
	}
}