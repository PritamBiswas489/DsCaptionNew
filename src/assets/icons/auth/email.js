import React from 'react';
import Svg, {Path} from 'react-native-svg';
import appColors from '../../../theme/appColors';

export function Email(props) {
  return (
    <Svg
      width={props.width ? props.width : '22'}
      height={props.height ? props.height : '22'}
      viewBox="0 0 20 20"
      fill="none">
      <Path
        d="M14.1665 17.0837H5.83317C3.33317 17.0837 1.6665 15.8337 1.6665 12.917V7.08366C1.6665 4.16699 3.33317 2.91699 5.83317 2.91699H14.1665C16.6665 2.91699 18.3332 4.16699 18.3332 7.08366V12.917C18.3332 15.8337 16.6665 17.0837 14.1665 17.0837Z"
        stroke={props.color ? props.color : appColors.lightText}
        strokeWidth={props.strokeWidth ? props.strokeWidth : '1.2'}
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M14.1668 7.5L11.5585 9.58333C10.7002 10.2667 9.29183 10.2667 8.43349 9.58333L5.8335 7.5"
        stroke={props.color ? props.color : appColors.lightText}
        strokeWidth={props.strokeWidth ? props.strokeWidth : '1.2'}
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
}
