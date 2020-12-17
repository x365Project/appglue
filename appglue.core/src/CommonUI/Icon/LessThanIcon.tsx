import React from "react";

import LessThanSvg from "../../assets/images/icons/less.svg";

export const LessThanIcon: React.FC<{alt?: string}> = ({alt}) => <img src={LessThanSvg} alt={alt || "Less Than"} />