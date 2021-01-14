import React from "react";

import AbsoluteSvg from "../../assets/images/icons/absolute.svg";

export const AbsoluteIcon: React.FC<{alt?: string}> = ({alt}) => <img src={AbsoluteSvg} alt={alt || "Absolute"} />