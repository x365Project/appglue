import React from "react";

import svg from "../../assets/images/icons/movement_white.svg";

export const MoveIcon: React.FC<{alt?: string}> = ({alt}) => <img src={svg} alt={alt || "Movement"} />