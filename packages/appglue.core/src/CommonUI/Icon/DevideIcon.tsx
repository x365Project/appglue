import React from "react";

import DevideSvg from "../../assets/images/icons/devide.svg";

export const DevideIcon: React.FC<{alt?: string}> = ({alt}) => <img src={DevideSvg} alt={alt || "Devide"} />