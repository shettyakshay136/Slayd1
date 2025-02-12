import * as React from "react"
import Svg, { Path } from "react-native-svg"
const SvgComponent = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={56}
    height={57}
    fill="none"
    {...props}
  >
    <Path fill="#000" d="M0 56.92h56v-56H0v56Z" />
  </Svg>
)
export default SvgComponent
