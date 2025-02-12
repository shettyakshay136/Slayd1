import * as React from "react"
import Svg, { Path } from "react-native-svg"
const SvgComponent = () => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={12}
    height={12}
    fill="none"
  >
    <Path
      fill="#212121"
      fillRule="evenodd"
      d="M2.667 5.333c1.242 0 2.286-.85 2.582-2H12V2H5.25a2.668 2.668 0 1 0-2.583 3.333Zm0-1.333a1.333 1.333 0 1 0 0-2.667 1.333 1.333 0 0 0 0 2.667ZM6.75 8.667a2.668 2.668 0 1 1 0 1.333H0V8.667h6.75Zm3.917.666a1.333 1.333 0 1 1-2.667 0 1.333 1.333 0 0 1 2.667 0Z"
      clipRule="evenodd"
    />
  </Svg>
)
export default SvgComponent
