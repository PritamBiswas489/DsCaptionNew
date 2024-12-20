import {ViewStyle} from 'react-native';

export type propsType = {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  showExtraNotes?: boolean;
  title: string;
  placeHolder: string;
  textInputContainer?: ViewStyle;
  onChangeText: (text: string) => void;
};
