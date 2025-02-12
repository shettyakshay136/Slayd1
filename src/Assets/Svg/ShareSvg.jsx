import * as React from "react"
import Svg, { Path } from "react-native-svg"
const SvgComponent = ({width , height}) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 19 25"
    fill="none"
  >
    <Path
      fill="#000"
      d="M17.127 6.967 10 0 2.873 6.967H8.89v7.602h2.222V6.967h6.016ZM0 12.397v4.345C0 18.542 1.492 20 3.333 20h13.334C18.507 20 20 18.541 20 16.742v-4.345h-2.222v4.345c0 .6-.498 1.086-1.111 1.086H3.333a1.099 1.099 0 0 1-1.11-1.086v-4.345H0Z"
    />
  </Svg>
)
export default SvgComponent
