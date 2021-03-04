import React from "react";
import { ButtonControlSize, LinkControlType, LinkControlUnderline } from "../FormDesignConstants";
import { XBaseControl } from "./XBaseControl";

export abstract class BaseButtonControl extends XBaseControl {
  label: string = "Button Label";
  size?: ButtonControlSize;
  linkType: LinkControlType = LinkControlType.ACTION;
  linkUnderline: LinkControlUnderline = LinkControlUnderline.HOVER;
  overrideStyle : boolean = false;
  changeLinkType : boolean = false;
}
