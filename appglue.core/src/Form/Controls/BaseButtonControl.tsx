import React from "react";
import { ButtonControlSize } from "../FormDesignConstants";
import { BaseDataControl } from "./BaseDataControl";

export abstract class BaseButtonControl extends BaseDataControl {
  label: string = "Button Label";
  size?: ButtonControlSize;
}
