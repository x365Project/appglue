import React from "react";

import InfoSvg from "../../assets/images/icons/info.svg";

export const InfoIcon: React.FC<{alt?: string}> = ({alt}) => <img src={InfoSvg} alt={alt || "Info"} />