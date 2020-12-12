import React from "react";

import IfThenSvg from "../../assets/images/icons/if-then.svg";

export const IfThenIcon: React.FC<{alt?: string}> = ({alt}) => <img src={IfThenSvg} alt={alt || "If Then"} />