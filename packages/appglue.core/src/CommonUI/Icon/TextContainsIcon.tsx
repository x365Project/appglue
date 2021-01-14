import React from "react";

import svg from "../../assets/images/icons/text_contains.svg";

export const TextContainsIcon: React.FC<{alt?: string}> = ({alt}) => <img src={svg} alt={alt || "Text Contains"} />