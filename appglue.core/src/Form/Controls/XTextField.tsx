import React from "react";
import TextField from "@material-ui/core/TextField";
import { RegisterUIControl, ControlType } from "../Utilities/RegisterUIControl";
import { BaseTextEntryControl} from "./BaseTextEntryControl";
import {TextControlStyle} from "../FormDesignConstants";
import {InputLabel} from "@material-ui/core";
import {TextFieldIcon} from "../../CommonUI/Icon/TextFieldIcon";



@RegisterUIControl('Data (Entry)', 'Text Field', ControlType.Control, <TextFieldIcon />)
export class XTextField extends BaseTextEntryControl {


    render() {
        let v = (this.getFormRuntimeContext()?.form)?.defaultTextStyle;

        if (this.overrideStyle && this.style)
            v = this.style;

        switch (v) {
            case TextControlStyle.LABELED:
                return (
                    <>
                        {
                            this.label && <>
                                <InputLabel>{this.label}</InputLabel>
                                <br/>
                            </>
                        }
                        
                        <TextField
                            data-testid={this.valueName}
                            variant={"outlined"}
                            fullWidth={true}
                            value={(this.valueName) ? this.getFormDataValue(this.valueName) : ""}
                            onChange={this.handleChange}
                        >

                        </TextField>
                    </>
                );

            case TextControlStyle.OUTLINE:
                return (
                    <TextField
                        data-testid={this.valueName}
                        variant={"outlined"}
                        fullWidth={true}
                        value={(this.valueName) ? this.getFormDataValue(this.valueName) : ""}
                        label={this.label}
                        onChange={this.handleChange}
                    >

                    </TextField>
                );

            case TextControlStyle.SHADED:
                return (
                    <TextField
                        data-testid={this.valueName}
                        variant={"filled"}
                        fullWidth={true}
                        value={(this.valueName) ? this.getFormDataValue(this.valueName) : ""}
                        label={this.label}
                        onChange={this.handleChange}
                    >

                    </TextField>
                );

            case TextControlStyle.UNDERLINED:
                return (
                    <TextField
                        data-testid={this.valueName}
                        variant={"standard"}
                        fullWidth={true}
                        value={(this.valueName) ? this.getFormDataValue(this.valueName) : ""}
                        label={this.label}
                        onChange={this.handleChange}
                    >

                    </TextField>
                );
        }
    }

    private handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (this.valueName) {
            this.setFormDataValue(this.valueName, event.currentTarget.value);
        }
    }

    renderEditUI(): JSX.Element | null {
        return (
            <XTextFieldEditUI
                editMe={this}
            />
        );;
    }
}

class XTextFieldEditUI extends React.Component<{ editMe: XTextField }> {

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