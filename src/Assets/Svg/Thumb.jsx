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
      d="M133.333 50h-19v76h19a6.334 6.334 0 0 0 6.334-6.333V56.333A6.334 6.334 0 0 0 133.333 50Zm-33.522-8.188L59.275 1.275a3.167 3.167 0 0 0-4.139-.294l-5.4 4.05a9.5 9.5 0 0 0-3.506 9.944l7.304 28.692H13c-6.996 0-12.667 5.67-12.667 12.666v13.328c0 1.654.324 3.293.954 4.822l19.598 47.595A6.334 6.334 0 0 0 26.741 126h68.592a6.334 6.334 0 0 0 6.334-6.333V46.29c0-1.68-.668-3.29-1.856-4.478Z"
    />
  </Svg>
)
export default SvgComponent
