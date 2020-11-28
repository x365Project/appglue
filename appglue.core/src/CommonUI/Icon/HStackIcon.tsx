import React from "react";

import HStackSvg from "../../assets/images/icons/hstack.svg";

export const HStackIcon: React.FC<{alt?: string}> = ({alt}) => <img src={HStackSvg} alt={alt || "Horizontal Stack Container"} />