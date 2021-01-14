import styled from 'styled-components';

export const EmptyContainer = styled("div")<{
	colGap?: number;
}>`
	top: ${props => props.colGap || 0}px;
	right: ${props => props.colGap || 0}px;
	left: ${props => props.colGap || 0}px;
	bottom: ${props => props.colGap || 0}px;
	color: #01244E;
	display: flex;
	align-items: center;
	justify-content: center;
	border: 1px dashed #677C95;
	border-radius: 5px;
	font-size: 16px;
	font-family: Mulish;
	position: absolute;
	flex-wrap: wrap;
	padding: 2px 20px;
	min-height: 75px;
`;

export const ControlDiv = styled.div`
	background: #E6E9ED;
	height: 40px;
	border: 1px dashed #677C95;
	width: 238px;
	font-size: 14px;
	font-family: Mulish;
	margin: 10px 20px;
	display: flex;
	align-items: center;
	padding: 0 17px;
	border-radius: 5px;

	img {
		margin-left: 30px;
	}
`;