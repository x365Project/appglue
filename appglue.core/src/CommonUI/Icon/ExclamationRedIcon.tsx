import React from "react";

import ExclamationSvg from "../../assets/images/icons/exclamation-red.svg";

export const ExclamationRedIcon: React.FC<React.ImgHTMLAttributes<HTMLImageElement>> = ({alt, ...restProps}) =>
  <img {...restProps} src={ExclamationSvg} alt={alt || "Exclamation"} />
