import React from "react";

import PaperSvg from "../../assets/images/icons/paper.svg";

export const PaperIcon: React.FC<{alt?: string}> = ({alt}) => <img src={PaperSvg} alt={alt || "Paper"} />