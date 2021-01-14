import React from "react";

import svg from "../../assets/images/icons/eye.svg";

export const ViewIcon: React.FC<{alt?: string}> = ({alt}) => <img src={svg} alt={alt || "View"} />