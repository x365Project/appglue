import React from "react";

import RulesSvg from "../../assets/images/icons/rules.svg";

export const RulesIcon: React.FC<{alt?: string}> = ({alt}) => <img src={RulesSvg} alt={alt || "Rules"} />