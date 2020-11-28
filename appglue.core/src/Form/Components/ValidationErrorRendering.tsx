import React from "react";
import styled from "styled-components";
import { ValidationIssue, ValidationLevel } from "../../Common/IDesignValidationProvider";
import { NotificationRendering } from "./NotificationRendering";
import { NotificationType } from "../FormDesignConstants";


const ValidationErrorRenderingDiv = styled.div`
	position: absolute;
	bottom: 24px;
	left: 24px;
	display: flex;
	z-index: 200;
	> * {
		margin-right: 16px;
	}
`;


interface IValidationErrorRendering {
	validations: ValidationIssue[];
}

export class ValidationErrorRendering extends React.Component<IValidationErrorRendering> {

	render() {

		let errors: ValidationIssue[] = [];
		let warnings: ValidationIssue[] = [];

		this.props.validations.forEach((v) => {
			if (v.level === ValidationLevel.ERROR) {
				errors.push(v);
			} else if (v.level === ValidationLevel.WARNING) {
				warnings.push(v);
			}
		})

		return (
			<ValidationErrorRenderingDiv>
				{
					errors.length > 0 && 
					<NotificationRendering messages={errors} type={NotificationType.ERROR} />
				}
				{
					warnings.length > 0 &&
					<NotificationRendering messages={warnings} type={NotificationType.WARNING} />
				}
				
			</ValidationErrorRenderingDiv>
		)
	}
}