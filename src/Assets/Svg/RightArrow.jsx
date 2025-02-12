import * as React from "react"
import Svg, { Path } from "react-native-svg"
const SvgComponent = ({fill}) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={8}
    height={14}
    fill="none"
  >
    <Path
      fill={fill}
      d="M5.672 7 .722 2.05 2.136.638 8.5 7l-6.364 6.364L.722 11.95 5.672 7Z"
    />
  </Svg>
)
export default SvgComponent
