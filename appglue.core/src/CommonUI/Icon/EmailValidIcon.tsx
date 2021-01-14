import React from "react";

import svg from "../../assets/images/icons/email_valid.svg";

export const EmailValidIcon: React.FC<{alt?: string}> = ({alt}) => <img src={svg} alt={alt || "Email Valid"} />