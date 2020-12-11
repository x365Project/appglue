import React from "react";

import SumSvg from "../../assets/images/icons/sum.svg";

export const SumIcon: React.FC<{alt?: string}> = ({alt}) => <img src={SumSvg} alt={alt || "Sum"} />