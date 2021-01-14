import React from "react";

import svg from "../../assets/images/icons/mod.svg";

export const ModIcon: React.FC<{alt?: string}> = ({alt}) => <img src={svg} alt={alt || "Mod"} />