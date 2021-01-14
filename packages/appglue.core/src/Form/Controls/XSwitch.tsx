import React from "react";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import {RegisterUIControl, ControlType} from "../Utilities/RegisterUIControl";
import {BaseDataControl} from "./BaseDataControl";
import {SwitchIcon} from "../../CommonUI/Icon/SwitchIcon";


@RegisterUIControl('Data (Entry)', 'Switch', ControlType.Control, <SwitchIcon />)
export class XSwitch extends BaseDataControl {


    render() {
        return (
            <FormControlLabel
                control={
                    <Switch
                        checked={this.valueName?this.getFormDataValue(this.valueName):false}
                        onChange={this.handleChange}
                        name={this.valueName}
                        color="primary"
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
        return  <XSwitchEditUI editMe={this} />
    }

}

class XSwitchEditUI extends React.Component<{editMe: XSwitch}> {

    render() {
        return (
            <>
                {this.props.editMe.renderBaseDataControlEditor()}
            </>
        );
    }
}
