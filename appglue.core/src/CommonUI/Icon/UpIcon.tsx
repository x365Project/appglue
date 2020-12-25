import React from "react";

import svg from "../../assets/images/icons/up.svg";

export const UpIcon: React.FC<{alt?: string}> = ({alt}) => <img src={svg} alt={alt || "Up"} />