import React from "react";
import styled from "styled-components";
import {Button, Popover} from "@material-ui/core";
import {NotificationType} from "../FormDesignConstants";
import { ExclamationIcon } from "../../CommonUI/Icon/ExclamationIcon";
import { ExclamationRedIcon } from "../../CommonUI/Icon/ExclamationRedIcon";
import { WarningIcon } from "../../CommonUI/Icon/WarningIcon";
import { WarningRedIcon } from "../../CommonUI/Icon/WarningRedIcon";
import { ValidationIssue } from "../../Common/IDesignValidationProvider";

// @ts-ignore
const InfoButton = styled(({ type, ...otherProps }) => (
  <Button {...otherProps} />
))`

	&.MuiButtonBase-root {
		background: ${props => props.type === NotificationType.ERROR ? '#F65C66' : '#F69D5C'};
		color: #fff;
		border-radius: 20px;
		font-size: 15px;
		line-height: 18px;
		font-weight: 700;
		padding: 10px 15px;

		img {
			margin-right: 12px;
		}

		&:hover {
			background: ${props => props.type === NotificationType.ERROR ? '#FFEEED' : '#FEE8DE'};
		}
	}
`;


const NotificationList = styled.div`
	background: #fff;
	border: 1px solid #E6E9ED;
	padding: 0 10px 10px;
`;

const NotificationItem = styled.div`
	background: #E6E9ED;
	padding: 7px 6px;
	color: #01244E;
	font-size: 12px;
	line-height: 15px;
	font-family: Mulish;
	margin-top: 10px;
	display: flex;
	align-items: center;
	border-radius: 5px;

	img {
		margin-right: 9px;
		width: 12px;
	}
`;

interface INotificationRendering {
	type?: NotificationType;
	messages: ValidationIssue[];
	show?: boolean;
}

interface INotificationRenderingState {
	open: boolean;
}


export class NotificationRendering extends React.Component<INotificationRendering, INotificationRenderingState> {

	infobuttonRef: React.RefObject<HTMLDivElement> = React.createRef<HTMLDivElement>(); 

	constructor(props: INotificationRendering) {
		super(props);
		this.state = {
			open: false
		};
	}

	onClosePopover = () => {
		this.setState({
			open: false
		})
	}

	onOpenPopover = () => {
		if (this.props.messages.length > 0) {
			this.setState({
				open: true
			})
		}
	}

	render() {

		const type = this.props.type || NotificationType.ERROR;

		let buttonIcon: JSX.Element | null = null;
		let itemIcon: JSX.Element | null = null;

		if (type === NotificationType.ERROR) {
			buttonIcon = <ExclamationIcon alt="Error"/>
			itemIcon = <ExclamationRedIcon alt="Error" />
		} else if (type === NotificationType.WARNING) {
			buttonIcon = <WarningIcon alt="Warning" />
			itemIcon = <WarningRedIcon alt="Warning" />
		}

		return (
			<div ref={this.infobuttonRef} data-testid={type === NotificationType.ERROR ? 'error-notification': 'warn-notification'}>
				<InfoButton type={type} onClick={this.onOpenPopover}>
					{buttonIcon} {this.props.messages.length}
				</InfoButton>
				<Popover open={this.state.open} anchorEl={this.infobuttonRef.current} onClose={this.onClosePopover}>
					<NotificationList>
					{
						this.props.messages.map((m, idx) => {
							const message = `${m.elementId} ${m.dataName || ''} ${m.issue}`;
							return <NotificationItem key={idx}>
								{itemIcon} <span>{message}</span>
							</NotificationItem>
						})
					}
					</NotificationList>
				</Popover>
			</div>
		)
	}
}