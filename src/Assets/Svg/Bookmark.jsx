import * as React from "react"
import Svg, { Path } from "react-native-svg"
const SvgComponent = ({width, height}) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 19 25"
    fill="none"
  >
    <Path
      fill="#212121"
      d="M1.2 0h16.79a1.2 1.2 0 0 1 1.2 1.2v22.96a.6.6 0 0 1-.918.508l-8.677-5.44-8.677 5.44A.6.6 0 0 1 0 24.16V1.2A1.2 1.2 0 0 1 1.2 0ZM16.79 2.399H2.4v18.51l7.196-4.512 7.196 4.511V2.398Z"
    />
  </Svg>
)
export default SvgComponent
