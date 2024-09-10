import Svg, { Path , Rect, Circle, Line} from 'react-native-svg';

export const ProfileIcon = (props) => (
  <Svg
    width={props.width ? props.width : '27'}
    height={props.height ? props.height : '27'}
    viewBox="0 0 20 20"
    fill="none"
  >
    {/* Head */}
    <Path
      d="M10 10.5C11.933 10.5 13.5 8.933 13.5 7C13.5 5.067 11.933 3.5 10 3.5C8.067 3.5 6.5 5.067 6.5 7C6.5 8.933 8.067 10.5 10 10.5Z"
      fill={props.color ? props.color : '#D8DCDE'}
    />
    {/* Shoulders */}
    <Path
      d="M10 12C7.24 12 4.5 13.29 4.5 15V16.5C4.5 17.33 5.17 18 6 18H14C14.83 18 15.5 17.33 15.5 16.5V15C15.5 13.29 12.76 12 10 12Z"
      fill={props.color ? props.color : '#D8DCDE'}
    />
  </Svg>
);
 

export const SubscriptionsIcon = (props) => (
  <Svg
    width={props.width ? props.width : '27'}
    height={props.height ? props.height : '27'}
    viewBox="0 0 20 20"
    fill="none"
  >
    {/* Subscription Rectangles (to represent a list of items) */}
    <Rect
      x="3"
      y="4"
      width="14"
      height="2"
      fill={props.color ? props.color : '#D8DCDE'}
    />
    <Rect
      x="3"
      y="8"
      width="14"
      height="2"
      fill={props.color ? props.color : '#D8DCDE'}
    />
    <Rect
      x="3"
      y="12"
      width="14"
      height="2"
      fill={props.color ? props.color : '#D8DCDE'}
    />

    {/* Small bell icon to symbolize notifications or ongoing subscriptions */}
    <Path
      d="M15.5 17C15.5 16.4477 15.0523 16 14.5 16H13.5C13.2239 16 13 16.2239 13 16.5C13 16.7761 13.2239 17 13.5 17H14.5C14.7761 17 15 17.2239 15 17.5V17.75C15 18.1642 14.6642 18.5 14.25 18.5H5.75C5.33579 18.5 5 18.1642 5 17.75V17.5C5 17.2239 5.22386 17 5.5 17H6.5C6.77614 17 7 16.7761 7 16.5C7 16.2239 6.77614 16 6.5 16H5.5C4.94772 16 4.5 16.4477 4.5 17V17.75C4.5 18.7165 5.2835 19.5 6.25 19.5H14.25C15.2165 19.5 16 18.7165 16 17.75V17.5C16 17.2239 15.7761 17 15.5 17Z"
      fill={props.color ? props.color : '#D8DCDE'}
    />
  </Svg>
);
 

export const ChatIcon = (props) => (
  <Svg
    width={props.width ? props.width : '27'}
    height={props.height ? props.height : '27'}
    viewBox="0 0 24 24"
    fill="none"
  >
    {/* Speech Bubble */}
    <Path
      d="M20 2H4C2.9 2 2 2.9 2 4V18C2 19.1 2.9 20 4 20H18L22 24V4C22 2.9 21.1 2 20 2Z"
      fill={props.color ? props.color : '#D8DCDE'}
    />
  </Svg>
);
 
export const SettingsIcon = (props) => (
  <Svg
    width={props.width ? props.width : '27'}
    height={props.height ? props.height : '27'}
    viewBox="0 0 24 24"
    fill="none"
  >
    {/* Outer Gear */}
    <Path
      d="M19.14 12.94C19.19 12.64 19.22 12.33 19.22 12C19.22 11.67 19.19 11.36 19.14 11.06L21.19 9.47C21.34 9.34 21.39 9.11 21.31 8.9L19.31 4.98C19.23 4.78 19.03 4.68 18.82 4.72L16.47 5.2C16.07 4.91 15.65 4.67 15.2 4.5L14.85 2.15C14.82 1.94 14.64 1.8 14.42 1.8H9.57C9.35 1.8 9.17 1.94 9.14 2.15L8.79 4.5C8.34 4.67 7.92 4.91 7.52 5.2L5.17 4.72C4.96 4.68 4.76 4.78 4.68 4.98L2.68 8.9C2.6 9.11 2.65 9.34 2.8 9.47L4.85 11.06C4.8 11.36 4.78 11.67 4.78 12C4.78 12.33 4.8 12.64 4.85 12.94L2.8 14.53C2.65 14.66 2.6 14.89 2.68 15.1L4.68 19.02C4.76 19.22 4.96 19.32 5.17 19.28L7.52 18.8C7.92 19.09 8.34 19.33 8.79 19.5L9.14 21.85C9.17 22.06 9.35 22.2 9.57 22.2H14.42C14.64 22.2 14.82 22.06 14.85 21.85L15.2 19.5C15.65 19.33 16.07 19.09 16.47 18.8L18.82 19.28C19.03 19.32 19.23 19.22 19.31 19.02L21.31 15.1C21.39 14.89 21.34 14.66 21.19 14.53L19.14 12.94ZM12 15.5C10.07 15.5 8.5 13.93 8.5 12C8.5 10.07 10.07 8.5 12 8.5C13.93 8.5 15.5 10.07 15.5 12C15.5 13.93 13.93 15.5 12 15.5Z"
      fill={props.color ? props.color : '#D8DCDE'}
    />
  </Svg>
);


 

export const WithdrawListIcon = (props) => (
  <Svg
    width={props.width ? props.width : '27'}
    height={props.height ? props.height : '27'}
    viewBox="0 0 24 24"
    fill="none"
  >
    {/* List Lines */}
    <Rect x="4" y="6" width="16" height="2" fill={props.color ? props.color : '#D8DCDE'} />
    <Rect x="4" y="10" width="16" height="2" fill={props.color ? props.color : '#D8DCDE'} />
    <Rect x="4" y="14" width="16" height="2" fill={props.color ? props.color : '#D8DCDE'} />

    {/* Withdraw Icon (arrow pointing out) */}
    <Path
      d="M13 19V16H8V14H13V11L17 15L13 19Z"
      fill={props.color ? props.color : '#D8DCDE'}
    />
  </Svg>
);

 

export const ReportsIcon = (props) => (
  <Svg
    width={props.width ? props.width : '27'}
    height={props.height ? props.height : '27'}
    viewBox="0 0 24 24"
    fill="none"
  >
    {/* Document Outline */}
    <Path
      d="M5 2C4.44772 2 4 2.44772 4 3V21C4 21.5523 4.44772 22 5 22H19C19.5523 22 20 21.5523 20 21V7.82843C20 7.29799 19.7893 6.78929 19.4142 6.41421L14.5858 1.58579C14.2107 1.21071 13.702 1 13.1716 1H5ZM14 4.41421L17.5858 8H14V4.41421Z"
      fill={props.color ? props.color : '#D8DCDE'}
    />
    {/* Bar Chart Elements */}
    <Rect x="7" y="13" width="2" height="5" fill={props.color ? props.color : '#D8DCDE'} />
    <Rect x="11" y="10" width="2" height="8" fill={props.color ? props.color : '#D8DCDE'} />
    <Rect x="15" y="8" width="2" height="10" fill={props.color ? props.color : '#D8DCDE'} />
  </Svg>
);




 

export const AboutUsIcon = (props) => (
  <Svg
    width={props.width ? props.width : '27'}
    height={props.height ? props.height : '27'}
    viewBox="0 0 24 24"
    fill="none"
  >
    {/* Circle Outline */}
    <Circle
      cx="12"
      cy="12"
      r="10"
      stroke={props.color ? props.color : '#D8DCDE'}
      strokeWidth="2"
    />
    {/* Information "i" Symbol */}
    <Path
      d="M12 16C11.4477 16 11 15.5523 11 15V11C11 10.4477 11.4477 10 12 10C12.5523 10 13 10.4477 13 11V15C13 15.5523 12.5523 16 12 16Z"
      fill={props.color ? props.color : '#D8DCDE'}
    />
    <Path
      d="M12 8C11.4477 8 11 7.55228 11 7C11 6.44772 11.4477 6 12 6C12.5523 6 13 6.44772 13 7C13 7.55228 12.5523 8 12 8Z"
      fill={props.color ? props.color : '#D8DCDE'}
    />
  </Svg>
);

 

export const PrivacyPolicyIcon = (props) => (
  <Svg
    width={props.width ? props.width : '27'}
    height={props.height ? props.height : '27'}
    viewBox="0 0 24 24"
    fill="none"
  >
    {/* Shield Shape */}
    <Path
      d="M12 2C12.36 2 12.7 2.08 13.02 2.24L19.5 5.45C19.78 5.59 20 5.91 20 6.26V12.25C20 15.85 17.81 19.06 14.42 20.67L12.66 21.53C12.24 21.73 11.76 21.73 11.34 21.53L9.58 20.67C6.19 19.06 4 15.85 4 12.25V6.26C4 5.91 4.22 5.59 4.5 5.45L10.98 2.24C11.3 2.08 11.64 2 12 2Z"
      stroke={props.color ? props.color : '#D8DCDE'}
      strokeWidth="2"
      fill={props.color ? props.color : '#D8DCDE'}
    />
    {/* Lock Shape */}
    <Path
      d="M9 11V9C9 7.34 10.34 6 12 6C13.66 6 15 7.34 15 9V11H16C16.55 11 17 11.45 17 12V16C17 16.55 16.55 17 16 17H8C7.45 17 7 16.55 7 16V12C7 11.45 7.45 11 8 11H9ZM11 11H13V9C13 8.45 12.55 8 12 8C11.45 8 11 8.45 11 9V11Z"
      fill="white"
    />
  </Svg>
);

 

export const TermsConditionsIcon = (props) => (
  <Svg
    width={props.width ? props.width : '27'}
    height={props.height ? props.height : '27'}
    viewBox="0 0 24 24"
    fill="none"
  >
    {/* Document Outline */}
    <Path
      d="M6 2C5.44772 2 5 2.44772 5 3V21C5 21.5523 5.44772 22 6 22H18C18.5523 22 19 21.5523 19 21V7L14 2H6Z"
      stroke={props.color ? props.color : '#D8DCDE'}
      strokeWidth="2"
      fill={props.color ? props.color : 'none'}
    />
    {/* Document Lines */}
    <Line x1="8" y1="10" x2="16" y2="10" stroke={props.color ? props.color : '#D8DCDE'} strokeWidth="2"/>
    <Line x1="8" y1="14" x2="16" y2="14" stroke={props.color ? props.color : '#D8DCDE'} strokeWidth="2"/>
    <Line x1="8" y1="18" x2="12" y2="18" stroke={props.color ? props.color : '#D8DCDE'} strokeWidth="2"/>
  </Svg>
);


 

export const RefundPolicyIcon = (props) => (
  <Svg
    width={props.width ? props.width : '27'}
    height={props.height ? props.height : '27'}
    viewBox="0 0 24 24"
    fill="none"
  >
    {/* Document Outline */}
    <Path
      d="M6 2C5.44772 2 5 2.44772 5 3V21C5 21.5523 5.44772 22 6 22H18C18.5523 22 19 21.5523 19 21V7L14 2H6Z"
      stroke={props.color ? props.color : '#D8DCDE'}
      strokeWidth="2"
      fill={props.color ? props.color : 'none'}
    />
    {/* Refund Arrow Circle */}
    <Circle
      cx="12"
      cy="13"
      r="4"
      stroke={props.color ? props.color : '#D8DCDE'}
      strokeWidth="2"
    />
    {/* Refund Arrow */}
    <Path
      d="M12 10V13H14"
      stroke={props.color ? props.color : '#D8DCDE'}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M14 11L12 13"
      stroke={props.color ? props.color : '#D8DCDE'}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

 

export const LogoutIcon = (props) => (
  <Svg
    width={props.width ? props.width : '27'}
    height={props.height ? props.height : '27'}
    viewBox="0 0 24 24"
    fill="none"
  >
    {/* Door Outline */}
    <Path
      d="M7 2C6.44772 2 6 2.44772 6 3V21C6 21.5523 6.44772 22 7 22H17C17.5523 22 18 21.5523 18 21V3C18 2.44772 17.5523 2 17 2H7Z"
      stroke={props.color ? props.color : '#D8DCDE'}
      strokeWidth="2"
      fill={props.color ? props.color : 'none'}
    />
    {/* Arrow for Logout */}
    <Path
      d="M10 16L14 12L10 8"
      stroke={props.color ? props.color : '#D8DCDE'}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M14 12H4"
      stroke={props.color ? props.color : '#D8DCDE'}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);







