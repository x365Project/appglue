import React from "react";

import SliderSvg from "../../assets/images/icons/slider.svg";

export const SliderIcon: React.FC<{alt?: string}> = ({alt}) => <img src={SliderSvg} alt={alt || "Slider"} />