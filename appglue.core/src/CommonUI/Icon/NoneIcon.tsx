import React from "react";

import NoneSvg from "../../assets/images/icons/none.svg";

export const NoneIcon: React.FC<{alt?: string}> = ({alt}) => <img src={NoneSvg} alt={alt || "None"} />