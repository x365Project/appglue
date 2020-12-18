import React from "react";

import svg from "../../assets/images/icons/combine.svg";

export const CombineIcon: React.FC<{alt?: string}> = ({alt}) => <img src={svg} alt={alt || "Text Combine"} />