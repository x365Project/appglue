import React from "react";

import ButtonGroupSvg from "../../assets/images/icons/button_group.svg";

export const ButtonGroupIcon: React.FC<{alt?: string}> = ({alt}) => <img src={ButtonGroupSvg} alt={alt || "Button Group"} />