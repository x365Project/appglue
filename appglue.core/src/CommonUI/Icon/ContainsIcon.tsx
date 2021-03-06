import React from "react";

import svg from "../../assets/images/icons/contains.svg";

export const ContainsIcon: React.FC<{alt?: string}> = ({alt}) => <img src={svg} alt={alt || "Text Contains"} />