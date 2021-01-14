import React from "react";

import ExistsSvg from "../../assets/images/icons/exists.svg";

export const ExistsIcon: React.FC<{alt?: string}> = ({alt}) => <img src={ExistsSvg} alt={alt || "Exists"} />