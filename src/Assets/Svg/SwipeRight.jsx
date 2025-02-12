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
      d="M26.667 0v12C11.939 12 0 23.94 0 38.667c0 .727.03 1.447.086 2.16 3.9-7.397 11.546-12.51 20.413-12.813l.834-.014h5.334v12L48 20 26.667 0Zm16 0v7.299L56.213 20 42.67 32.696 42.667 40 64 20 42.667 0Z"
    />
  </Svg>
)
export default SvgComponent
