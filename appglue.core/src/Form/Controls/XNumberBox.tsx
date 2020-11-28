import React from 'react';
import TextField from '@material-ui/core/TextField';
import {RegisterUIControl, ControlType} from '../Utilities/RegisterUIControl';
import {BaseTextEntryControl} from "./BaseTextEntryControl";
import {NumberboxIcon} from "../../CommonUI/Icon/NumberboxIcon";


@RegisterUIControl('Data (Entry)', 'NumberBox', ControlType.Control, <NumberboxIcon />)
export class XNumberBox extends BaseTextEntryControl {

	render() {
		return (
			<TextField
				type="number"
				label={this.label}
				value={this.getValue()}
				onChange={this.handleChange}
				data-testid={this.valueName}
				fullWidth
			/>
		)
	}

	private handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		if(this.valueName) {
			this.setFormDataValue(this.valueName, event.currentTarget.value);
		} 
	}

	private getValue = () => {
		return this.valueName ? this.getFormDataValue(this.valueName) : '';
	}

	renderEditUI(): JSX.Element | null {
		return <XNumberBoxEditUI editMe={this} />
	}

}

class XNumberBoxEditUI extends React.Component<{ editMe: XNumberBox }> {

    render() {
        return (
            <>
				{this.props.editMe.renderBaseDataControlEditor()}
				{this.props.editMe.renderTextControlBasePropertyEditor()}
				{this.props.editMe.renderTextStyleSelectionEditor()}
			</>
        );
    }
}