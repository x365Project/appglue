import React from "react";

import PasteSvg from "../../assets/images/icons/paste.svg";

export const PasteIcon: React.FC<{alt?: string}> = ({alt}) => <img src={PasteSvg} alt={alt || "Paper"} />