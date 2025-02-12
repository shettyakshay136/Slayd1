import * as React from "react"
import Svg, { Path, Circle } from "react-native-svg"
const SvgComponent = ({fill}) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={25}
    height={26}
    fill="none"
  >
    <Path
      fill={fill}
      d="M24.76 1.2v16.79a1.2 1.2 0 0 1-1.2 1.2H.6a.6.6 0 0 1-.508-.918l5.44-8.677L.092.918A.6.6 0 0 1 .6 0h22.96a1.2 1.2 0 0 1 1.2 1.2Zm-2.4 15.591V2.4H3.852l4.512 7.196-4.512 7.196h18.51Z"
    />
    <Circle cx={6.383} cy={23.601} r={2.399} fill={fill} />
    <Circle cx={19.576} cy={23.601} r={2.399} fill={fill} />
  </Svg>
)
export default SvgComponent
