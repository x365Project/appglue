import React from "react";

import TabSvg from "../../assets/images/icons/tab.svg";

export const TabIcon: React.FC<{alt?: string}> = ({alt}) => <img src={TabSvg} alt={alt || "Tab"} />