import React from "react";

import InputSvg from "../../assets/images/icons/input.svg";


export const TextFieldIcon: React.FC<{alt?: string}> = ({alt}) => <img src={InputSvg} alt={alt || "Text Field"} />