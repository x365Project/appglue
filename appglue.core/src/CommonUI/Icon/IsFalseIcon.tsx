import React from "react";

import IsTrueSvg from "../../assets/images/icons/is_false.svg";

export const IsFalseIcon: React.FC<{alt?: string}> = ({alt}) => <img src={IsTrueSvg} alt={alt || "Is False"} />