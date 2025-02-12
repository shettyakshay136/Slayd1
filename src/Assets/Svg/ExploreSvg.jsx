import * as React from "react"
import Svg, { Path } from "react-native-svg"
const SvgComponent = ({fill}) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={30}
    height={25}
    fill="none"
  >
    <Path
      fill={fill}
      fillRule="evenodd"
      d="M17.707 19.093a10.62 10.62 0 0 1-6.54 2.24C5.276 21.333.5 16.558.5 10.667S5.276 0 11.167 0c5.89 0 10.666 4.776 10.666 10.667a10.62 10.62 0 0 1-2.24 6.54l5.85 5.85-1.886 1.886-5.85-5.85Zm1.46-8.426a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z"
      clipRule="evenodd"
    />
  </Svg>
)
export default SvgComponent
