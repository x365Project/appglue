import React from "react";

import TimeSvg from "../../assets/images/icons/time.svg";

export const TimePickerIcon: React.FC<{alt?: string}> = ({alt}) => <img src={TimeSvg} alt={alt || "Time Picker"} />