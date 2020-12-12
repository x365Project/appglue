import React from "react";

import AndSvg from "../../assets/images/icons/and.svg";
export const AndIcon: React.FC<{alt?: string}> = ({alt}) => <img src={AndSvg} alt={alt || "And"} />
