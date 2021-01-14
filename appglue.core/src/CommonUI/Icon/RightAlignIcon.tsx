import React from "react";

import RightAlignSvg from "../../assets/images/icons/right-align.svg";

export const RightAlignIcon: React.FC<{alt?: string}> = ({alt}) => <img src={RightAlignSvg} alt={alt || "Right Align"} />