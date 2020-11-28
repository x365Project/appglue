import React from "react";

import HeadingSvg from "../../assets/images/icons/heading.svg";

export const HeadingIcon: React.FC<{alt?: string}> = ({alt}) => <img src={HeadingSvg} alt={alt || "Heading"} />