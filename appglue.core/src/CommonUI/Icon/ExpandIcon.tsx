import React from "react";

import ExpandSvg from "../../assets/images/icons/expand.svg";

export const ExpandIcon: React.FC<{alt?: string}> = ({alt}) => <img src={ExpandSvg} alt={alt || "Expand"} />