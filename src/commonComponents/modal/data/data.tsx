import {ImageSourcePropType} from 'react-native';
import {FormEvent} from 'react';

export interface CommonModalProps {
  visible: boolean;
  onClose: () => void;
  success: boolean;
  title: string;
  content: string;
  btnTitle?: string;
  gotoScreen?: (props: FormEvent<HTMLFormElement> | undefined) => void;
  icon?: React.ReactNode;
  showText?: string;
  onShowText?: (props: FormEvent<HTMLFormElement> | undefined) => void;
  backgroundColor?: string;
  showImage?: boolean;
  image?: ImageSourcePropType;
  showGridButton?: boolean;
  buttonLabel?: string;
  button1Label?: string;
  onButtonClick?: () => void;
  onButton1Click?: () => void;
}
