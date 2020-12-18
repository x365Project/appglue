import React from "react";

import LowercaseSvg from "../../assets/images/icons/lowercase.svg";

export const LowercaseIcon: React.FC<{alt?: string}> = ({alt}) => <img src={LowercaseSvg} alt={alt || "Text Lowercase"} />