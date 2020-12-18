import React from "react";

import AsCurrencySvg from "../../assets/images/icons/as_currency.svg";

export const AsCurrencyIcon: React.FC<{alt?: string}> = ({alt}) => <img src={AsCurrencySvg} alt={alt || "As Currency"} />