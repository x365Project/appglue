import React from "react";

import svg from "../../assets/images/icons/trim.svg";

export const TrimIcon: React.FC<{alt?: string}> = ({alt}) => <img src={svg} alt={alt || "Text Trim"} />