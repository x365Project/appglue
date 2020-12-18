import React from "react";

import UppercaseSvg from "../../assets/images/icons/uppercase.svg";

export const UppercaseIcon: React.FC<{alt?: string}> = ({alt}) => <img src={UppercaseSvg} alt={alt || "Text Uppercase"} />