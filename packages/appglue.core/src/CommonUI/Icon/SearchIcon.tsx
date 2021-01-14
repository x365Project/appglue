import React from "react";

import SearchSvg from "../../assets/images/icons/search.svg";
export const SearchIcon: React.FC<{alt?: string}> = ({alt}) => <img src={SearchSvg} alt={alt || "Search"} />
