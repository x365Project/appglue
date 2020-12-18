import React from "react";

import svg from "../../assets/images/icons/empty.svg";

export const EmptyIcon: React.FC<{alt?: string}> = ({alt}) => <img src={svg} alt={alt || "Text Is Empty"} />