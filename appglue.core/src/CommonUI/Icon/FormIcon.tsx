import React from "react";

import FormSvg from "../../assets/images/icons/form.svg";

export const FormIcon: React.FC<{alt?: string}> = ({alt}) => <img src={FormSvg} alt={alt || "Form"} />