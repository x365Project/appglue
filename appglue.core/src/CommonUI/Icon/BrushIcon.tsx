import React from "react";

import BrushSvg from "../../assets/images/icons/brush.svg";

export const BrushIcon: React.FC<{alt?: string}> = ({alt}) => <img src={BrushSvg} alt={alt || "Brush"} />