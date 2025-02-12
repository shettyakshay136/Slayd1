import * as React from "react"
import Svg, { Path } from "react-native-svg"
const SvgComponent = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={64}
    height={48}
    fill="none"
    {...props}
  >
    <Path
      fill="#fff"
      d="M14.194 35.002H3.5a2.75 2.75 0 0 1-2.75-2.75v-16.5a2.75 2.75 0 0 1 2.75-2.75h10.694l14.56-11.913A1.375 1.375 0 0 1 31 2.153V45.85a1.375 1.375 0 0 1-2.246 1.064l-14.56-11.912Zm39.945-11 9.723 9.723-3.89 3.889-9.722-9.723-9.723 9.723-3.889-3.89 9.723-9.722-9.723-9.723 3.89-3.889 9.722 9.723 9.723-9.723 3.889 3.89-9.723 9.722Z"
    />
  </Svg>
)
export default SvgComponent
