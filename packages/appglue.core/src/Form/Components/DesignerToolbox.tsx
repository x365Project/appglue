import React from 'react';
import {
    Draggable,
    DraggableProvided,
    DraggableStateSnapshot,
    Droppable,
	DroppableProvided,
	DroppableStateSnapshot
} from "react-beautiful-dnd";
import styled from "styled-components";
import {Button} from '@material-ui/core';
import {Accordion, AccordionSummary, AccordionDetails, Tooltip} from '@material-ui/core';

import {UIControlRegistration, ControlType, RegistrationData} from "../Utilities/RegisterUIControl";
import {FormMode, FormDesignConstants} from "../FormDesignConstants";
import { EditIcon } from '../../CommonUI/Icon/EditIcon';
import { ExpandIcon } from '../../CommonUI/Icon/ExpandIcon';

export const Toolbox = styled.div`
	display: flex; 
	flex-direction: column;
	border: 1px solid #E6E9ED;
	border-radius: 0;
	height: 100%;
	flex-basis: 50px;

	@media (min-width: 1366px) {
		flex-basis: calc(236px + 59 * (100vw - 1366px) / 554);
	}

	@media (min-width: 1920px) {
		flex-basis: 295px;
	}

`;

const ToolboxItem = styled.div`
	border: 1px solid #E6E9ED;
	border-radius: 5px; 
	color: #677C95;
	cursor: pointer;

	font-family: Mulish;
	font-weight: 600;
	display: flex;
	align-items: center;
	justify-content: center;
	height: 28px;
	width: 28px;
	margin-bottom: 10px;

	@media (min-width: 1366px) {
		padding-left: calc(15px + 7 * (100vw - 1366px) / 554);
		padding-top: 15px;
		padding-bottom: 15px;
		height: auto;
		width: auto;
		font-size: 13px;
		line-height: 16px;
		justify-content: flex-start;
	}

	@media (min-width: 1920px) {
		padding-left: 22px;
		padding-top: 16px;
		padding-bottom: 16px;
		font-size: 14px;
		line-height: 18px;
	}

	> img {
		margin-right: 0;
		transform: scale(0.88);
		@media (min-width: 1366px) {
			transform: scale(1);
			margin-right: 16px;
		}
		@media (min-width: 1920px) {
			margin-right: 17px;
		}
	}

	span {
		display: none;
		@media (min-width: 1366px) {
			display: inline;
		}
	}
`;

const ButtonWrapperDiv = styled.div`
	display: flex;
	align-items: center;
	border-bottom: 1px solid #E6E9ED;
	padding-left: 12px;
	height: 50px;

	@media (min-width: 768px) {
		padding-left: 12px;
		height: 50px;
	}

	@media (min-width: 1366px) {
		padding-left: calc(18px + 7 * (100vw - 1366px) / 554);
		height: calc(64px + 23 * (100vw - 1366px) / 554);
	}

	@media (min-width: 1920px) {
		padding-left: 25px;
		height: 87px;
	}
`;

const SmallButton = styled(Button)`
	&& {
		background: #15466B;
		font-size: 14px;
		line-height: 18px;
		font-family: Mulish;
		font-weight: 600;
		height: 28px;
		width: 28px;
		min-width: 0;
		display: flex;
		align-items: center;
		justifiy-content: center;
		padding: 0;

		&:hover {
			background: #1873b9;
		}
	
		@media (min-width: 1366px) {
			display: flex;
			font-size: 13px;
			line-height: 16px;
			padding: 5px 13px;
			height: auto;
			width: auto;
		}
	
		@media (min-width: 1920px) {
			font-size: 14px;
			line-height: 18px;
			padding: 6px 14px;

		}

		.label {
			display: none;
			@media (min-width: 1366px) {
				display: block;
			}
		}

		.MuiButton-startIcon {
			margin: 0;

			@media (min-width: 1366px) {
				display: block;
				margin-right: 10px;
			}

			@media (min-width: 1920px) {
				margin-right: 11px;
			}
		}
	}
`;

const ToolboxContent = styled.div`

	border-top: 1px solid #E6E9ED;
	flex: 1;
	overflow: auto;
	padding-left: 12px;
	padding-right: 10px;
	padding-top: 10px;

	@media (min-width: 768px) {
		padding-left: 12px;
		padding-right: 10px;
		padding-top: 10px;
	}

	@media (min-width: 1366px) {
		padding-left: calc(18px + 7 * (100vw - 1366px) / 554);
		padding-right: calc(18px + 12 * (100vw - 1366px) / 554);
		padding-top: calc(13px + 11 * (100vw - 1366px) / 554);
	}

	@media (min-width: 1920px) {
		padding-left: 25px;
		padding-right: 30px;
		padding-top: 24px;
	}
`;

const StyledAccordion = styled(Accordion)`
	&& {
		border: none;
		box-shadow: none;
	}
`;

const StyledAccordionSummary = styled(AccordionSummary)`
	&& {
		color: #01244E;
		font-family: Mulish;
		font-weight: 600;
		display: none;
		padding: 0;
		min-height: 0 !important;

		@media (min-width: 1366px) {
			display: flex;
			margin-bottom: 13px;
			font-size: 18px;
			line-height: 23px;
		}
		@media (min-width: 1920px) {
			margin-bottom: 19px;
			font-size: 20px;
			line-height: 25px;
		}

		.MuiAccordionSummary-content {
			margin: 0;
		}
	}
`;


const StyledAccordionDetails = styled(AccordionDetails)`
	&& {
		display: flex;
		flex-direction: column;
		padding: 0;

	}
`;


interface DesignerToolBoxPropsInterface {
	onSelectFormDefaultConfig: CallableFunction;
	mode: FormMode | string
}

export class DesignerToolBox extends React.Component<DesignerToolBoxPropsInterface> {

	render() {
		return (
			<Droppable
				isDropDisabled={true}
				droppableId={'toolbox'}
			>
				{(provided: DroppableProvided, snapshot: DroppableStateSnapshot) => {
					return (
						<Toolbox
							ref={provided.innerRef}
							className="Toolbox_area"
							{...provided.droppableProps}
						>
							<ButtonWrapperDiv>
								<Tooltip title="Edit Form Defaults" placement="top">
									<SmallButton
										variant="contained"
										color="primary"
										startIcon={<EditIcon />}
										onClick={() => this.props.onSelectFormDefaultConfig()}
										data-testid="edit-form-defaults"
									>
										<span className="label">
											Edit Form Defaults
										</span>
									</SmallButton>
								</Tooltip>
							</ButtonWrapperDiv>
							<ToolboxContent>

								{
									Object.entries(
										Object.entries(UIControlRegistration).reduce((obj: {
											[key: string]: {
												name: string,
												data: RegistrationData
											}[]
										}, [name, data]) => {
											if (!obj[data.category]) {
												obj[data.category] = [];
											}
											obj[data.category].push({name, data});
											return obj;
										}, {})
									).map(([category, controls]) => {
										const doms = controls.map((control, index : number) => {
											const data = control.data
											const name = control.name
											if(this.props.mode === FormMode.LayoutDesign && data.typeOfControl === ControlType.Control) {
												return null;
											}
											if(this.props.mode === FormMode.FormDesign && data.typeOfControl === ControlType.Container) {
												return null;
											}
	
											// this code does not work.  it is the code to leave an item in the toolbox when dragging
											const shouldRenderClone = name === snapshot.draggingFromThisWith;
											return (
												<React.Fragment key={name}>
													{
														shouldRenderClone && 
															<ToolboxItem
																style={{borderColor: FormDesignConstants.TOOLBOX_LEFT_BEHIND_COLOR}}
															>
																
																{data.icon}
																<span>{data.name}</span>
															</ToolboxItem>
													}
													<Draggable
														draggableId={name}
														index={index}
													>
														{
															(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => {
																return (
																	<div
																		ref={provided.innerRef}
																		{...provided.draggableProps}
																		{...provided.dragHandleProps}
																	>
																		{
																			<Tooltip title={data.name} placement="top" arrow>
																				<ToolboxItem
																					style={{borderColor: (snapshot.isDragging? FormDesignConstants.TOOLBOX_DRAGGING_COLOR: FormDesignConstants.TOOLBOX_NOT_DRAGGING_COLOR)}}
																				>
																					{data.icon}
																					<span>{data.name}</span>
																				</ToolboxItem>
																			</Tooltip>
																		}
																	</div>
																);
															}
														}
													</Draggable>
												</React.Fragment>
												
											);
										}).filter((d) => !!d);

									if (doms.length === 0) return null;
										
										// todo: make this a method on control registration

									return <StyledAccordion defaultExpanded key={category}>
											<StyledAccordionSummary expandIcon={<ExpandIcon />}>
												{category}
											</StyledAccordionSummary>
											<StyledAccordionDetails>
												{doms}
											</StyledAccordionDetails>
										</StyledAccordion>

									})
								}
							</ToolboxContent>
							{provided.placeholder}
						</Toolbox>
					);
				}}
			</Droppable>
		)
	}
}