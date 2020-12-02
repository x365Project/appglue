import React from "react";
import {Droppable, DroppableProvided, DroppableStateSnapshot} from "react-beautiful-dnd";
import styled from "styled-components";
import {Collapse, Divider, IconButton, Typography} from "@material-ui/core";
import {IConfigStorage} from "../Common/IConfigStorage";
import {cloneWithoutReact, spreadData} from "../Common/DataUtilities";
import {XBaseControl} from "./Controls/XBaseControl";
import {XBaseContainer} from "./Containers/XBaseContainer";
import {BorderStyle, FormDesignConstants, FormMode, TextControlSize, TextControlStyle} from "./FormDesignConstants";
import {UIControlRegistration} from "./Utilities/RegisterUIControl";
import {XContainerDesignWrapper} from "./Utilities/XDesignWrapper";
import {IEditable} from "../CommonUI/IEditable";
import {PropertyEditorInteger} from "../CommonUI/PropertyEditing/PropertyEditorInteger";
import {PropertyEditorBoolean} from "../CommonUI/PropertyEditing/PropertyEditorBoolean";
import {PropertyEditorSelect} from "../CommonUI/PropertyEditing/PropertyEditorSelect";
import {PropertyEditorColor} from "../CommonUI/PropertyEditing/PropertyEditorColor";
import {XStackContainer} from "./Containers/XStackContainer";

import {
	PropertyEditorTextSizeSelection,
	PropertyEditorTextStyleSelection
} from "../CommonUI/PropertyEditing/TextSelectionButtonGroups";
import {FormRuntimeContext, FormEditContext} from "./Utilities/FormEditContext";
import { PinIcon } from "../CommonUI/Icon/PinIcon";
import { ScrollIcon } from "../CommonUI/Icon/ScrollIcon";


export const PinnedNotifyDiv = styled("div")<{
	color?: string;
	moveRightPX?: number;
	borderWidth?: number;
}>`
	position: absolute;
	right: calc(100% + ${props => props.moveRightPX ? props.moveRightPX + 10 : 10}px);
	border-right: solid ${props => props.borderWidth || 2}px ${props => props.color || '#1873B9'};
	display: flex;
	align-items: center;
	height: 100%;
`;

export const ContainerSectionDiv = styled("div")<{
	pinned?: boolean;
}>`
	position: ${props => props.pinned ? 'relative' : 'static'};
`;


export const ContainerDiv = styled("div")<{
	colGap: number;
}>`
	margin: ${props => props.colGap || 0}px 0;
`;

export const RowDiv = styled("div")<{
	colGap: number;
	hasOverflow?: boolean;
}>`
	margin: ${props => -1 * (props.colGap || 0)}px 0;
	overflow: ${props => props.hasOverflow ? 'auto': 'initial'};
`

const ContainerDivider = styled("div")<{
	lineColorBetweenContainers: string;
	lineWidthBetweenContainers: number;
	lineStyleBetweenContrainers: BorderStyle;
	colGap: number;
}>`
	border: ${props => `${props.lineWidthBetweenContainers}px ${props.lineStyleBetweenContrainers} ${props.lineColorBetweenContainers}`};
	width: 100%;
	display: flex;
`;


export class XFormConfiguration
	extends React.Component<any, any, any>
	implements
			IConfigStorage,
			IEditable {

	private containers: XBaseContainer[] = [];

	title?: string;

	designFormWidth: number = FormDesignConstants.DESIGN_WIDTH;
	// setting this to -1 means not set
	runtimeWidth?: number | null = FormDesignConstants.RUNTIME_WIDTH;
	gapBetweenContainers: number = FormDesignConstants.GAP_BETWEEN_CONTAINERS;
	formMargin: number = FormDesignConstants.FORM_MARGIN;
	defaultInnerContainerMargin: number = FormDesignConstants.INNER_CONTAINER_MARGIN;
	defaultInnerColumnMargin?: number = FormDesignConstants.INNER_COLUMN_MARGIN
	defaultInterControlSpacing: number = FormDesignConstants.INTER_CONTROL_SPACING;

	// first container
	doNotScrollLastContainerOnForm: boolean = false;
	doNotScrollFirstContainerOnForm: boolean = false;

	defaultShowContainerBorder? : boolean = FormDesignConstants.SHOW_CONTAINER_BORDER;
	defaultContainerBorderRadius: number = FormDesignConstants.CONTAINER_BORDER_RADIOUS;
	defaultContainerBorderWidth: number = FormDesignConstants.CONTAINER_BORDER_WIDTH;
	defaultContainerBorderColor : string = FormDesignConstants.CONTAINER_BORDER_COLOR;
	defaultContainerBorderStyle : BorderStyle = FormDesignConstants.CONTAINER_BORDER_STYLE;

	showLinesBetweenContainers? : boolean = false;
	defaultLineBetweenContainerWidth: number = FormDesignConstants.CONTAINER_BORDER_WIDTH;
	defaultLineBetweenContainerColor : string = FormDesignConstants.CONTAINER_BORDER_COLOR;
	defaultLineBetweenContainerStyle : BorderStyle = FormDesignConstants.CONTAINER_BORDER_STYLE;


	formBackgroundColor: string | null = FormDesignConstants.FORM_BACKGROUND_COLOR;
	defaultContainerBackgroundColor : string | null = FormDesignConstants.CONTAINER_BACKGROUND_COLOR;

	defaultTextStyle : TextControlStyle = FormDesignConstants.DEFAULT_TEXT_STYLE;
	defaultTextSize : TextControlSize = FormDesignConstants.DEFAULT_TEXT_SIZE;

	// this is either designer or runtime form
	private _formRuntimeContext: FormRuntimeContext | null = null;
	private _formEditContext: FormEditContext | null = null;

	constructor(container?: XBaseContainer[]) {
		super({});
		this.containers = container ?? [];

		if (this.containers) {
			for (let bc of this.containers) {
				if (this._formRuntimeContext)
					bc.setFormRuntimeContext(this._formRuntimeContext);

				if (this._formEditContext)
					bc.setFormEditContext(this._formEditContext) ;
			}
		}
	}

	getFormRuntimeContext(): FormRuntimeContext | null {
		return this._formRuntimeContext ?? this._formEditContext;
	}

	setFormRuntimeContext(value: FormRuntimeContext | null) {
		if (!value)
			throw 'cannot set form context to null (Form Config)'

		this._formRuntimeContext = value;

		if (value) {
			for (let cont of this.containers) {
				cont.setFormRuntimeContext(value) ;
			}
		}
	}

	getFormEditContext(): FormEditContext | null {
		return this._formEditContext;
	}

	setFormEditContext(value: FormEditContext | null) {
		if (!value)
			throw 'cannot set form context to null (Form Config)'

		this._formEditContext = value;

		if (value) {
			for (let cont of this.containers) {
				cont.setFormEditContext(value);
			};

		}
	}


	add(container: XBaseContainer, index?: number) {
		// set control order
		if (index === undefined || index === null) {
			this.containers.push(container);
		} else {
			this.containers.splice(index, 0, container)
		}


		if (this.getFormRuntimeContext()) {
			container.setFormRuntimeContext(this.getFormRuntimeContext()!) ;
		}

		if (this.getFormEditContext()) {
			container.setFormEditContext(this.getFormEditContext()!);
		}

	}

	remove(control: XBaseContainer): void {
		const index = this.containers.indexOf(control, 0);
		if (index > -1) {
		this.containers.splice(index, 1);
		}
	}

	setOrder(id: string, order: number) {
		let controlToMove: XBaseContainer | undefined;
		for (let c of this.containers) {
			if (c.id === id) {
				controlToMove = c;
			}
		}

		if (controlToMove) {
			this.remove(controlToMove);
			this.add(controlToMove, order);
		}
	}

	getContainers(): XBaseContainer[] {
		return this.containers;
	}

	render() {
		// if there are no containers, ensure we have at least one (stack)
		if (this.containers.length === 0) {
			console.log('adding empty xstack')
			this.add(new XStackContainer());
		}

		let mode = this.getFormEditContext()?.mode ?? FormMode.Runtime;

		const formStyles: {[key: string]: any} = {
			padding: this.formMargin, 
			backgroundColor: this.formBackgroundColor ? this.formBackgroundColor : '#fff',
			position: 'relative',
			minHeight: 2 * this.gapBetweenContainers + 75
		}

		let firstContainer: XBaseControl | null = null;
		let lastContainer: XBaseControl | null = null;

		let scrollableContrainers: XBaseContainer[] = this.containers.map((c) => c);

		if (this.doNotScrollFirstContainerOnForm) {
			firstContainer = this.containers[0];
			scrollableContrainers.splice(0, 1);
		}

		if (this.doNotScrollLastContainerOnForm && this.containers.length > 1) {
			lastContainer = this.containers[this.containers.length - 1];
			scrollableContrainers.splice(-1);
		}

		const pinned = (this.doNotScrollFirstContainerOnForm || this.doNotScrollLastContainerOnForm) && scrollableContrainers.length > 0;

		const gap = this.gapBetweenContainers / 2;

		if (mode === FormMode.LayoutDesign) {
			return (
				<div key='baseformcontainer' className="App" style={formStyles}>
					<Droppable droppableId={FormDesignConstants.LAYOUT_FORM_KEY_NAME} key={'baselayoutform'}>
						{(provided: DroppableProvided, snapshot: DroppableStateSnapshot) => {
							return (
								<div
									ref={provided.innerRef}
									style={{position: 'relative', minHeight: 75}}
									{...provided.droppableProps}
								>
									<RowDiv colGap={gap} hasOverflow={!(this.doNotScrollLastContainerOnForm || this.doNotScrollFirstContainerOnForm)}>
										{
											firstContainer &&
											<ContainerSectionDiv pinned={true}>
												<PinnedNotifyDiv moveRightPX={this.formMargin}>
													<IconButton color="primary">
														<PinIcon />
													</IconButton>
												</PinnedNotifyDiv>
												<ContainerDiv colGap={gap} >
													<XContainerDesignWrapper
														id={firstContainer.id}
														index={0}
														innerComponent={firstContainer}
														editContext={this.getFormEditContext()!}
													/>
												</ContainerDiv>
											</ContainerSectionDiv>
										}
										<ContainerSectionDiv pinned={pinned}>
											{
												pinned && <PinnedNotifyDiv color="#F65C66" moveRightPX={this.formMargin}>
													<IconButton color="secondary">																																											
														<ScrollIcon />
													</IconButton>
												</PinnedNotifyDiv>
											}
											{
												scrollableContrainers.map((c: XBaseContainer, i: number) => {
													return (
														<React.Fragment key={c.id}>
															{
																this.showLinesBetweenContainers && (firstContainer || i !== 0) &&
																<ContainerDivider
																	data-testid="line-between-containers"
																	lineColorBetweenContainers={this.defaultLineBetweenContainerColor}
																	lineStyleBetweenContrainers={this.defaultLineBetweenContainerStyle}
																	lineWidthBetweenContainers={this.defaultLineBetweenContainerWidth}
																	colGap={gap}
																/>
															}
															<ContainerDiv colGap={gap}>
																<XContainerDesignWrapper
																	id={c.id}
																	index={i}
																	innerComponent={c}
																	editContext={this.getFormEditContext()!}
																/>
															</ContainerDiv>
														</React.Fragment>
													)
												})
											}
										</ContainerSectionDiv>
										{
											lastContainer &&
											<>
												{
													this.showLinesBetweenContainers && 
													<ContainerDivider
														data-testid="line-between-containers"
														lineColorBetweenContainers={this.defaultLineBetweenContainerColor}
														lineStyleBetweenContrainers={this.defaultLineBetweenContainerStyle}
														lineWidthBetweenContainers={this.defaultLineBetweenContainerWidth}
														colGap={gap}
													/>
												}
												<ContainerSectionDiv pinned={true}>
													<PinnedNotifyDiv moveRightPX={this.formMargin}>
														<IconButton color="primary">
															<PinIcon />
														</IconButton>
													</PinnedNotifyDiv>
													<ContainerDiv colGap={gap}>
														<XContainerDesignWrapper
															id={lastContainer.id}
															index={this.containers.length - 1}
															innerComponent={lastContainer}
															editContext={this.getFormEditContext()!}
														/>
													</ContainerDiv>
												</ContainerSectionDiv>
											</>
										}
										{provided.placeholder}
									</RowDiv>
								</div>
							);
						}}
					</Droppable>
				</div>
			);
		} else if (
			mode === FormMode.Runtime
			&& ( this.doNotScrollLastContainerOnForm || this.doNotScrollFirstContainerOnForm )
			&& this.containers.length > 0
		) {
			formStyles.height = '100%';

			return (
				<div key='form' className="App" style={formStyles}>
					<RowDiv colGap={gap} style={{flexFlow: 'column', maxHeight: '100%', overflow: 'hidden', display: 'flex'}}>
						{
							firstContainer && <ContainerDiv colGap={gap}>
								<XContainerDesignWrapper
									id={firstContainer.id}
									index={0}
									innerComponent={firstContainer}
									editContext={this.getFormEditContext()!}
								/>
							</ContainerDiv>
						}
						<div style={{flex: 1, overflowY: 'auto', overflowX: 'hidden'}} data-testid="no-pinned-section">
							{
								scrollableContrainers.map((c, i) => {
									return (
										<React.Fragment key={c.id}>
											{
												this.showLinesBetweenContainers && (firstContainer || i !== 0) &&
												<ContainerDivider
													data-testid="line-between-containers"
													lineColorBetweenContainers={this.defaultLineBetweenContainerColor}
													lineStyleBetweenContrainers={this.defaultLineBetweenContainerStyle}
													lineWidthBetweenContainers={this.defaultLineBetweenContainerWidth}
													colGap={gap}
												/>
											}
											<ContainerDiv colGap={gap}>
												<XContainerDesignWrapper
													id={c.id}
													index={firstContainer ? i + 1 : i}
													innerComponent={c}
													editContext={this.getFormEditContext()!}
												/>
											</ContainerDiv>
										</React.Fragment>
									)
								})
							}
						</div>
						{
							lastContainer && <ContainerDiv colGap={gap}>
								<>
									{
										this.showLinesBetweenContainers && 
										<ContainerDivider
											data-testid="line-between-containers"
											lineColorBetweenContainers={this.defaultLineBetweenContainerColor}
											lineStyleBetweenContrainers={this.defaultLineBetweenContainerStyle}
											lineWidthBetweenContainers={this.defaultLineBetweenContainerWidth}
											colGap={gap}
										/>
									}
									<XContainerDesignWrapper
										id={lastContainer.id}
										index={this.containers.length - 1}
										innerComponent={lastContainer}
										editContext={this.getFormEditContext()!}
									/>
								</>
							</ContainerDiv>
						}
					</RowDiv>
				</div>
			)
		} else {
			return (
				<div key='form' className="App" style={formStyles}>
					<RowDiv colGap={gap}  hasOverflow={mode !== FormMode.Runtime && !(this.doNotScrollLastContainerOnForm || this.doNotScrollFirstContainerOnForm)}>

						{
							firstContainer &&
							<ContainerSectionDiv pinned={true} data-testid="pin-first-container">
								<PinnedNotifyDiv moveRightPX={this.formMargin}>
									<IconButton color="primary">
										<PinIcon />
									</IconButton>
								</PinnedNotifyDiv>
								<ContainerDiv colGap={gap}>
									<XContainerDesignWrapper
										id={firstContainer.id}
										index={0}
										innerComponent={firstContainer}
										editContext={this.getFormEditContext()!}
									/>
								</ContainerDiv>
							</ContainerSectionDiv>
						}
						<ContainerSectionDiv pinned={pinned}>
							{
								pinned && <PinnedNotifyDiv color="#F65C66" moveRightPX={this.formMargin} data-testid="pin-middle-container">
									<IconButton color="secondary">
										<ScrollIcon />
									</IconButton>
								</PinnedNotifyDiv>
							}
							{
								scrollableContrainers.map((c: XBaseContainer, i: number) => {
									return (
										<React.Fragment key={c.id}>
											{
												this.showLinesBetweenContainers && (firstContainer || i !== 0) &&
												<ContainerDivider
													data-testid="line-between-containers"
													lineColorBetweenContainers={this.defaultLineBetweenContainerColor}
													lineStyleBetweenContrainers={this.defaultLineBetweenContainerStyle}
													lineWidthBetweenContainers={this.defaultLineBetweenContainerWidth}
													colGap={gap}
												/>
											}
											<ContainerDiv colGap={gap}>
												<XContainerDesignWrapper
													id={c.id}
													index={i}
													innerComponent={c}
													editContext={this.getFormEditContext()!}
												/>
											</ContainerDiv>
										</React.Fragment >
									)
								})
							}
						</ContainerSectionDiv>
						{
							lastContainer &&
							<>
								{
									this.showLinesBetweenContainers && 
									<ContainerDivider
										data-testid="line-between-containers"
										lineColorBetweenContainers={this.defaultLineBetweenContainerColor}
										lineStyleBetweenContrainers={this.defaultLineBetweenContainerStyle}
										lineWidthBetweenContainers={this.defaultLineBetweenContainerWidth}
										colGap={gap}
									/>
								}
								<ContainerSectionDiv pinned={true} data-testid="pin-last-container">
									<PinnedNotifyDiv moveRightPX={this.formMargin}>
										<IconButton color="primary">
											<PinIcon />
										</IconButton>
									</PinnedNotifyDiv>
									<ContainerDiv colGap={gap}>
										<XContainerDesignWrapper
											id={lastContainer.id}
											index={this.containers.length - 1}
											innerComponent={lastContainer}
											editContext={this.getFormEditContext()!}
										/>
									</ContainerDiv>
								</ContainerSectionDiv>
							</>
						}
					</RowDiv>
				</div>
			);
		}

	}

	find(id: string): XBaseControl | null {

		if (!this.containers)
		return null;

		for (let cont of this.containers) {
		if (cont.id === id)
			return cont;

		let res = cont.find(id);

		if (res)
			return res;
		}

		return null;
	}

	getAllControls() : XBaseControl[] {
 		let controls : XBaseControl[];
 		controls = [];

		for (let container of this.containers) {
			controls.push(...container.getControls())
		}

		return controls;
	}


	getStorageData(): object {
		let retData = cloneWithoutReact(this, ['containers', 'host', '_formEditContext', '_formRuntimeContext']);
		let containers = [];

		for (let container of this.containers) {
			containers.push(container.getStorageData());
		}

		Reflect.set(retData, '__containers', containers);

		return retData;
	}

	setStorageData(data: object): void {
		spreadData(this, data, ['__containers']);

		this.containers = [];
		let containerArray = Reflect.get(data, '__containers');

		let runtimeContext: FormRuntimeContext | null = this.getFormRuntimeContext()
		let editContext: FormEditContext | null = this.getFormEditContext();

		if (containerArray && containerArray instanceof Array && containerArray.length !== 0) {
			for (let container of containerArray) {
				let typeName = Reflect.get(container, '__type');

				if (typeName) {
					let registeredControl = UIControlRegistration[typeName];
					let val = new registeredControl.prototype.constructor();
					// @ts-ignore
					let control = val as XBaseContainer;

					if (runtimeContext) {
						control.setFormRuntimeContext(runtimeContext);
					}

					if (editContext)
						control.setFormEditContext(editContext);

					control.setStorageData(container);
					this.containers.push(control);
				}
			}
		}
	}

	refreshDesigner = (): void => {
		if (this._formEditContext) {
			this._formEditContext?.refreshDesigner();
		}
	}

	renderEditUI(): JSX.Element | null {

		return (
		<>

			<PropertyEditorBoolean
				editObject={this}
				label="Layout Borders"
				propertyName="defaultShowContainerBorder"
				updateCallback={this.refreshDesigner}
			/>
			<Collapse in={this.defaultShowContainerBorder}>
				<PropertyEditorInteger
					editObject={this}
					label="Borders Width"
					propertyName="defaultContainerBorderWidth"
					updateCallback={this.refreshDesigner}
				/>
				<PropertyEditorInteger
					editObject={this}
					label="Borders Radius"
					propertyName="defaultContainerBorderRadius"
					updateCallback={this.refreshDesigner}
				/>

				<PropertyEditorColor
					editObject={this}
					label="Borders Color"
					propertyName="defaultContainerBorderColor"
					updateCallback={this.refreshDesigner}
					parentDefaultValue={FormDesignConstants.FORM_BACKGROUND_COLOR}
				/>
				<PropertyEditorSelect
					editObject={this}
					label="Borders Style"
					propertyName="defaultContainerBorderStyle"
					updateCallback={this.refreshDesigner}
					options={FormDesignConstants.BORDER_STYLES}
				/>
			</Collapse>

			<PropertyEditorColor
				editObject={this}
				label="Form Color"
				propertyName="formBackgroundColor"
				updateCallback={this.refreshDesigner}
				parentDefaultValue={FormDesignConstants.FORM_BACKGROUND_COLOR}
			/>

			<Typography
				color="textSecondary"
				display="block"
				variant="caption"
				style={{marginTop: FormDesignConstants.FORM_SECTION_MARGIN}}
			>
				Pinned Sections
			</Typography>
			<Divider />
			<PropertyEditorBoolean
				label={'Pin First Container'}
				editObject={this}
				propertyName={'doNotScrollFirstContainerOnForm'}
				updateCallback={this.refreshDesigner}
			/>
			<PropertyEditorBoolean
				label={'Pin Last Container'}
				editObject={this}
				propertyName={'doNotScrollLastContainerOnForm'}
				updateCallback={this.refreshDesigner}
			/>

			<Typography
				color="textSecondary"
				display="block"
				variant="caption"
				style={{marginTop: FormDesignConstants.FORM_SECTION_MARGIN}}
			>
				Form Size
			</Typography>
			<Divider />
			<PropertyEditorInteger
				label={'Design Form Width'}
				editObject={this}
				propertyName={'designFormWidth'}
				updateCallback={this.refreshDesigner}
			/>
			<PropertyEditorInteger
				label={'Runtime Width'}
				editObject={this}
				propertyName={'runtimeWidth'}
				updateCallback={this.refreshDesigner}
			/>

			<Typography
			color="textSecondary"
			display="block"
			variant="caption"
			style={{marginTop: FormDesignConstants.FORM_SECTION_MARGIN}}
			>
				Spacing
			</Typography>
			<Divider />
			
			<PropertyEditorInteger
				label={'Between Layouts'}
				editObject={this}
				propertyName={'gapBetweenContainers'}
				updateCallback={this.refreshDesigner}
				parentDefaultValue={FormDesignConstants.GAP_BETWEEN_CONTAINERS}
			/>

			<PropertyEditorBoolean
				editObject={this}
				label="Line Between Containers"
				propertyName="showLinesBetweenContainers"
				updateCallback={this.refreshDesigner}
			/>
			<Collapse in={this.showLinesBetweenContainers}>
				<PropertyEditorInteger
					editObject={this}
					label="Line Width"
					propertyName="defaultLineBetweenContainerWidth"
					updateCallback={this.refreshDesigner}
				/>

				<PropertyEditorColor
					editObject={this}
					label="Line Color"
					propertyName="defaultLineBetweenContainerColor"
					updateCallback={this.refreshDesigner}
				/>
				<PropertyEditorSelect
					editObject={this}
					label="Line Style"
					propertyName="defaultLineBetweenContainerStyle"
					updateCallback={this.refreshDesigner}
					options={FormDesignConstants.BORDER_STYLES}
				/>
			</Collapse>

			<PropertyEditorInteger 
				label={'Around Form'}
				editObject={this}
				propertyName={'formMargin'}
				updateCallback={this.refreshDesigner}
			/>


			<Typography
				color="textSecondary"
				display="block"
				variant="caption"
				style={{marginTop: FormDesignConstants.FORM_SECTION_MARGIN}}
			>
				Default Text Field Style
			</Typography>
			<Divider />
			<PropertyEditorTextStyleSelection updateCallback={this.refreshDesigner} propertyName={'defaultTextStyle'} editObject={this}/>
			<PropertyEditorTextSizeSelection updateCallback={this.refreshDesigner} propertyName={'defaultTextSize'} editObject={this}/>

			<Typography
			color="textSecondary"
			display="block"
			variant="caption"
			style={{marginTop: FormDesignConstants.FORM_SECTION_MARGIN}}
			>
				Defaults
			</Typography>
			<Divider />
			
			<PropertyEditorInteger
				label={'Container Inner Margin'}
				editObject={this}
				propertyName={'defaultInnerContainerMargin'}
				updateCallback={this.refreshDesigner}
			/>
			<PropertyEditorInteger
				label={'Column Inner Margin'}
				editObject={this}
				propertyName={'defaultInnerColumnMargin'}
				updateCallback={this.refreshDesigner}
			/>
			<PropertyEditorInteger
				label={'Space Between Controls'}
				editObject={this}
				propertyName={'defaultInterControlSpacing'}
				updateCallback={this.refreshDesigner}
			/>

			<PropertyEditorColor
				editObject={this}
				label="Container Color"
				propertyName="defaultContainerBackgroundColor"
				updateCallback={this.refreshDesigner}
				parentDefaultValue={FormDesignConstants.CONTAINER_BACKGROUND_COLOR}
			/>

		</>
		);
	}


}
