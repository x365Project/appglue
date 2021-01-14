import React from "react";

import EditSvg from "../../assets/images/icons/edit.svg";

export const EditIcon: React.FC<{alt?: string}> = ({alt}) => <img src={EditSvg} alt={alt || "Edit"} />