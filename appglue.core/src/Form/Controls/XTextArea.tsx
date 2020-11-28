import React from 'react';
import {RegisterUIControl, ControlType} from '../Utilities/RegisterUIControl';
import {TextField, TextareaAutosize} from '@material-ui/core';
import {BaseTextEntryControl} from "./BaseTextEntryControl";
import {TextAreaIcon} from "../../CommonUI/Icon/TextAreaIcon";


@RegisterUIControl('Data (Entry)', 'Text Area', ControlType.Control, <TextAreaIcon />)
export class XTextArea extends BaseTextEntryControl {
	rowMax: number = 10;
	rowMin: number = 5;

	render() {
		return (
			<TextareaAutosize
				data-testid={this.valueName}
				style={{width: '100%'}}
				rowsMax={this.rowMax}
				rowsMin={this.rowMin}
				placeholder={this.placeholderText}
				onChange={this.handleChange}
				value={(this.valueName)?this.getFormDataValue(this.valueName):''}
			/>
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