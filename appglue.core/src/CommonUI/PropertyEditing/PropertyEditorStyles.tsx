import React from "react";
import TextField, {TextFieldProps} from "@material-ui/core/TextField"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import styled from "styled-components";

import { Switch } from "@material-ui/core";


export enum TextFieldDisplayType {
	Error = 'error',
	Success = 'success',
	Default = 'default'
}

export const StyledTextField = styled(({displayType, ...rest}: TextFieldProps & {displayType?: TextFieldDisplayType}) => (
  <TextField {...rest} />
))`
	&& {
		font-family: Mulish;
		font-style: normal;
		font-weight: 600;
		font-size: 14px;
		line-height: 24px;

		${props => props.label && `
			margin-top: 20px;
		`}


		${props => (!props.displayType || props.displayType === TextFieldDisplayType.Default) && `
			color: #677C95;    
			.MuiInputBase-root {
				border: 1px solid #D8E4EE;

				&.Mui-focused {
					border: 1px solid #93A9BF;
				}
			}

			.MuiInput-underline:after {
				border: 2px solid #93A9BF;
			}

			.MuiInputBase-input,
			.MuiFormHelperText-root {
				color: #677C95;
			}
		`}

		${props => props.displayType === TextFieldDisplayType.Success && `
			color: #4CAF50;
			.MuiInputBase-root {
				border: 1px solid #4CAF50;
			}

			.MuiInput-underline:after {
				border: 2px solid #4CAF50;
			}

			.MuiInputBase-input,
			.MuiFormHelperText-root {
				color: #4CAF50;
			}
		`}

		${props => props.displayType === TextFieldDisplayType.Error && `
			color: #F98784;
			.MuiInputBase-root {
				border: 1px solid #F98784;
			}

			.MuiInput-underline:after {
				border: 2px solid #F98784;
			}

			.MuiInputBase-input,
			.MuiFormHelperText-root {
				color: #F98784;
			}
		`}

		.MuiInputBase-root {
			box-sizing: border-box;
			border-radius: 4px;
		}

		.MuiOutlinedInput-input,
		.MuiInput-underline .MuiInputBase-input  {
			padding: 6px 12px;
		}

		.MuiFormLabel-root {
			display: block;
			font-family: Mulish;
			font-style: normal;
			font-weight: bold;
			font-size: 14px;
			line-height: 24px;
		}

		.MuiInputBase-input {
			line-height: 24px;
			height: auto;
		}

		.MuiInputLabel-formControl {
			transform: translate(12px, 6px) scale(1);
			${props => props.displayType === TextFieldDisplayType.Error && `
				color: #F98784;
			`}
			${props => props.displayType === TextFieldDisplayType.Success && `
				color: #4CAF50;
			`}
			${props =>(!props.displayType || props.displayType === TextFieldDisplayType.Default) && `
				color: #677C95;
			`}

			&.MuiInputLabel-shrink {
				color: #677C95;
				transform: translate(0,-18px) scale(0.75);
			}
		}

		.MuiOutlinedInput-notchedOutline {
			display: none;
		}

		label + .MuiInput-formControl {
			margin-top: 0;
		}

	}
`;

export const StyledFormControlForSwitch = styled(FormControlLabel)`
	&& {
		.MuiFormControlLabel-label {
			color: #93A9BF;
			display: block;
			font-family: Mulish;
			font-style: normal;
			font-weight: bold;
			font-size: 14px;
			line-height: 24px;
		}

	}
`

export const StyledSwitch = styled(Switch)`
	&& {

		height: 48px;
		width: 76px;

		.MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track {
			background: #00B2A4;
			opacity: 0.2;
		}

		.MuiSwitch-track {
			background-color: #EBF4FA;
			opacity: 1;
			border-radius: 12px;
		}

		.MuiSwitch-switchBase {
			padding: 14px;

			.MuiSwitch-thumb {
				border: solid 2px #fff;
				background-color: #93A9BF;
			}

			&.Mui-checked {
				transform: translateX(28px);

				.MuiSwitch-thumb {
					background-color: #00B2A4;
				}
			}
		}
	}

`;

