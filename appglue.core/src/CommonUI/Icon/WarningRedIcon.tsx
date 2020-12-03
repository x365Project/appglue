import React from "react";

import WarningRedSvg from "../../assets/images/icons/warning-red.svg";

export const WarningRedIcon: React.FC<React.ImgHTMLAttributes<HTMLImageElement>> = ({alt, ...restProps}) =>
  <img {...restProps} src={WarningRedSvg} alt={alt || "Warning"} />
