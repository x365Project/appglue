import React from "react";

import OutlineSvg from "../../assets/images/icons/outline.svg";

export const OutlineIcon: React.FC<{alt?: string}> = ({alt}) => <img src={OutlineSvg} alt={alt || "Outline"} />