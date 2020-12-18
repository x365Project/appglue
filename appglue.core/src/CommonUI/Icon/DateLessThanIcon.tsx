import React from "react";

import svg from "../../assets/images/icons/date_less_than.svg";

export const DateLessThanIcon: React.FC<{alt?: string}> = ({alt}) => <img src={svg} alt={alt || "Date Less Than"} />