import React from 'react';
import Svg, {Path} from 'react-native-svg';

export function Bank(props) {
  return (
    <Svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <Path
        d="M9.2775 1.61238L16.0275 4.31236C16.29 4.41736 16.5 4.73236 16.5 5.00986V7.49986C16.5 7.91236 16.1625 8.24986 15.75 8.24986H2.25C1.8375 8.24986 1.5 7.91236 1.5 7.49986V5.00986C1.5 4.73236 1.71 4.41736 1.9725 4.31236L8.7225 1.61238C8.8725 1.55238 9.1275 1.55238 9.2775 1.61238Z"
        stroke={props.color ? props.color : '#171B27'}
        strokeWidth={props.strokeWidth ? props.strokeWidth : '1.2'}
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M16.5 16.5H1.5V14.25C1.5 13.8375 1.8375 13.5 2.25 13.5H15.75C16.1625 13.5 16.5 13.8375 16.5 14.25V16.5Z"
        stroke={props.color ? props.color : '#171B27'}
        strokeWidth={props.strokeWidth ? props.strokeWidth : '1.2'}
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M3 13.5V8.25"
        stroke={props.color ? props.color : '#171B27'}
        strokeWidth={props.strokeWidth ? props.strokeWidth : '1.2'}
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M6 13.5V8.25"
        stroke={props.color ? props.color : '#171B27'}
        strokeWidth={props.strokeWidth ? props.strokeWidth : '1.2'}
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M9 13.5V8.25"
        stroke={props.color ? props.color : '#171B27'}
        strokeWidth={props.strokeWidth ? props.strokeWidth : '1.2'}
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M12 13.5V8.25"
        stroke={props.color ? props.color : '#171B27'}
        strokeWidth={props.strokeWidth ? props.strokeWidth : '1.2'}
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M15 13.5V8.25"
        stroke={props.color ? props.color : '#171B27'}
        strokeWidth={props.strokeWidth ? props.strokeWidth : '1.2'}
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M0.75 16.5H17.25"
        stroke={props.color ? props.color : '#171B27'}
        strokeWidth={props.strokeWidth ? props.strokeWidth : '1.2'}
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M9 6.375C9.62132 6.375 10.125 5.87132 10.125 5.25C10.125 4.62868 9.62132 4.125 9 4.125C8.37868 4.125 7.875 4.62868 7.875 5.25C7.875 5.87132 8.37868 6.375 9 6.375Z"
        stroke={props.color ? props.color : '#171B27'}
        strokeWidth={props.strokeWidth ? props.strokeWidth : '1.2'}
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
