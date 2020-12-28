import styled from "styled-components";
import {AccordionDetails, AccordionSummary, Typography, Accordion, Menu, IconButton, Input, Button, Tooltip, ButtonGroup} from "@material-ui/core";
import MovementIcon from "../assets/images/icons/movement.svg";
import { BorderStyle } from "../Form/FormDesignConstants";
import React from "react";

export const EditLayerConfigArea = styled.div`
  position: absolute;
  border: 2px solid lightgrey;
  border-radius: 4px;
  overflow: hidden;
  display: flex;
  background: #fff;
  max-height: calc(100% - 10px);
  right: 0;
  top: 5px;
  width: 350px;
  z-index: 101;
`;

export const EditLayerStyledTypography = styled(Typography)`
    && {
        width: 100%;
        padding: 20px 0;
        display: flex;
        &:hover {
            cursor: url(${MovementIcon}), auto;
        }
    }
`;


export const EditLayerStyledAccordion = styled(Accordion)`
    && {
        display: flex;
        flex-direction: column;
        flex: 1;
        overflow: auto;

        > .MuiCollapse-container.MuiCollapse-entered {
            flex: 1;
            overflow: auto;
        }
    }
`;

export const EditLayerCloseButton = styled(IconButton)`
    && {
        position: absolute;
        right: 0px;
        top: 17px;
        height: 34px;
    }
`;


export const EditLayerStyledAccordionSummary = styled(AccordionSummary)`
    && {
        padding-right: 40px;
        &.Mui-expanded {
            border-bottom: 1px solid #E6E9ED;
        }
        
        .MuiAccordionSummary-content,
        .MuiAccordionSummary-content.Mui-expanded {
            margin: 0;
        }
    }
`;

export const EditLayerStyledAccordionDetails = styled(AccordionDetails)`
    && {
        padding-top: 20px;
        overflow: auto;

        > * {
            margin-bottom: 18px;
        }

        .MuiTypography-caption {
            margin-bottom: 10px;
        }

        .MuiCollapse-wrapperInner > div {
            margin-bottom: 18px;
            width: 100%;
        }
    }
`;


export const ContextMenuForControl = styled(Menu)`
    && {
        .MuiMenu-list {
            background: #01244E;
            border-radius: 6px;
            color: #fff;
            font-size: 14px;

            img {
                margin-right: 8px;
            }

            .MuiListItem-root {
                border-top: solid 1px #fff;

                &:first-child {
                    border-top: none;
                }
            }
        }
    }
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

export const ContainerDivider = styled("div")<{
	lineColorBetweenContainers: string;
	lineWidthBetweenContainers: number;
	lineStyleBetweenContrainers: BorderStyle;
	colGap: number;
}>`
	border: ${props => `${props.lineWidthBetweenContainers}px ${props.lineStyleBetweenContrainers} ${props.lineColorBetweenContainers}`};
	width: 100%;
	display: flex;
`;


export const TitleInput = styled(Input)`
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
        

        .TopbarInput-root {
            border: solid 1px transparent;
            border-radius: 5px;
            width: 98px;
            font-family: Mulish;

            @media (min-width: 768px) {
                width: calc(98px + 50 * (100vw - 768px) / 598);
            }

            @media (min-width: 1366px) {
                width: calc(148px + 42 * (100vw - 1366px) / 554);
            }

            @media (min-width: 1920px) {
                width: 190px;
            }
        }

        .TopbarInput-root.TopbarInput-focused {
            border-color:#E6E9ED;
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


export const StyledButton = styled(Button)`
    && {
        ${props => props.color === 'primary' && `
            background: #49A0D5;
            color: #fff;
            &:hover {
                background: #0C4385;
            }
        `}
        border-radius: 4px;
        padding: 8px 12px;
        font-family: Mulish;
        font-style: normal;
        font-weight: bold;
        font-size: 14px;
        line-height: 24px;
    }
`

export const StyledIconButton = styled(IconButton)`
    && {
        ${props => props.color === 'primary' && `
            background: #49A0D5;
            color: #fff;
            &:hover {
                background: #0C4385;
            }
        `}
        border-radius: 4px;
        padding: 8px 12px;
        font-family: Mulish;
        font-style: normal;
        font-weight: bold;
        font-size: 14px;
        line-height: 24px;
    }
`

export const TopbarSaveButton = styled(Button)`
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


export const TopbarViewButton = styled(Button)`
&& {
    height 28px;
    ${props => props.color === 'primary' && `
        background: #49A0D5;
        color: #fff;
        &:hover {
            background: #0C4385;
        }
    `}
    border-radius: 4px;
    font-family: Mulish;
    font-style: normal;
    font-weight: bold;
    font-size: 14px;
    line-height: 24px;

    @media (min-width: 768px) {
        height: calc(28px + 4 * (100vw - 768px) / 598);
        font-size: calc(10px + 2 * (100vw - 1366px) / 554);
    }

    @media (min-width: 1366px) {
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

}
`;


export const TopbarIconButton = styled(Button)`
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

		&.TopbarIconButton-selected {
			background: #F2FAFE;
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
			max-width: 20px;

			@media (min-width: 1366px) {
				transform: scale(0.78);
			}

			@media (min-width: 1920px) {
				transform: scale(1);
			}

		}
	}
`;

export const TopbarDiv = styled.div`
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


export const IconButtonWithTitle: React.FC<{action?: () => void, disabled?: boolean, title: string, icon: JSX.Element, testId?: string, selected?: boolean}> =({
	action,
	disabled,
	title,
	icon,
    testId,
    selected
}) => {
	const button = (
		<TopbarIconButton
			onClick={() => action!()}
			data-testid={testId}
            disabled={disabled}
            classes={{
                root: selected ? 'TopbarIconButton-selected' : undefined 
            }}
		>
			{icon}
		</TopbarIconButton>
	)

	if (!disabled) {
		return <Tooltip title={title} data-testid={testId}>
			{button}
		</Tooltip>
	}
	return button
}


export const StyledButtonGroup = styled(ButtonGroup)`
    && {
        border: solid 1px #E6E9ED;
        border-radius: 5px;
    }
`;