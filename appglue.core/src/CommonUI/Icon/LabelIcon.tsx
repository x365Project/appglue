import React from "react";

import LabelSvg from "../../assets/images/icons/label.svg";

export const LabelIcon: React.FC<{alt?: string}> = ({alt}) => <img src={LabelSvg} alt={alt || "Label"} />