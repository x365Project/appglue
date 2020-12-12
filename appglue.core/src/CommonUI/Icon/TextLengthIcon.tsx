import React from "react";

import TextLengthSvg from "../../assets/images/icons/text-length.svg";

export const TextLengthIcon: React.FC<{alt?: string}> = ({alt}) => <img src={TextLengthSvg} alt={alt || "Text Length"} />