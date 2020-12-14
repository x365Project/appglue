import React from "react";

import LeftAlignSvg from "../../assets/images/icons/left-align.svg";

export const LeftAlignIcon: React.FC<{alt?: string}> = ({alt}) => <img src={LeftAlignSvg} alt={alt || "Left Align"} />