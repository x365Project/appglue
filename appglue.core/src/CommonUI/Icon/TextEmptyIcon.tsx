import React from "react";

import svg from "../../assets/images/icons/text_empty.svg";

export const TextEmptyIcon: React.FC<{alt?: string}> = ({alt}) => <img src={svg} alt={alt || "Text Is Empty"} />