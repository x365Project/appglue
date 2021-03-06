import React from "react";

import svg from "../../assets/images/icons/proper.svg";

export const ProperIcon: React.FC<{alt?: string}> = ({alt}) => <img src={svg} alt={alt || "Text Proper"} />