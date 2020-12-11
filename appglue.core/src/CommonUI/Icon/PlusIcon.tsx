import React from "react";

import PlusSvg from "../../assets/images/icons/plus.svg";

export const PlusIcon: React.FC<{alt?: string}> = ({alt}) => <img src={PlusSvg} alt={alt || "Plus"} />