import React from "react";

import DeviceSvg from "../../assets/images/icons/device.svg";

export const DeviceIcon: React.FC<{alt?: string}> = ({alt}) => <img src={DeviceSvg} alt={alt || "Device"} />