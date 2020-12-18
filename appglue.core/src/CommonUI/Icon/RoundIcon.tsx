import React from "react";

import RoundSvg from "../../assets/images/icons/round.svg";

export const RoundIcon: React.FC<{alt?: string}> = ({alt}) => <img src={RoundSvg} alt={alt || "Round"} />