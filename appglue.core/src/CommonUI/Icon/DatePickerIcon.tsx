import React from "react";

import DatePickerSvg from "../../assets/images/icons/calendar.svg";

export const DatePickerIcon: React.FC<{alt?: string}> = ({alt}) => <img src={DatePickerSvg} alt={alt || "Check List"} />