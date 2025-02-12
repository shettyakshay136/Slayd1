import * as React from "react"
import Svg, { Path } from "react-native-svg"
const SvgComponent = ({width, height}) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 19 25"
    fill="none"
  >
    <Path
      fill="#2F314A"
      d="M1.125 0h15.75C17.496 0 18 .477 18 1.066v20.401c0 .294-.252.533-.563.533a.586.586 0 0 1-.298-.081L9 17.085.861 21.919a.581.581 0 0 1-.775-.169.512.512 0 0 1-.086-.283V1.066C0 .477.504 0 1.125 0Z"
    />
  </Svg>
)
export default SvgComponent
