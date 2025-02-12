import * as React from "react";
import Svg, { Path } from "react-native-svg";

const SvgComponent = ({width, height , color}) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    fill="none"
    viewBox="0 0 91 63"
  >
    <Path stroke={color} strokeWidth={12} d="M5 23.375 36.154 54 86 5" />
  </Svg>
);

export default SvgComponent;
