import React from "react";

import svg from "../../assets/images/icons/down.svg";

export const DownIcon: React.FC<{alt?: string}> = ({alt}) => <img src={svg} alt={alt || "Down"} />