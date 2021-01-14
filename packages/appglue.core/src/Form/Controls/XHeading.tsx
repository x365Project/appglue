import React from "react";
import {
    Typography,
    TextField,
    Select,
    MenuItem,
    FormControlLabel,
    Checkbox
} from '@material-ui/core';
import { Variant as ThemeVariant } from '@material-ui/core/styles/createTypography';

import {RegisterUIControl, ControlType} from "../Utilities/RegisterUIControl";
import {XBaseControl} from "./XBaseControl";
import {ValidationIssue} from "../../Common/IDesignValidationProvider";
import {HeadingIcon} from "../../CommonUI/Icon/HeadingIcon";



@RegisterUIControl('Text', 'Heading', ControlType.Control, <HeadingIcon />)
export class XHeading extends XBaseControl {    
    type : ThemeVariant = "h1";
    text: string = 'Text...';
    wordwrap : boolean = false;

    render() {
        return (   
            <Typography
                style={{width: '100%'}}
                noWrap={!this.wordwrap}
                variant={this.type}
                gutterBottom>
                {this.text}
            </Typography>
        );
    }

    renderEditUI(): JSX.Element | null {
        return <XHeadingEditUI editMe={this} />;
    }

    getDesignValidationIssues(): ValidationIssue[] {
        return [];
    }

    getRuntimeValidationIssues(): ValidationIssue[] {
        return [];
    }


}

class XHeadingEditUI extends React.Component<{ editMe: XHeading }> {
    options: string[] = [
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6',
        'subtitle1',
        'subtitle2',
        'body1',
        'caption',
        'button',
        'overline',
        'srOnly',
        'inherit',
        
    ]
    render() {
        return (
            <>
                <Select value={this.props.editMe.type} onChange={event => {
                    this.props.editMe.type = event.target.value as ThemeVariant;
                    this.props.editMe.controlUpdate();
                }}>
                    {
                        this.options.map((option) => (
                            <MenuItem value={option} key={option}>{option}</MenuItem>
                        ))
                    }
                </Select>
                <TextField label="Text"
                    value={this.props.editMe.text}
                    onChange={event => {
                        this.props.editMe.text = event.target.value;
                        this.props.editMe.controlUpdate();
                    }}
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            name="Wordwrap"
                            color="primary"
                            checked={this.props.editMe.wordwrap}
                            onChange={(event) => {
                                this.props.editMe.wordwrap = event.target.checked;
                                this.props.editMe.controlUpdate();
                            }}
                        />
                    }
                    label="Wordwrap"
                />
            </>
        );
    }
}
