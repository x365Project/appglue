import React from "react";

import SwitchSvg from "../../assets/images/icons/switch.svg";

export const SwitchIcon: React.FC<{alt?: string}> = ({alt}) => <img src={SwitchSvg} alt={alt || "Switch"} />