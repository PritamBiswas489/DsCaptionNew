import React from 'react';
import Svg, {Path} from 'react-native-svg';

export function Delete(props) {
  return (
    <Svg
      width={props.width ? props.width : '18'}
      height={props.height ? props.height : '18'}
      viewBox="0 0 18 18"
      fill="none">
      <Path
        d="M15.75 4.48438C13.2525 4.23687 10.74 4.10938 8.235 4.10938C6.75 4.10938 5.265 4.18438 3.78 4.33438L2.25 4.48438"
        stroke={props.color ? props.color : '#171B27'}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M6.375 3.7275L6.54 2.745C6.66 2.0325 6.75 1.5 8.0175 1.5H9.9825C11.25 1.5 11.3475 2.0625 11.46 2.7525L11.625 3.7275"
        stroke={props.color ? props.color : '#171B27'}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M14.1383 6.85547L13.6508 14.408C13.5683 15.5855 13.5008 16.5005 11.4083 16.5005H6.59328C4.50078 16.5005 4.43328 15.5855 4.35078 14.408L3.86328 6.85547"
        stroke={props.color ? props.color : '#171B27'}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M7.74609 12.375H10.2436"
        stroke={props.color ? props.color : '#171B27'}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M7.125 9.375H10.875"
        stroke={props.color ? props.color : '#171B27'}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
