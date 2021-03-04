import { Button, ButtonGroup } from "@material-ui/core";
import React from "react";
import styled from "styled-components";
import { ButtonControlSize } from "../../Form/FormDesignConstants";

import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

export interface LinkPropertyEditorInterface {
  editObject: object;
  label?: string;
  propertyName: string | number;
  updateCallback: CallableFunction;
  parentDefaultValue?: string | null;
}

const TextSizeButton = styled(Button)`
    && {
        width: 120px;
        height: 46px;
        padding: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 4px;
        color: #01244E;
        border: 1px solid #E6E9ED

        &:hover {
            background: #F2FAFE;
        }

        &.Mui-disabled {
			background: #F2FAFE;
			color: black;
		}
    }

`;

export const PropertyEditorLinkStyleSelection: React.FC<LinkPropertyEditorInterface> = (
  props: LinkPropertyEditorInterface
) => {
  const handleChangeStyle = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (
      props.parentDefaultValue &&
      props.parentDefaultValue === event.target.value
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
    <FormControl component="fieldset">
      <FormLabel component="legend">Underline</FormLabel>
      <RadioGroup
        aria-label="underline"
        name="underline"
        value={value}
        onChange={handleChangeStyle}
      >
        <FormControlLabel value="none" control={<Radio />} label="None" />
        <FormControlLabel value="hover" control={<Radio />} label="Hover" />
        <FormControlLabel value="always" control={<Radio />} label="Always" />
      </RadioGroup>
    </FormControl>
  );
};

export const PropertyEditorLinkTypeSelection: React.FC<LinkPropertyEditorInterface> = (
  props: LinkPropertyEditorInterface
) => {
  const handleChangeType = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (
      props.parentDefaultValue &&
      props.parentDefaultValue === event.target.value
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
    <FormControl component="fieldset">
      <FormLabel component="legend">Link Type</FormLabel>
      <RadioGroup
        aria-label="linkType"
        name="linkType"
        value={value}
        onChange={handleChangeType}
      >
        <FormControlLabel value="action" control={<Radio />} label="Action" />
        <FormControlLabel value="url" control={<Radio />} label="Url" />
      </RadioGroup>
    </FormControl>
  );
};

export const PropertyEditorLinkSizeSelection: React.FC<LinkPropertyEditorInterface> = (
  props: LinkPropertyEditorInterface
) => {
  function handleChangeSize(newSize: string) {
    if (props.parentDefaultValue && newSize === props.parentDefaultValue) {
      Reflect.set(props.editObject, props.propertyName, null);
    } else {
      Reflect.set(props.editObject, props.propertyName, newSize);
    }
    props.updateCallback();
  }

  const value =
    Reflect.get(props.editObject, props.propertyName) ??
    props.parentDefaultValue;

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">Size</FormLabel>
      <ButtonGroup
        size="large"
        aria-label="large outlined primary button group"
        style={{ height: "49px", width: "240px", marginTop: "10px" }}
      >
        <TextSizeButton
          onClick={() => {
            handleChangeSize(ButtonControlSize.STANDARD);
          }}
          style={{ textTransform: "lowercase" }}
          disabled={value === ButtonControlSize.STANDARD}
        >
          Standard
        </TextSizeButton>
        <TextSizeButton
          onClick={() => {
            handleChangeSize(ButtonControlSize.SMALL);
          }}
          style={{ textTransform: "lowercase" }}
          disabled={value === ButtonControlSize.SMALL}
        >
          Small
        </TextSizeButton>
        <TextSizeButton
          onClick={() => {
            handleChangeSize(ButtonControlSize.LARGE);
          }}
          style={{ textTransform: "lowercase" }}
          disabled={value === ButtonControlSize.LARGE}
        >
          Large
        </TextSizeButton>
      </ButtonGroup>
    </FormControl>
  );
};
