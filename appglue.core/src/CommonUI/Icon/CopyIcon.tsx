import React from "react";

import CopySvg from "../../assets/images/icons/copy.svg";

export const CopyIcon: React.FC<{alt?: string}> = ({alt}) => <img src={CopySvg} alt={alt || "Copy"} />