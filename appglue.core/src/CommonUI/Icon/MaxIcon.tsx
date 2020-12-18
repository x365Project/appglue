import React from "react";

import svg from "../../assets/images/icons/max.svg";

export const MaxIcon: React.FC<{alt?: string}> = ({alt}) => <img src={svg} alt={alt || "Max"} />