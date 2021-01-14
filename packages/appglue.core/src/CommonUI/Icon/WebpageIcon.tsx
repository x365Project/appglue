import React from "react";

import WebpageSvg from "../../assets/images/icons/webpage.svg";

export const WebpageIcon: React.FC<{alt?: string}> = ({alt}) => <img src={WebpageSvg} alt={alt || "Webpage"} />