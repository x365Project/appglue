import React from "react";
import styled from "styled-components";
import Link from "@material-ui/core/Link";
import Button from "@material-ui/core/Button";

import { RegisterUIControl, ControlType } from "../Utilities/RegisterUIControl";
import { validateVariableName } from "../../Common/DataValidationUtilities";
import { BaseButtonControl } from "./BaseButtonControl";
import { ButtonIcon } from "../../CommonUI/Icon/ButtonIcon";
import { LinkControlType, LinkControlUnderline } from "../FormDesignConstants";

import { ValidationIssue } from "../../Common/IDesignValidationProvider";
import { IssueData } from "../../Form/Utilities/ControlRenderContext";

import { PropertyEditorText } from "../../CommonUI/PropertyEditing/PropertyEditorText";
import { PropertyEditorBoolean } from "../../CommonUI/PropertyEditing/PropertyEditorBoolean";
import {
  PropertyEditorLinkStyleSelection,
  PropertyEditorLinkSizeSelection,
  PropertyEditorLinkTypeSelection,
} from "../../CommonUI/PropertyEditing/PropertyEditorLinkControl";
import { Collapse } from "@material-ui/core";

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
  linkType: LinkControlType = LinkControlType.ACTION;
  linkUnderline: LinkControlUnderline = LinkControlUnderline.HOVER;
  overrideStyle : boolean = false;
  changeLinkType : boolean = false;

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
            <Link underline={underline} href={this.label} target="_blank">
              {this.label}
            </Link>
          </UrlLinkButton>
        )}
      </>
    );
  }

  getDesignValidationIssues(): ValidationIssue[] {
    let issues: ValidationIssue[] = [];

    if (!this.label) {
      issues.push(new ValidationIssue("Label is required", 'label', this.id));
    }
    if (!this.valueName) {
      issues.push(
        new ValidationIssue("Value name is required", 'valueName', this.id)
      );
    } else if(this.valueName) {
      let varIssue = validateVariableName(this.valueName);

      if (varIssue) {
        varIssue.dataName = this.valueName;
        varIssue.elementId = this.id;
        issues.push(varIssue);
      }
    }

    return issues;
  }

  getRuntimeValidationIssues(): ValidationIssue[] {
    let issues: ValidationIssue[] = [];
    return issues;
  }

  renderEditUI(): JSX.Element | null {
    return <XLinkEditUI editMe={this} />;
  }
}

function XLinkEditUI(props: { editMe: XLink }) {
  const issueData: IssueData | null = props.editMe
    .getFormContext()!
    .getControlContext(props.editMe)!
    .getDesignIssueData();
  const issues: ValidationIssue[] = issueData?.issues || [];

  const refreshDesigner = () => {
    props.editMe.getDesignValidationIssues();
    props.editMe.controlUpdate();
    props.editMe.designerUpdate();
  }

  const changeLinkType = () => {
    props.editMe.controlUpdate();
    props.editMe.label = props.editMe.linkType === LinkControlType.ACTION ? "Test Link" : "http://www.example.com/";
  }

  return (
    <>
      <PropertyEditorText
        editObject={props.editMe}
        label={"Label"}
        propertyName={"label"}
        updateCallback={refreshDesigner}
        issue={issues.find((issue) => issue.dataName === 'label')}
      />
      <PropertyEditorText
        editObject={props.editMe}
        label={"Value Name"}
        propertyName={"valueName"}
        updateCallback={refreshDesigner}
        issue={issues.find((issue) => issue.dataName === 'valueName')}
      />
      <PropertyEditorBoolean
        editObject={props.editMe}
        label={"Required On All Outcomes"}
        propertyName={"requiredOnAllOutcomes"}
        updateCallback={props.editMe.controlUpdate}
      />
      <Collapse in={props.editMe.requiredOnAllOutcomes}>
        <PropertyEditorText
          editObject={props.editMe}
          label={"Required Message"}
          propertyName={"requiredMessage"}
          updateCallback={props.editMe.controlUpdate}
        />
      </Collapse>
      <PropertyEditorBoolean
          editObject={props.editMe}
          label="Change Link Control Type"
          propertyName="changeLinkType"
          updateCallback={props.editMe.controlUpdate}
        />
        <Collapse in={props.editMe.changeLinkType}>
          <PropertyEditorLinkTypeSelection
            updateCallback={changeLinkType}
            propertyName={"linkType"}
            editObject={props.editMe}
            parentDefaultValue={props.editMe.getFormContext()?.form.defaultLinkType}
          />
        </Collapse>
        <PropertyEditorBoolean
          editObject={props.editMe}
          label="Override Link Style"
          propertyName="overrideStyle"
          updateCallback={props.editMe.controlUpdate}
        />
        <Collapse in={props.editMe.overrideStyle}>
          <PropertyEditorLinkStyleSelection
            updateCallback={props.editMe.controlUpdate}
            propertyName={"linkUnderline"}
            editObject={props.editMe}
            parentDefaultValue={
              props.editMe.getFormContext()?.form.defaultLinkUnderline
            }
          />
          <PropertyEditorLinkSizeSelection
            updateCallback={props.editMe.controlUpdate}
            propertyName={"size"}
            editObject={props.editMe}
            parentDefaultValue={props.editMe.getFormContext()?.form.defaultButtonSize}
          />
        </Collapse>
    </>
  );
}
