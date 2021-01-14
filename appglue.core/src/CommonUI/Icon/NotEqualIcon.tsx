import React from "react";

import NotEqualSvg from "../../assets/images/icons/not_equal.svg";

export const NotEqualIcon: React.FC<{alt?: string}> = ({alt}) => <img src={NotEqualSvg} alt={alt || "Not Equal"} />