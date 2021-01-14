import React from "react";

import CheckListSvg from "../../assets/images/icons/check_list.svg";

export const CheckboxListIcon: React.FC<{alt?: string}> = ({alt}) => <img src={CheckListSvg} alt={alt || "Check List"} />