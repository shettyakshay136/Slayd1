import * as React from "react"
import Svg, { Path } from "react-native-svg"
const SvgComponent = ({fill}) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={13}
    height={18}
    fill="none"
  >
    <Path
      fill={fill}
      d="M.813 0h11.374c.45 0 .813.381.813.852v16.31a.417.417 0 0 1-.406.426.393.393 0 0 1-.216-.065L6.5 13.66.622 17.523a.395.395 0 0 1-.56-.135.441.441 0 0 1-.062-.226V.852C0 .382.364 0 .813 0Zm10.562 1.704h-9.75v13.148L6.5 11.648l4.875 3.204V1.704Z"
    />
  </Svg>
)
export default SvgComponent
