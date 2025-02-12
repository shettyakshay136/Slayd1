import * as React from "react"
import Svg, { Path } from "react-native-svg"
const SvgComponent = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={64}
    height={41}
    fill="none"
    {...props}
  >
    <Path
      fill="#D7FC70"
      d="M37.333 0v12C52.061 12 64 23.94 64 38.667c0 .727-.03 1.447-.086 2.16-3.9-7.397-11.546-12.51-20.413-12.813L42.667 28h-5.334v12L16 20 37.333 0Zm-16 0v7.299L7.787 20 21.33 32.696 21.333 40 0 20 21.333 0Z"
    />
  </Svg>
)
export default SvgComponent
