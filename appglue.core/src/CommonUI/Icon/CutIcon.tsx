import React from "react";

import CutSvg from "../../assets/images/icons/cut.svg";

export const CutIcon: React.FC<{alt?: string}> = ({alt}) => <img src={CutSvg} alt={alt || "Cut"} />