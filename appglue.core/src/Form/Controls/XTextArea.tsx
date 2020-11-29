import React from 'react';
import styled from 'styled-components';
import {RegisterUIControl, ControlType} from '../Utilities/RegisterUIControl';
import {TextField, TextareaAutosize} from '@material-ui/core';
import {BaseTextEntryControl} from "./BaseTextEntryControl";
import {TextAreaIcon} from "../../CommonUI/Icon/TextAreaIcon";
import FormHelperText from '@material-ui/core/FormHelperText';


@RegisterUIControl('Data (Entry)', 'Text Area', ControlType.Control, <TextAreaIcon />)
export class XTextArea extends BaseTextEntryControl {
	rowMax: number = 10;
	rowMin: number = 5;

	render() {
		return (
			<>
				<TextareaAutosize
					data-testid={this.valueName}
					style={{width: '100%'}}
					rowsMax={this.rowMax}
					rowsMin={this.rowMin}
					placeholder={this.placeholderText}
					onChange={this.handleChange}
					value={(this.valueName)?this.getFormDataValue(this.valueName):''}
				/>
				{this.hintText && (
					<StyledFormHelperText>{this.hintText}</StyledFormHelperText>
				)}
			</>
		)
	}

	private handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		if(this.valueName) {
		this.setFormDataValue(this.valueName, event.currentTarget.value);
		}    
	}

	renderEditUI(): JSX.Element | null {
		return <XTextAreaEditUI editMe={this} />;
	}
}

class XTextAreaEditUI extends React.Component<{editMe:XTextArea}> {

    render() {
        return (
            <>
				{this.props.editMe.renderBaseDataControlEditor()}
				{this.props.editMe.renderTextControlBasePropertyEditor()}

				<TextField label="Row Max" type="number" value={this.props.editMe.rowMax} onChange={event => {
                    this.props.editMe.rowMax = parseInt(event.target.value, 10);
                    this.props.editMe.designerUpdate();
                }}  />
				<TextField label="Row Min" type="number" value={this.props.editMe.rowMin} onChange={event => {
                    this.props.editMe.rowMin = parseInt(event.target.value, 10);
                    this.props.editMe.designerUpdate();
                }}  />

				{this.props.editMe.renderTextStyleSelectionEditor()}

			</>
        );
    }
}

const StyledFormHelperText = styled(FormHelperText) `
	font-family: Mulish !important;
	font-weight: 600 !important;
	font-size: 12px !important;
	line-height: 15px !important;
	margin-top: 6px !important;
	color: #677C95 !important;
`