import { useState } from "react"
import * as React from "react"
import Svg, { Path } from "react-native-svg"
const SvgComponent = () => {
    const [isRed , setRed] = useState(false)

    const handle = () => {
        setRed((prev) => !prev);
    }

    return (
        <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={25}
        height={22.2}
        fill="none"
        style={{marginTop:1 ,}}
        onPress={handle}
      >
        <Path
          fill={isRed ? 'red' : '#212121'}
          fillRule="evenodd"
          d="M2.794 1.736c2.819-2.497 7.15-2.276 9.694.506l.012.013.012-.013c2.544-2.782 6.875-3.003 9.694-.506a6.772 6.772 0 0 1 .513 9.658l-9.34 10.217A1.19 1.19 0 0 1 12.5 22a1.19 1.19 0 0 1-.878-.39l-9.34-10.216a6.772 6.772 0 0 1 .512-9.658Zm7.937 2.171C9.074 2.096 6.218 1.943 4.37 3.581a4.297 4.297 0 0 0-.332 6.147l8.463 9.256 8.462-9.256a4.297 4.297 0 0 0-.331-6.147c-1.849-1.638-4.706-1.485-6.362.326l-.89.975a1.19 1.19 0 0 1-.879.39 1.19 1.19 0 0 1-.878-.39l-.89-.975Z"
          clipRule="evenodd"
        />
      </Svg>
    );
}
export default SvgComponent
