import styled from "styled-components";
import { ToggleButtonGroup } from "@material-ui/lab";

export const ExpressionDiv = styled.div`
	display: flex;
	align-items: center;
	border: 2px solid lightgrey;
	border-radius: 8px;
	padding-top: 7px;
	padding-right: 7px;
	padding-bottom: 7px;
	padding-left: 7px;
     
`;

export const ExpressionPiece = styled("div")<{hasChild?: boolean}>`
	display: flex;
	align-items: center;
	padding-top: 4px;
	padding-right: 4px;
	padding-bottom: 4px;
	padding-left: 4px;
	font-size: 14px;
	font-weight: 600;
	font-family: Mulish;
	line-height: 20px;
	color: #677C95;

	${props => props.hasChild && `
		flex: 1;
	`};
`;

export const ExpressionLineDiv = styled.div`
	display: flex;
	align-items: center;
	flex-wrap: wrap;
	clear: left;
	width: 100%;
	margin-bottom: 3px;
	font-size: 14px;
	font-weight: 600;
	font-family: Mulish;
	line-height: 20px;
	color: #677C95;
`;

export const BracketedDiv = styled("div")<{hasChild?: boolean;}>`
	display: flex;
	align-items: center;
	padding: 2px 4px;
    margin-left: 6px;
    margin-right: 10px;
	position: relative;
	font-size: 14px;
	font-weight: 600;
	font-family: Mulish;
	line-height: 20px;
	color: #677C95;

	${props => props.hasChild && `
		flex: 1;
	`}

    &::before {
        content: '';
        width: 4px;
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        border: 1px solid #93A9BF;
        border-right: none;
        border-top-left-radius: 3px;
        border-bottom-left-radius: 3px;
    }

    &::after {
        content: '';
        width: 4px;
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        border: 1px solid #93A9BF;
        border-left: none;
        border-top-right-radius: 3px;
        border-bottom-right-radius: 3px;
    }
`;


export const RuleChangeToggleButtonGroup = styled(ToggleButtonGroup)`
	&& {
		.MuiToggleButton-root {
			border: 1px solid #93A9BF;
			box-sizing: border-box;
			width: 28px;
			height: 28px;
			border-radius: 4px;

			&:not(:last-child) {
				border-top-right-radius: 0;
    			border-bottom-right-radius: 0;
			}

			&:not(:first-child) {
				border-top-left-radius: 0;
    			border-bottom-left-radius: 0;
			}

			&.Mui-selected {
				background: #93A9BF;
			}

			&:hover {
				background: #4B6080;
			}
		}
	}
`;