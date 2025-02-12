import * as React from "react"
import Svg, { Path } from "react-native-svg"
const SvgComponent = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={11}
    height={8}
    fill="none"
    {...props}
  >
    <Path
      stroke="#080928"
      strokeLinecap="round"
      strokeWidth={1.5}
      d="m1 1.5 4.667 5L10 1.5"
    />
  </Svg>
)
export default SvgComponent
