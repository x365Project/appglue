import React from "react";

import ColumnSvg from "../../assets/images/icons/column.svg";

export const ColumnIcon: React.FC<{alt?: string}> = ({alt}) => <img src={ColumnSvg} alt={alt || "Column"} />