import React from "react";

import DeleteSvg from "../../assets/images/icons/delete.svg";

export const DeleteIcon: React.FC<{alt?: string}> = ({alt}) => <img src={DeleteSvg} alt={alt || "Delete"} />