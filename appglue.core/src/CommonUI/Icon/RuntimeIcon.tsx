import React from "react";

import RuntimeSvg from "../../assets/images/icons/runtime.svg";

export const RuntimeIcon: React.FC<{alt?: string}> = ({alt}) => <img src={RuntimeSvg} alt={alt || "Runtime"} />