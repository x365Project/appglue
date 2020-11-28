import React from "react";

import DefinedSvg from "../../assets/images/icons/defined.svg";

export const DefinedIcon: React.FC<{alt?: string}> = ({alt}) => <img src={DefinedSvg} alt={alt || "Defined"} />