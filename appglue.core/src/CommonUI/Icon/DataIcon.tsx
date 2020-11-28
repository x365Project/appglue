import React from "react";

import DataSvg from "../../assets/images/icons/data.svg";

export const DataIcon: React.FC<{alt?: string}> = ({alt}) => <img src={DataSvg} alt={alt || "Data"} />