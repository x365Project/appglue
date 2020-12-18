import React from "react";

import svg from "../../assets/images/icons/not_empty.svg";

export const NotEmptyIcon: React.FC<{alt?: string}> = ({alt}) => <img src={svg} alt={alt || "Text Is Not Empty"} />