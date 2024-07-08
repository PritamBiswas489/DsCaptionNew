import {ImageSourcePropType} from 'react-native';

export type serviceMenType = {
  image: ImageSourcePropType;
  service?: string;
  name: string;
  sinceYear?: number;
  experience?: number;
};
