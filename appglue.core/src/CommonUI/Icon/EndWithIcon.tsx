import React from "react";

import svg from "../../assets/images/icons/end_with.svg";

export const EndWithIcon: React.FC<{alt?: string}> = ({alt}) => <img src={svg} alt={alt || "Text End With"} />