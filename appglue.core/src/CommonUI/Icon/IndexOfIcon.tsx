import React from "react";

import svg from "../../assets/images/icons/index_of_text.svg";

export const IndexOfIcon: React.FC<{alt?: string}> = ({alt}) => <img src={svg} alt={alt || "Text Index Of"} />