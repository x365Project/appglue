import React from "react";

import ButtonSvg from "../../assets/images/icons/button.svg";

export const ButtonIcon: React.FC<{alt?: string}> = ({alt}) => <img src={ButtonSvg} alt={alt || "Button"} />