import React from "react";

import EqualSvg from "../../assets/images/icons/equal.svg";

export const EqualIcon: React.FC<{alt?: string}> = ({alt}) => <img src={EqualSvg} alt={alt || "Equal"} />