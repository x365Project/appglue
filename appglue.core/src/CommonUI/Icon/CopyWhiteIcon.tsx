import React from "react";

import CopyWhiteSvg from "../../assets/images/icons/copy-white.svg";

export const CopyWhiteIcon: React.FC<{alt?: string}> = ({alt}) => <img src={CopyWhiteSvg} alt={alt || "Copy"} />