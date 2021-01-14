import React from "react";

import CutWhiteSvg from "../../assets/images/icons/cut-white.svg";

export const CutWhiteIcon: React.FC<{alt?: string}> = ({alt}) => <img src={CutWhiteSvg} alt={alt || "Cut"} />