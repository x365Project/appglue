import React from "react";

import DeleteWhiteSvg from "../../assets/images/icons/delete-white.svg";

export const DeleteWhiteIcon: React.FC<{alt?: string}> = ({alt}) => <img src={DeleteWhiteSvg} alt={alt || "Delete"} />