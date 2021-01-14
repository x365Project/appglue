import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import TextField from "@material-ui/core/TextField";
import {
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    IconButton,
    Button,
} from "@material-ui/core";
import RemoveIcon from "@material-ui/icons/Remove";

import { RegisterUIControl, ControlType } from "../Utilities/RegisterUIControl";
import React from "react";
import {BaseDataControl} from "./BaseDataControl";
import {RadioGroupIcon} from "../../CommonUI/Icon/RadioGroupIcon";



@RegisterUIControl("Data (Pick)", "Radio Button Group", ControlType.Control, <RadioGroupIcon />)
export class XRadioGroup extends BaseDataControl {
    list: string[] = [];
    // valueName: string = 'firstName';

    render() {
        let items = this.list;

        if (!items || items.length === 0) {
            items = ["needs configuration", "please setup"];
        }

        return (
            <FormControl component="fieldset">
                <FormLabel component="legend">{this.label}</FormLabel>
                <RadioGroup
                    aria-label="gender"
                    name={this.valueName}
                    value={
                        this.valueName
                            ? this.getFormDataValue(this.valueName)
                            : String
                    }
                    onChange={this.handleChange}
                    data-testid={this.valueName}
                >
                    {items.map((item: string, index: number) => (
                        <FormControlLabel
                            value={item}
                            control={<Radio />}
                            label={item}
                            key={index}
                        />
                    ))}
                </RadioGroup>
            </FormControl>
        );
    }

    private handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event.currentTarget.value);
        if (this.valueName) {
            this.setFormDataValue(this.valueName, event.currentTarget.value);
        }
    };

    renderEditUI(): JSX.Element | null {
        return <XRadioGroupEditUI editMe={this} />;
    }
}

class XRadioGroupEditUI extends React.Component<{ editMe: XRadioGroup }> {
    render() {
        return (
            <>
                <TextField
                    label="Content Text"
                    value={this.props.editMe.label}
                    onChange={(event) => {
                        this.props.editMe.label = event.target.value;
                        this.props.editMe.controlUpdate();
                    }}
                />
                <TextField
                    label="Value Name"
                    value={this.props.editMe.valueName}
                    onChange={(event) => {
                        this.props.editMe.valueName = event.target.value;
                        this.props.editMe.controlUpdate();
                    }}
                />
                <List style={{ width: "100%" }}>
                    {this.props.editMe.list.map((s: string, idx) => (
                        <ListItem>
                            <ListItemText>
                                <TextField
                                    label="Option Label"
                                    value={s}
                                    size="small"
                                    onChange={(event) => {
                                        this.props.editMe.list[idx] =
                                            event.target.value;
                                        this.props.editMe.controlUpdate();
                                    }}
                                    key={idx}
                                />
                            </ListItemText>
                            <ListItemSecondaryAction>
                                <IconButton
                                    color="secondary"
                                    size="small"
                                    onClick={() => {
                                        this.props.editMe.list.splice(idx, 1);
                                        this.props.editMe.controlUpdate();
                                    }}
                                >
                                    <RemoveIcon />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    ))}
                </List>
                <Button
                    color="primary"
                    onClick={() => {
                        this.props.editMe.list.push("");
                        this.props.editMe.controlUpdate();
                    }}
                >
                    Add Item
                </Button>
            </>
        );
    }
}
