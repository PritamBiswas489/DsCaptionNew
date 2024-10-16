import React from 'react';
import Svg, {Path} from 'react-native-svg';

export function Calendar(props) {
  return (
    <Svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <Path
        d="M6.66602 1.66699V4.16699"
        stroke={props.color ? props.color : '#171B27'}
        strokeWidth="1.2"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M13.334 1.66699V4.16699"
        stroke={props.color ? props.color : '#171B27'}
        strokeWidth="1.2"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M2.91602 7.5752H17.0827"
        stroke={props.color ? props.color : '#171B27'}
        strokeWidth="1.2"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M17.5 7.08366V14.167C17.5 16.667 16.25 18.3337 13.3333 18.3337H6.66667C3.75 18.3337 2.5 16.667 2.5 14.167V7.08366C2.5 4.58366 3.75 2.91699 6.66667 2.91699H13.3333C16.25 2.91699 17.5 4.58366 17.5 7.08366Z"
        stroke={props.color ? props.color : '#171B27'}
        strokeWidth="1.2"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M13.0781 11.4167H13.0856"
        stroke={props.color ? props.color : '#171B27'}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M13.0781 13.9167H13.0856"
        stroke={props.color ? props.color : '#171B27'}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M9.99607 11.4167H10.0036"
        stroke={props.color ? props.color : '#171B27'}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M9.99607 13.9167H10.0036"
        stroke={props.color ? props.color : '#171B27'}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M6.91209 11.4167H6.91957"
        stroke={props.color ? props.color : '#171B27'}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M6.91209 13.9167H6.91957"
        stroke={props.color ? props.color : '#171B27'}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
