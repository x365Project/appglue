import React from "react";

import TextLabelSvg from "../../assets/images/icons/text-label.svg";

export const TextLabelIcon: React.FC<{alt?: string}> = ({alt}) => <img src={TextLabelSvg} alt={alt || "Text Label"} />