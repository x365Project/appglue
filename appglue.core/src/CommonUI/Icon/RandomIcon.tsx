import React from "react";

import RandomSvg from "../../assets/images/icons/random.svg";

export const RandomIcon: React.FC<{alt?: string}> = ({alt}) => <img src={RandomSvg} alt={alt || "Random"} />