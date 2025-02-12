import * as React from "react"
import Svg, { Path } from "react-native-svg"
const SvgComponent = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <Path
      fill="#9E9E9E"
      d="M5.793 7.207 8.586 10l-2.793 2.793 1.414 1.414L10 11.414l2.793 2.793 1.414-1.414L11.414 10l2.793-2.793-1.414-1.414L10 8.586 7.207 5.793 5.793 7.207Z"
    />
    <Path
      fill="#9E9E9E"
      fillRule="evenodd"
      d="M20 10c0 5.523-4.477 10-10 10S0 15.523 0 10 4.477 0 10 0s10 4.477 10 10Zm-2 0a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z"
      clipRule="evenodd"
    />
  </Svg>
)
export default SvgComponent
