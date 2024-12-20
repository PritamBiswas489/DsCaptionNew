import React from 'react';
import Svg, {Path} from 'react-native-svg';

export function Location(props) {
  return (
    <Svg
      width={props.width ? props.width : '20'}
      height={props.height ? props.height : '20'}
      viewBox="0 0 20 20"
      fill="none">
      <Path
        d="M9.99844 11.1912C11.4344 11.1912 12.5984 10.0272 12.5984 8.59121C12.5984 7.15527 11.4344 5.99121 9.99844 5.99121C8.5625 5.99121 7.39844 7.15527 7.39844 8.59121C7.39844 10.0272 8.5625 11.1912 9.99844 11.1912Z"
        stroke={props.color ? props.color : '#647683'}
        strokeWidth={props.strokeWidth ? props.strokeWidth : '1.2'}
      />
      <Path
        d="M3.0148 7.07533C4.65646 -0.141339 15.3481 -0.133006 16.9815 7.08366C17.9398 11.317 15.3065 14.9003 12.9981 17.117C11.3231 18.7337 8.67313 18.7337 6.9898 17.117C4.6898 14.9003 2.05646 11.3087 3.0148 7.07533Z"
        stroke={props.color ? props.color : '#647683'}
        strokeWidth={props.strokeWidth ? props.strokeWidth : '1.2'}
      />
    </Svg>
  );
}
