import React from "react";

import NotSvg from "../../assets/images/icons/not.svg";

export const NotIcon: React.FC<{alt?: string}> = ({alt}) => <img src={NotSvg} alt={alt || "Not"} />