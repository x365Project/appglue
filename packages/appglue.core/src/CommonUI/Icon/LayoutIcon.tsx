import React from "react";

import LayoutSvg from "../../assets/images/icons/layout.svg";

export const LayoutIcon: React.FC<{alt?: string}> = ({alt}) => <img src={LayoutSvg} alt={alt || "Layout"} />