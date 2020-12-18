import React from "react";

import svg from "../../assets/images/icons/date_greater_than.svg";

export const DateGreaterThanIcon: React.FC<{alt?: string}> = ({alt}) => <img src={svg} alt={alt || "Date Greater Than"} />