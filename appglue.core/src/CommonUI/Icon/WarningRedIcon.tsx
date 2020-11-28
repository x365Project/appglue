import React from "react";

import WarningRedSvg from "../../assets/images/icons/warning-red.svg";

export const WarningRedIcon: React.FC<{alt?: string}> = ({alt}) => <img src={WarningRedSvg} alt={alt || "Warning"} />