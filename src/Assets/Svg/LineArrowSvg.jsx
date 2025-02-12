import * as React from "react"
import Svg, { Rect, Path } from "react-native-svg"
const SvgComponent = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    fill="none"
    {...props}
  >
    <Rect width={16} height={16} fill="#2D2C2D" rx={8} />
    <Path
      fill="#fff"
      d="M5.849 3.453a.863.863 0 0 0 0 1.212L9.149 8l-3.3 3.336a.863.863 0 0 0 0 1.213.84.84 0 0 0 1.199 0l3.903-3.947a.863.863 0 0 0 0-1.212L7.048 3.444a.848.848 0 0 0-1.2.009Z"
    />
  </Svg>
)
export default SvgComponent
