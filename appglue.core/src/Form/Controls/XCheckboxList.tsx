import React from "react";
import {
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Button,
  FormControlLabel,
  TextField,
  Checkbox,
  FormGroup,
  FormControl,
  FormLabel,
} from "@material-ui/core";
import RemoveIcon from "@material-ui/icons/Remove";
import { RegisterUIControl, ControlType } from "../Utilities/RegisterUIControl";
import {BaseDataControl} from "./BaseDataControl";
import {CheckboxListIcon} from "../../CommonUI/Icon/CheckboxListIcon";



@RegisterUIControl("Data (Pick)", "CheckboxList", ControlType.Control, <CheckboxListIcon />)
export class XCheckboxList extends BaseDataControl {
  list: string[] = [];
  value: {[key: string]: boolean} = {};

  render() {

    let items = this.list;

    if (!items || items.length === 0) {
      items = ["First"];
    }

    return (
      <FormControl component="fieldset" data-testid={this.valueName}>
        <FormLabel component="legend">{this.label}</FormLabel>
        <FormGroup>
          {items.map((item: string, index: number) => (
            <FormControlLabel
              control={
                <Checkbox
                  name={item}
                  key={index}
                  checked={
                    this.label && this.getFormDataValue(this.label) ? this.getFormDataValue(this.label)[item] : false
                  }
                  onChange={this.handleChange}
                />
              }
              key={index}
              label={item}
            />
          ))}
        </FormGroup>
      </FormControl>
    );
  }

  private handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.value[event.currentTarget.name] = event.currentTarget.checked;
    this.setFormDataValue(this.label, this.value);
  };

  renderEditUI(): JSX.Element | null {
    return <XCheckboxListEditUI editMe={this} />;
  }
}

class XCheckboxListEditUI extends React.Component<{ editMe: XCheckboxList }> {
  render() {
    return (
      <>
          {this.props.editMe.renderBaseDataControlEditor()}

          <List style={{ width: "100%" }}>
          {this.props.editMe.list.map((s: string, idx) => (
            <ListItem>
              <ListItemText>
                <TextField
                  label="Option Text"
                  value={s}
                  onChange={(event) => {
                    this.props.editMe.list[idx] = event.target.value;
                    this.props.editMe.controlUpdate();
                  }}
                  size="small"
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
