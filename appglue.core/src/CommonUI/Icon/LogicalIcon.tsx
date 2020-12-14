import React from "react";

import LogicalSvg from "../../assets/images/icons/logical.svg";

export const LogicalIcon: React.FC<{alt?: string}> = ({alt}) => <img src={LogicalSvg} alt={alt || "Logical"} />