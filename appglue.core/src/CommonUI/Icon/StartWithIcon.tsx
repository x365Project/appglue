import React from "react";

import svg from "../../assets/images/icons/start_with.svg";

export const StartWithIcon: React.FC<{alt?: string}> = ({alt}) => <img src={svg} alt={alt || "Text Start With"} />