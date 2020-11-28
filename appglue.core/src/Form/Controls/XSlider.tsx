import React from "react";
import Slider from "@material-ui/core/Slider";
import { TextField } from '@material-ui/core';
import { RegisterUIControl, ControlType } from "../Utilities/RegisterUIControl";
import {BaseDataControl} from "./BaseDataControl";
import {SliderIcon} from "../../CommonUI/Icon/SliderIcon";


@RegisterUIControl('Data (Entry)', 'Slider Control', ControlType.Control, <SliderIcon />)
export class XSlider extends BaseDataControl {
  min: number = 0;
  max: number = 100;
  step: number = 10;

  render() {
    return (
      <Slider
        id={this.id}
        defaultValue={30}
        aria-labelledby="discrete-slider"
        valueLabelDisplay="auto"
        step={this.step}
        marks
        min={this.min}
        max={this.max}
		onChange={this.handleChange}
		data-testid={this.valueName}
      ></Slider>
    );
  }

  handleChange = (event: any, newValue: number | number[]) => {
    if (this.valueName) {
      this.setFormDataValue(this.valueName, newValue);
    }
  }

  renderEditUI(): JSX.Element | null {
    return (
      <XSliderEditUI editMe={this} />
    );;
  }
}

class XSliderEditUI extends React.Component<{ editMe: XSlider }> {

  render() {
    return (
		<>
            {this.props.editMe.renderBaseDataControlEditor()}

			<TextField label="Min" type="number" value={this.props.editMe.min} onChange={event => {
				let min = Math.max(0, parseInt(event.target.value));
				this.props.editMe.min = min;
				this.props.editMe.designerUpdate();
			}} />
			<TextField label="Max" type="number" value={this.props.editMe.max} onChange={event => {
				let max = Math.max(0, parseInt(event.target.value));
				this.props.editMe.max = max;
				this.props.editMe.designerUpdate();
			}} />
			<TextField label="Step" type="number" value={this.props.editMe.step} onChange={event => {
				let step = Math.max(1, parseInt(event.target.value));
				this.props.editMe.step = step;
				this.props.editMe.designerUpdate();
			}} />
		</>
    );
  }
}
