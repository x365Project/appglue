import React from "react";

import NumberboxSvg from "../../assets/images/icons/numberbox.svg";

export const NumberboxIcon: React.FC<{alt?: string}> = ({alt}) => <img src={NumberboxSvg} alt={alt || "Numberbox"} />