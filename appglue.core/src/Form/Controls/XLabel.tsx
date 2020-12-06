import React from "react";
import InputLabel from '@material-ui/core/InputLabel';
import {RegisterUIControl, ControlType} from "../Utilities/RegisterUIControl";
import {XBaseControl} from "./XBaseControl";
import {TextField} from "@material-ui/core";
import {ValidationIssue} from "../../Common/IDesignValidationProvider";
import {LabelIcon} from "../../CommonUI/Icon/LabelIcon";


@RegisterUIControl('Text', 'Label', ControlType.Control, <LabelIcon />)
export class XLabel extends XBaseControl {    
    text : string = "Label Text...";
    htmlFor : string = "html-for"

    render() {
        return (            
            <InputLabel
                style={{width: '100%'}}
                htmlFor={this.htmlFor}
            >
                {this.text}
            </InputLabel>
        );
    }

    renderEditUI(): JSX.Element | null {
        return <XLabelEditUI editMe={this} />
    }

    getDesignValidationIssues(): ValidationIssue[] {
        return [];
    }

    getRuntimeValidationIssues(): ValidationIssue[] {
        return [];
    }


}

class XLabelEditUI extends React.Component<{editMe: XLabel}> {

    render() {
        return (
            <>
                <TextField label="Content Text" value={this.props.editMe.text} onChange={event => {
                    this.props.editMe.text = event.target.value;
                    this.props.editMe.controlUpdate();
                }}/>
                <TextField label="Html For" value={this.props.editMe.htmlFor}  />
            </>
        );
    }
}