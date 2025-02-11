import React from 'react';
import Svg, {Path} from 'react-native-svg';

export function LeftArrow(props) {
  return (
    <Svg
      width={props.width ? props.width : '15'}
      height={props.height ? props.height : '20'}
      viewBox="0 0 14 8"
      fill="none">
      <Path
        d="M1 3.5C0.723858 3.5 0.5 3.72386 0.5 4C0.5 4.27614 0.723858 4.5 1 4.5L1 3.5ZM13.3536 4.35355C13.5488 4.15829 13.5488 3.84171 13.3536 3.64645L10.1716 0.464467C9.97631 0.269205 9.65973 0.269205 9.46447 0.464467C9.2692 0.659729 9.2692 0.976311 9.46447 1.17157L12.2929 4L9.46447 6.82843C9.2692 7.02369 9.2692 7.34027 9.46447 7.53553C9.65973 7.7308 9.97631 7.7308 10.1716 7.53553L13.3536 4.35355ZM1 4.5L13 4.5L13 3.5L1 3.5L1 4.5Z"
        fill="#FE782E"
      />
    </Svg>
  );
}
