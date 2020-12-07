import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import TextField from '@material-ui/core/TextField';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Button
} from '@material-ui/core';
import RemoveIcon from '@material-ui/icons/Remove';

import { RegisterUIControl, ControlType } from "../Utilities/RegisterUIControl";
import React from "react";
import {BaseDataControl} from "./BaseDataControl";
import {ButtonGroupIcon} from "../../CommonUI/Icon/ButtonGroupIcon";



@RegisterUIControl('Data (Pick)', 'Button Group', ControlType.Control, <ButtonGroupIcon />)
export class XButtonGroup extends BaseDataControl {
  label: string = 'buttonGroupLabel';
  valueName: string = 'buttonGroupValue';
  list: string[] = [];

  render() {
    let items = this.list;

    if (!items || items.length === 0) {
      items = ['needs configuration', 'please setup'];
    }

    return (
      <FormControl component="fieldset">
        <FormLabel component="legend">{this.label}</FormLabel>
        <ToggleButtonGroup
          exclusive
          color="primary"
          aria-label="contained primary button group"
          onChange={this.handleChange}
		  value={(this.valueName) ? this.getFormDataValue(this.valueName) : ''}
		  data-testid={this.valueName}
        >
          {items.map((item: string, index: number) => (
            <ToggleButton color="primary" key={index} value={item} aria-label={item}>{item}</ToggleButton>
          ))}
        </ToggleButtonGroup>
      </FormControl>
    );
  }

  handleChange = (event: React.MouseEvent<HTMLElement>, newValue: string) => {
    if (this.valueName) {
      this.setFormDataValue(this.valueName, newValue);
    }
  };

  renderEditUI(): JSX.Element | null {
    return <XButtonGroupEditUI editMe={this} />;
  }
}

class XButtonGroupEditUI extends React.Component<{ editMe: XButtonGroup }> {
  render() {
    return (
      <>
        <TextField label="Content Text" value={this.props.editMe.label} onChange={event => {
          this.props.editMe.label = event.target.value;
          this.props.editMe.controlUpdate();
        }} />
        <TextField label="Value Name" value={this.props.editMe.valueName} onChange={event => {
          this.props.editMe.valueName = event.target.value;
          this.props.editMe.controlUpdate();
        }} />
        <List style={{ width: '100%' }}>
          {
            this.props.editMe.list.map((s: string, idx: number) => (
              <ListItem>
                <ListItemText>
                  <TextField label="Button Label"
                    value={s}
                    size="small"
                    onChange={event => {
                      this.props.editMe.list[idx] = event.target.value;
                      this.props.editMe.controlUpdate();
                    }}
                    key={idx}
                  />
                </ListItemText>
                <ListItemSecondaryAction>
                  <IconButton color="secondary" size="small" onClick={() => {
                    this.props.editMe.list.splice(idx, 1);
                    this.props.editMe.controlUpdate();
                  }}>
                    <RemoveIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))
          }
        </List>
        <Button color="primary" onClick={() => {
          this.props.editMe.list.push('');
          this.props.editMe.controlUpdate();
        }}> Add Button </Button>
      </>
    );
  }
}