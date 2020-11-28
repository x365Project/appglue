import React from "react";

import TextUnderlineSvg from "../../assets/images/icons/text-underline.svg";

export const TextUnderlineIcon: React.FC<{alt?: string}> = ({alt}) => <img src={TextUnderlineSvg} alt={alt || "Text Shaded"} />