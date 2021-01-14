import React from "react";

import FormEditSvg from "../../assets/images/icons/edit_configuration.svg";

export const FormEditIcon: React.FC<{alt?: string}> = ({alt}) => <img src={FormEditSvg} alt={alt || "Form Edit"} />