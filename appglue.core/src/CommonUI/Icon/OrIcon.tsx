import React from "react";

import OrSvg from "../../assets/images/icons/or.svg";
export const OrIcon: React.FC<{alt?: string}> = ({alt}) => <img src={OrSvg} alt={alt || "Or"} />
