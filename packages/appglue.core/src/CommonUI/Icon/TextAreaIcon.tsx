import React from "react";

import TextAreaSvg from "../../assets/images/icons/textarea.svg";

export const TextAreaIcon: React.FC<{alt?: string}> = ({alt}) => <img src={TextAreaSvg} alt={alt || "Text Area"} />