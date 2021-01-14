import React from "react";

import MovingSvg from "../../assets/images/icons/moving.svg";

export const MovingIcon: React.FC<{alt?: string}> = ({alt}) => <img src={MovingSvg} alt={alt || "Moving"} />