import React from 'react';
import Svg, {Path} from 'react-native-svg';

export function Amount(props) {
  return (
    <Svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <Path
        d="M7.22656 11.9412C7.22656 13.0162 8.05156 13.8829 9.07656 13.8829H11.1682C12.0599 13.8829 12.7849 13.1245 12.7849 12.1912C12.7849 11.1745 12.3432 10.8162 11.6849 10.5829L8.32656 9.41621C7.66823 9.18288 7.22656 8.82454 7.22656 7.80788C7.22656 6.87454 7.95156 6.11621 8.84323 6.11621H10.9349C11.9599 6.11621 12.7849 6.98288 12.7849 8.05788"
        stroke="#647683"
        stroke-width="1.2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M10 5V15"
        stroke="#647683"
        stroke-width="1.2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M10.0013 18.3337C14.6037 18.3337 18.3346 14.6027 18.3346 10.0003C18.3346 5.39795 14.6037 1.66699 10.0013 1.66699C5.39893 1.66699 1.66797 5.39795 1.66797 10.0003C1.66797 14.6027 5.39893 18.3337 10.0013 18.3337Z"
        stroke="#647683"
        stroke-width="1.2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
}
