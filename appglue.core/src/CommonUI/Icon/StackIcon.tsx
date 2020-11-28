import React from "react";

import StackSvg from "../../assets/images/icons/stack.svg";

export const StackIcon: React.FC<{alt?: string}> = ({alt}) => <img src={StackSvg} alt={alt || "Stack Container"} />