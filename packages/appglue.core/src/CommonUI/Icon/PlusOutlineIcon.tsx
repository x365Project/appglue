import React from "react";

import PlusOutlineSvg from "../../assets/images/icons/plus-outline.svg";

export const PlusOutlineIcon: React.FC<{alt?: string}> = ({alt}) => <img src={PlusOutlineSvg} alt={alt || "Plus Outline"} />