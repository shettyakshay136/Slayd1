import * as React from "react";
import Svg, { Path } from "react-native-svg";

const SvgComponent = ({fill}) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={23}
    height={18}
    viewBox="0 0 14 19"
    fill="none"
    style={{ alignItems:'center' , justifyContent:'center',}}
  >
    <Path
      fill={fill}
      d="m3.771 8.485 6.6 6.6-1.886 1.886L0 8.485 8.485 0l1.886 1.886-6.6 6.6Z"
    />
  </Svg>
);

export default SvgComponent;
