import * as React from "react"
import Svg, { Path } from "react-native-svg"
const SvgComponent = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={140}
    height={126}
    fill="none"
    {...props}
  >
    <Path
      fill="#fff"
      d="M133.333 76h-19V0h19a6.334 6.334 0 0 1 6.334 6.333v63.334A6.334 6.334 0 0 1 133.333 76Zm-33.522 8.188-40.536 40.537a3.167 3.167 0 0 1-4.139.294l-5.4-4.05a9.5 9.5 0 0 1-3.506-9.944l7.304-28.692H13c-6.996 0-12.667-5.67-12.667-12.666V56.339c0-1.654.324-3.293.954-4.822L20.885 3.922A6.333 6.333 0 0 1 26.741 0h68.592a6.334 6.334 0 0 1 6.334 6.333V79.71c0 1.68-.668 3.29-1.856 4.478Z"
    />
  </Svg>
)
export default SvgComponent
