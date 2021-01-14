import React from "react";

import svg from "../../assets/images/icons/plus_white.svg";

export const PlusWhiteIcon: React.FC<{alt?: string}> = ({alt}) => <img src={svg} alt={alt || "Plus"} />