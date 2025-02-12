import * as React from "react"
import Svg, { Path } from "react-native-svg"
const SvgComponent = ({fill}) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={30}
    height={34}
    fill="none"

  >
    <Path
      fill={fill}
      d="M26.436 7.513v20.448h-3.588V24.94c-.684 1.045-1.643 1.866-2.88 2.463-1.209.572-2.55.858-4.022.858-1.682 0-3.194-.324-4.535-.97-1.34-.672-2.406-1.667-3.194-2.985-.763-1.319-1.144-2.923-1.144-4.814V7.513h3.55v11.53c0 2.015.538 3.57 1.616 4.665 1.078 1.07 2.55 1.604 4.417 1.604 1.92 0 3.431-.56 4.535-1.679 1.105-1.12 1.657-2.749 1.657-4.888V7.513h3.588Z"
    />
  </Svg>
)
export default SvgComponent
