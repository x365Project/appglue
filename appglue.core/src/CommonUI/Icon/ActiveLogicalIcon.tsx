import React from "react";

import LogicalSvg from "../../assets/images/icons/active-logical.svg";

export const ActiveLogicalIcon: React.FC<{alt?: string}> = ({alt}) => <img src={LogicalSvg} alt={alt || "Logical"} />