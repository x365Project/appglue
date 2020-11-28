import React from "react";

import ExclamationSvg from "../../assets/images/icons/exclamation-white.svg";

export const ExclamationIcon: React.FC<{alt?: string}> = ({alt}) => <img src={ExclamationSvg} alt={alt || "Exclamation"} />