import React from "react";

import BackSvg from "../../assets/images/icons/back.svg";

export const BackIcon: React.FC<{alt?: string}> = ({alt}) => <img src={BackSvg} alt={alt || "Back"} />