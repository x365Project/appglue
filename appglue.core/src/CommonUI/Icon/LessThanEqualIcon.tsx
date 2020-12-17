import React from "react";

import LessThanEqualSvg from "../../assets/images/icons/less_than_equal.svg";

export const LessThanEqualIcon: React.FC<{alt?: string}> = ({alt}) => <img src={LessThanEqualSvg} alt={alt || "Less Than Equal To"} />