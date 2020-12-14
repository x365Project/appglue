import React from "react";

import RightAlignSvg from "../../assets/images/icons/active-right-align.svg";

export const ActiveRightAlignIcon: React.FC<{alt?: string}> = ({alt}) => <img src={RightAlignSvg} alt={alt || "Right Align"} />