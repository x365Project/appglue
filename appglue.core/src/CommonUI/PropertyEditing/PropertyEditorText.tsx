import React from "react";
import TextField from "@material-ui/core/TextField";
import { ValidationIssue } from "../../Common/IDesignValidationProvider";

export interface PropertyEditorTextInterface {
  editObject: object;
  label?: string;
  propertyName: string | number;
  hint?: string;
  requiredText?: string;
  updateCallback: CallableFunction;
  parentDefaultValue?: string | null;
  autoFocus?: boolean;
  issue?: ValidationIssue;
}

export const PropertyEditorText: React.FC<PropertyEditorTextInterface> = (
  props: PropertyEditorTextInterface
) => {

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (
      props.parentDefaultValue &&
      event.target.value === props.parentDefaultValue
    ) {
      Reflect.set(props.editObject, props.propertyName, null);
    } else {
      Reflect.set(props.editObject, props.propertyName, event.target.value);
    }
    
    props.updateCallback();
  };
  const value =
    Reflect.get(props.editObject, props.propertyName) ??
    props.parentDefaultValue;

  return (
    <>
      <TextField
        error={Boolean(props.issue)}
        value={value || ""}
        label={props.label}
        onChange={onChange}
        variant="outlined"
        autoFocus={props.autoFocus}
        helperText={props.issue ? props.issue.issue : props.hint}
      />
    </>
  );
};
