import React from "react";

import CheckBoxSvg from "../../assets/images/icons/check.svg";

export const CheckboxIcon: React.FC<{alt?: string}> = ({alt}) => <img src={CheckBoxSvg} alt={alt || "Check"} />