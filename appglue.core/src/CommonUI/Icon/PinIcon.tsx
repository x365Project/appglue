import React from "react";

import PinSvg from "../../assets/images/icons/pin.svg";

export const PinIcon: React.FC<{alt?: string}> = ({alt}) => <img src={PinSvg} alt={alt || "Pin"} />