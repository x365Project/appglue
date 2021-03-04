import React from "react";
import styled from "styled-components";
import Link from "@material-ui/core/Link";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { Collapse } from "@material-ui/core";

import { RegisterUIControl, ControlType } from "../Utilities/RegisterUIControl";
import { BaseButtonControl } from "./BaseButtonControl";
import { ValidationIssue } from "../../Common/IDesignValidationProvider";
import { ButtonIcon } from "../../CommonUI/Icon/ButtonIcon";
import { LinkControlType } from "../FormDesignConstants";
import { PropertyEditorBoolean } from "../../CommonUI/PropertyEditing/PropertyEditorBoolean";
import {
  PropertyEditorLinkStyleSelection,
  PropertyEditorLinkSizeSelection,
  PropertyEditorLinkTypeSelection,
} from "../../CommonUI/PropertyEditing/PropertyEditorLinkControl";

const UrlLinkButton = styled(Button)`
  && {
    & .MuiButton-label {
      text-transform: none;
    }
  }
`;

@RegisterUIControl("Action", "Link", ControlType.Control, <ButtonIcon />)
export class XLink extends BaseButtonControl {
  label: string = "Test Link";

  render() {
    let size: "medium" | "small" | "large" =
      this.getFormContext()?.form?.defaultButtonSize ?? "medium";

    let underline: "hover" | "always" | "none" =
      this.getFormContext()?.form?.defaultLinkUnderline ?? "hover";

    let type: "action" | "url" =
      this.getFormContext()?.form?.defaultLinkType ?? "action";

    if (this.size) size = this.size;

    if (this.linkUnderline) underline = this.linkUnderline;

    if (this.linkType) type = this.linkType;

    this.label =
      type === LinkControlType.ACTION ? "Test Link" : "http://www.example.com/";

    return (
      <>
        {type === LinkControlType.ACTION && (
          <Button
            component={Link}
            size={size}
            underline={underline}
            onClick={() => {
              this.getFormContext()?.outcomeTriggered(this.label);
            }}
          >
            {this.label}
          </Button>
        )}

        {type === LinkControlType.URL && (
          <UrlLinkButton size={size}>
            <Link underline={underline} href={this.label}>
              {this.label}
            </Link>
          </UrlLinkButton>
        )}
      </>
    );
  }

  renderEditUI(): JSX.Element | null {
    return <XLinkEditUI editMe={this} />;
  }

  renderLinkControlBaseDataEditor() {
    let type: "action" | "url" =
      this.getFormContext()?.form?.defaultLinkType ?? "action";

    if (this.linkType) type = this.linkType;
    return (
      <>
        {type === LinkControlType.ACTION && (
          <TextField
            label="Label Text"
            value={this.label}
            onChange={(event) => {
              this.label = event.target.value;
              this.controlUpdate();
            }}
            placeholder="Action name"
          />
        )}

        {type === LinkControlType.URL && (
          <TextField
            label="Label Text"
            value={this.label}
            onChange={(event) => {
              this.label = event.target.value;
              this.controlUpdate();
            }}
            placeholder="http://www.example.com/"
          />
        )}
      </>
    );
  }

  renderLinkControlStyleSelectionEditor() {
    return (
      <>
        <PropertyEditorBoolean
          editObject={this}
          label="Override Link Style"
          propertyName="overrideStyle"
          updateCallback={this.controlUpdate}
        />
        <Collapse in={this.overrideStyle}>
          <PropertyEditorLinkStyleSelection
            updateCallback={this.controlUpdate}
            propertyName={"linkUnderline"}
            editObject={this}
            parentDefaultValue={
              this.getFormContext()?.form.defaultLinkUnderline
            }
          />
          <PropertyEditorLinkSizeSelection
            updateCallback={this.controlUpdate}
            propertyName={"size"}
            editObject={this}
            parentDefaultValue={this.getFormContext()?.form.defaultButtonSize}
          />
        </Collapse>
      </>
    );
  }

  renderLinkControlTypeChangeEditor() {
    return (
      <>
        <PropertyEditorBoolean
          editObject={this}
          label="Change Link Control Type"
          propertyName="changeLinkType"
          updateCallback={this.controlUpdate}
        />
        <Collapse in={this.changeLinkType}>
          <PropertyEditorLinkTypeSelection
            updateCallback={this.controlUpdate}
            propertyName={"linkType"}
            editObject={this}
            parentDefaultValue={this.getFormContext()?.form.defaultLinkType}
          />
        </Collapse>
      </>
    );
  }

  getDesignValidationIssues(): ValidationIssue[] {
    return [];
  }

  getRuntimeValidationIssues(): ValidationIssue[] {
    return [];
  }
}

class XLinkEditUI extends React.Component<{ editMe: XLink }> {
  render() {
    return (
      <>
        {this.props.editMe.renderLinkControlBaseDataEditor()}
        {this.props.editMe.renderLinkControlTypeChangeEditor()}
        {this.props.editMe.renderLinkControlStyleSelectionEditor()}
      </>
    );
  }
}
