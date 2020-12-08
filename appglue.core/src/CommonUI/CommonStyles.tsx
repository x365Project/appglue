import styled from "styled-components";
import {AccordionDetails, AccordionSummary, Typography, Accordion, Menu, IconButton} from "@material-ui/core";
import MovementIcon from "../assets/images/icons/movement.svg";
import { BorderStyle } from "../Form/FormDesignConstants";

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
