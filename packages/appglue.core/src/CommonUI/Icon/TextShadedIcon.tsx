import React from "react";

import TextShadedSvg from "../../assets/images/icons/text-shaded.svg";

export const TextShadedIcon: React.FC<{alt?: string}> = ({alt}) => <img src={TextShadedSvg} alt={alt || "Text Shaded"} />