import React from "react";

import svg from "../../assets/images/icons/min.svg";

export const MinIcon: React.FC<{alt?: string}> = ({alt}) => <img src={svg} alt={alt || "Min"} />