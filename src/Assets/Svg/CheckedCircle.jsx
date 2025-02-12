import * as React from "react"
import Svg, { Path } from "react-native-svg"

const SvgComponent = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <Path
      fill="#71738A"
      d="M10 20C4.477 20 0 15.523 0 10S4.477 0 10 0s10 4.477 10 10-4.477 10-10 10Zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z"
    />
    <Path
      fill="#D7FC70"
      d="M10 15a5 5 0 1 1 0-10 5 5 0 0 1 0 10Z"
    />
  </Svg>
)

export default SvgComponent
