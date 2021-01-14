import FormControlLabel from '@material-ui/core/FormControlLabel'
import React from "react";
import Checkbox from "@material-ui/core/Checkbox";
import {RegisterUIControl, ControlType} from "../Utilities/RegisterUIControl";
import {BaseDataControl} from "./BaseDataControl";
import {CheckboxIcon} from "../../CommonUI/Icon/CheckboxIcon";



@RegisterUIControl('Data (Entry)', 'Checkbox', ControlType.Control, <CheckboxIcon />)
export class XCheckboxField extends BaseDataControl {
    render() {
        return (
            <FormControlLabel
                control={
                    <Checkbox
                        name={this.label}
                        color="primary"
                        checked={this.valueName?this.getFormDataValue(this.valueName):false}
                        onChange={this.handleChange}
                        data-testid={this.valueName}
                    />
                }
                label={this.label}
            />
        );
    }

    private handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if(this.valueName) {
            this.setFormDataValue(this.valueName, event.currentTarget.checked);
        }
    }

    renderEditUI(): JSX.Element | null {
        return <XCheckboxEditUI editMe={this} />;
    }

}

class XCheckboxEditUI extends React.Component<{editMe: XCheckboxField}> {

    render() {
        return (
            <>
                {this.props.editMe.renderBaseDataControlEditor()}
            </>
        );
    }
}