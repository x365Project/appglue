import React from "react";

import svg from "../../assets/images/icons/average.svg";

export const AverageIcon: React.FC<{alt?: string}> = ({alt}) => <img src={svg} alt={alt || "Average"} />