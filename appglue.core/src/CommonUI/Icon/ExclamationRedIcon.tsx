import React from "react";

import ExclamationSvg from "../../assets/images/icons/exclamation-red.svg";

export const ExclamationRedIcon: React.FC<{alt?: string}> = ({alt}) => <img src={ExclamationSvg} alt={alt || "Exclamation"} />