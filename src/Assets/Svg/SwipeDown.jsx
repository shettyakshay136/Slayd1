import * as React from "react"
import Svg, { Path } from "react-native-svg"
const SvgComponent = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={52}
    height={56}
    fill="none"
    {...props}
  >
    <Path
      fill="#D7FC70"
      d="M26 .15.137 26.011l5.893 5.893L26 11.935l19.97 19.97 5.893-5.893L26 .15Zm0 23.54L.137 49.554l5.893 5.893L26 35.476l19.97 19.97 5.893-5.892L26 23.69Z"
    />
  </Svg>
)
export default SvgComponent
