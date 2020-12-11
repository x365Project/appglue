import React from "react";

import GreaterThanSvg from "../../assets/images/icons/greater-than.svg";

export const GreaterThanIcon: React.FC<{alt?: string}> = ({alt}) => <img src={GreaterThanSvg} alt={alt || "Greater Than"} />