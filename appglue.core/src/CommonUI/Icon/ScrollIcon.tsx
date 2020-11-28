import React from "react";

import ScrollSvg from "../../assets/images/icons/scroll.svg";

export const ScrollIcon: React.FC<{alt?: string}> = ({alt}) => <img src={ScrollSvg} alt={alt || "Scroll"} />