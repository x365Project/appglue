import React from "react";

import RadioButtonSvg from "../../assets/images/icons/radio_button.svg";

export const RadioGroupIcon: React.FC<{alt?: string}> = ({alt}) => <img src={RadioButtonSvg} alt={alt || "Radio Group"} />