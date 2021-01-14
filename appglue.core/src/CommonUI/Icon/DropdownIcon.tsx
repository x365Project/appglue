import React from "react";

import DropdownSvg from "../../assets/images/icons/dropdown.svg";

export const DropdownIcon: React.FC<{alt?: string}> = ({alt}) => <img src={DropdownSvg} alt={alt || "Dropdown"} />