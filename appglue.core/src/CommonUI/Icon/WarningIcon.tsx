import React from "react";

import WarningSvg from "../../assets/images/icons/warning-white.svg";

export const WarningIcon: React.FC<{alt?: string}> = ({alt}) => <img src={WarningSvg} alt={alt || "Warning"} />