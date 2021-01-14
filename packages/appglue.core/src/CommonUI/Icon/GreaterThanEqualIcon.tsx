import React from "react";

import GreaterThanEqualSvg from "../../assets/images/icons/greater_than_equal.svg";

export const GreaterThanEqualIcon: React.FC<{alt?: string}> = ({alt}) => <img src={GreaterThanEqualSvg} alt={alt || "Greater Than To"} />