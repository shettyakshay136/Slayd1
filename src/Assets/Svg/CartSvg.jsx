import * as React from "react"
import Svg, { Path } from "react-native-svg"
const SvgComponent = ({fill}) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={18}
    height={19}
    fill="none"
  >
    <Path
      fill={fill}
      d="M2.337 12.333v-10H.671V.667h2.5c.46 0 .833.373.833.833v10h10.365l1.667-6.667H5.671V3.167h11.432a.833.833 0 0 1 .809 1.035l-2.084 8.334a.833.833 0 0 1-.808.63H3.17a.833.833 0 0 1-.833-.833Zm1.667 5.834a1.667 1.667 0 1 1 0-3.333 1.667 1.667 0 0 1 0 3.333Zm10 0a1.667 1.667 0 1 1 0-3.334 1.667 1.667 0 0 1 0 3.334Z"
    />
  </Svg>
)
export default SvgComponent
