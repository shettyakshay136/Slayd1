import * as React from "react"
import Svg, { Path } from "react-native-svg"
const SvgComponent = ({width, height}) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 16 16"
    fill="none"
  >
    <Path
      fill="#000"
      d="M6.917 6.916v-6.5h2.167v6.5h6.5v2.167h-6.5v6.5H6.917v-6.5h-6.5V6.916h6.5Z"
    />
  </Svg>
)
export default SvgComponent
