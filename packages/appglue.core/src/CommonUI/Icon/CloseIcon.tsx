import React from "react";

import CloseSvg from "../../assets/images/icons/close.svg";

export const CloseIcon: React.FC<{alt?: string}> = ({alt}) => <img src={CloseSvg} alt={alt || "Close"} />