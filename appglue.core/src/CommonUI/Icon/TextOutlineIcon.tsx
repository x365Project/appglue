import React from "react";

import TextOutlineSvg from "../../assets/images/icons/text-outline.svg";

export const TextOutlineIcon: React.FC<{alt?: string}> = ({alt}) => <img src={TextOutlineSvg} alt={alt || "Text Outline"} />