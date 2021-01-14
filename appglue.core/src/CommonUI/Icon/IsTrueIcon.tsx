import React from "react";

import IsTrueSvg from "../../assets/images/icons/is_true.svg";

export const IsTrueIcon: React.FC<{alt?: string}> = ({alt}) => <img src={IsTrueSvg} alt={alt || "Is True"} />