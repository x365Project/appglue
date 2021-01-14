import React from "react";

import SelectSvg from "../../assets/images/icons/select.svg";

export const SelectBoxIcon: React.FC<{alt?: string}> = ({alt}) => <img src={SelectSvg} alt={alt || "Select"} />