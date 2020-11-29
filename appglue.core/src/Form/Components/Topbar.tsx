import React from "react";
import styled from "styled-components";
import { 
	IconButton,
	Button,
	ButtonGroup,
	InputLabel,
	Input,
	Tooltip,
} from "@material-ui/core";

import {ToggleButtonGroup, ToggleButton}  from '@material-ui/lab';

import {ThemeProvider} from "@material-ui/styles";

import { AutoBind } from "../../Common/AutoBind";
import { FormDesignConstants, IDesignPanelConfig, FormMode } from "../FormDesignConstants";

import "./Topbar.css"
import {FormEditContext} from "../Utilities/FormEditContext";
import {theme} from "../Utilities/UITheme";
import { DropdownIcon } from "../../CommonUI/Icon/DropdownIcon";
import { DefinedIcon } from "../../CommonUI/Icon/DefinedIcon";
import { TabletHorizontalIcon } from "../../CommonUI/Icon/TabletHorizontalIcon";
import { TabletVerticalIcon } from "../../CommonUI/Icon/TabletVerticalIcon";
import { CellphoneHorizontalIcon } from "../../CommonUI/Icon/CellphoneHorizontalIcon";
import { CellphoneVerticalIcon } from "../../CommonUI/Icon/CellphoneVerticalIcon";
import { PaperIcon } from "../../CommonUI/Icon/PaperIcon";
import { BrushIcon } from "../../CommonUI/Icon/BrushIcon";
import { WebpageIcon } from "../../CommonUI/Icon/WebpageIcon";
import { OutlineIcon } from "../../CommonUI/Icon/OutlineIcon";
import { NoneIcon } from "../../CommonUI/Icon/NoneIcon";
import { DeviceIcon } from "../../CommonUI/Icon/DeviceIcon";
import { DeleteIcon } from "../../CommonUI/Icon/DeleteIcon";
import { CutIcon } from "../../CommonUI/Icon/CutIcon";
import { CopyIcon } from "../../CommonUI/Icon/CopyIcon";
import { CloseIcon } from "../../CommonUI/Icon/CloseIcon";

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
		font-size: 13px;

		@media (min-width: 768px) {
			font-size: (13px + 3 * (100vw - 768px) / 598);
		}

		@media (min-width: 1366px) {
			font-size: calc(16px + 4 * (100vw - 1366px) / 554);
		}

		@media (min-width: 1920px) {
			font-size: 20px;
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

const TopbarToggleButtonGroup = styled(ToggleButtonGroup)`
	&& {
		border: solid 1px #E6E9ED;
		border-radius: 5px;
	}
`;

const TopbarToggleButton = styled(ToggleButton)`
	&& {
		padding: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 0;
		width: 28px;
		height: 27px;
		min-width: 0;
		border: none;

		&.Mui-selected {
			background: #F2FAFE;
			margin-left: 0;
		}

		@media (min-width: 768px) {
			width: calc(28px + 10 * (100vw - 768px) / 598);
			height: calc(27px + 2 * (100vw - 768px) / 598);
		}

		@media (min-width: 1366px) {
			width: calc(38px + 12 * (100vw - 1366px) / 554);
			height: calc(29px + 9 * (100vw - 1366px) / 554);
		}

		@media (min-width: 1920px) {
			width: 50px;
			height: 40px;
		}

		img {
			transform: scale(0.67);

			@media (min-width: 1366px) {
				transform: scale(0.78);
			}

			@media (min-width: 1920px) {
				transform: scale(1);
			}

		}
	}
`;

const TopbarIconButton = styled(Button)`
	&& {
		padding: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 0;
		width: 28px;
		height: 27px;
		min-width: 0;
		border: none;
		
		@media (min-width: 768px) {
			width: calc(28px + 10 * (100vw - 768px) / 598);
			height: calc(27px + 2 * (100vw - 768px) / 598);
		}

		@media (min-width: 1366px) {
			width: calc(38px + 12 * (100vw - 1366px) / 554);
			height: calc(29px + 9 * (100vw - 1366px) / 554);
		}

		@media (min-width: 1920px) {
			width: 50px;
			height: 40px;
		}

		img {
			transform: scale(0.67);

			@media (min-width: 1366px) {
				transform: scale(0.78);
			}

			@media (min-width: 1920px) {
				transform: scale(1);
			}

		}
	}
`;

const TopbarSaveButton = styled(Button)`
	&& {
		justify-content: center;
		padding: 0;
		display: flex;
		align-items: center;	
		font-family: Mulish;
		background: #15466B;
		font-weight: bold;
		min-width: 0;
		width: 40px;
		height: 28px;
		font-size: 10px;

		&:hover {
			background: #1873b9;
		}

		@media (min-width: 768px) {
			width: calc(40px + 26 * (100vw - 768px) / 598);
			height: calc(28px + 4 * (100vw - 768px) / 598);
			font-size: calc(10px + 2 * (100vw - 1366px) / 554);
		}

		@media (min-width: 1366px) {
			width: calc(66px + 20 * (100vw - 1366px) / 554);
			height: calc(32px + 10 * (100vw - 1366px) / 554);
			font-size: calc(12px + 3 * (100vw - 1366px) / 554);
			line-height: calc(15px + 4 * (100vw - 1366px) / 554);
		}

		@media (min-width: 1920px) {
			width: 86px;
			height: 42px;
			font-size: 15px;
			line-height: 19px;
		}


		span.label {
			display: none;
			@media (min-width: 1366px) {
				display: block;
			}
		}

		img {
			display: block;
			@media (min-width: 1366px) {
				display: none;
			}
		}
	}
`;


export class Topbar extends React.Component<{editContext: FormEditContext}> {

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
			Reflect.set(des, key, value);
			console.log(Reflect.get(des, key))
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
					<TopbarItemDiv>
						<ThemeProvider theme={theme}>
							<Topbarlabel>
								Display Format
							</Topbarlabel>
							<TopbarToggleButtonGroup
								size="small"
								value={this.props.editContext.designConfig?.size}
								exclusive
								onChange={(_e:any, newValue:any) => this.onClickConfigOption('size', newValue) }
							>
								<TopbarToggleButton value={FormDesignConstants.FORM_SIZE_MODE_DEFINED}>
									<DefinedIcon alt={FormDesignConstants.FORM_SIZE_MODE_DEFINED} />
								</TopbarToggleButton>
								<TopbarToggleButton value={FormDesignConstants.FORM_SIZE_MODE_TABLET_HORIZONTAL}>
									<TabletHorizontalIcon alt={FormDesignConstants.FORM_SIZE_MODE_TABLET_HORIZONTAL} />
								</TopbarToggleButton>
								<TopbarToggleButton value={FormDesignConstants.FORM_SIZE_MODE_TABLET_VERTICAL}>
									<TabletVerticalIcon alt={FormDesignConstants.FORM_SIZE_MODE_TABLET_VERTICAL}/>
								</TopbarToggleButton>
								<TopbarToggleButton value={FormDesignConstants.FORM_SIZE_MODE_PHONE_HORIZONTAL} >
									<CellphoneHorizontalIcon alt={FormDesignConstants.FORM_SIZE_MODE_PHONE_HORIZONTAL} />
								</TopbarToggleButton>
								<TopbarToggleButton value={FormDesignConstants.FORM_SIZE_MODE_PHONE_VERTICAL} >
									<CellphoneVerticalIcon alt={FormDesignConstants.FORM_SIZE_MODE_PHONE_VERTICAL} />
								</TopbarToggleButton>
							</TopbarToggleButtonGroup>
						</ThemeProvider>
					</TopbarItemDiv>
					<TopbarItemDiv style={{marginRight: this.props.editContext.mode === FormMode.Runtime ? 'auto' : 0}}>
						<ThemeProvider theme={theme}>	
							<Topbarlabel>
								Background
							</Topbarlabel>
							<TopbarToggleButtonGroup
								size="small"
								value={this.props.editContext.designConfig?.background}
								exclusive
								onChange={(_e:any, newValue:any) => this.onClickConfigOption('background', newValue) }
							>
								<TopbarToggleButton value={FormDesignConstants.FORM_BACKGROUND_MODE_GRAY}>
									<BrushIcon alt={FormDesignConstants.FORM_BACKGROUND_MODE_GRAY} />
								</TopbarToggleButton>
								<TopbarToggleButton value={FormDesignConstants.FORM_BACKGROUND_MODE_PAPER}>
									<PaperIcon alt={FormDesignConstants.FORM_BACKGROUND_MODE_PAPER} />
								</TopbarToggleButton>
								<TopbarToggleButton value={FormDesignConstants.FORM_BACKGROUND_MODE_OUTLINE}>
									<OutlineIcon alt={FormDesignConstants.FORM_BACKGROUND_MODE_OUTLINE} />
								</TopbarToggleButton>
								<TopbarToggleButton value={FormDesignConstants.FORM_BACKGROUND_MODE_NONE}
								>
									<NoneIcon alt={FormDesignConstants.FORM_BACKGROUND_MODE_NONE} />
								</TopbarToggleButton>
							</TopbarToggleButtonGroup>
						</ThemeProvider>
					</TopbarItemDiv>
					{
						this.props.editContext.mode !== FormMode.Runtime && 
						<TopbarItemDiv style={{marginRight: 'auto'}}>
							<ThemeProvider theme={theme}>	
								<ButtonGroup
									variant="outlined"
									size="small"
									classes={{
										root: 'TopbarButtonGroup-root'
									}}
								>
									<TopbarIconButton
										classes={{
											root: 'TopbarIconButton-root'
										}}
										onClick={this.props.editContext.onCopy}
										disabled={this.props.editContext.mode === FormMode.Runtime || this.props.editContext.mode === FormMode.JSON }
									>
										<CopyIcon />
									</TopbarIconButton>
									<TopbarIconButton
										classes={{
											root: 'TopbarIconButton-root'
										}}
										onClick={this.props.editContext.onCut}
										disabled={this.props.editContext.mode === FormMode.Runtime || this.props.editContext.mode === FormMode.JSON }
									>
										<CutIcon />
									</TopbarIconButton>
									<TopbarIconButton
										classes={{
											root: 'TopbarIconButton-root'
										}}
										onClick={this.props.editContext.onDelete}
										disabled={this.props.editContext.mode === FormMode.Runtime || this.props.editContext.mode === FormMode.JSON }
									>
										<DeleteIcon />
									</TopbarIconButton>
								</ButtonGroup>
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