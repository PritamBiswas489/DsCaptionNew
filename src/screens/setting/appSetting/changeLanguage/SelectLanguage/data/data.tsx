import {arabic, english, french, spanish} from '@utils/images';
import {ImageSourcePropType} from 'react-native';

export const languages: Array<dataType> = [
  {icon: english, name: 'language.english', code: 'en'},
  {icon: arabic, name: 'language.arabic', code: 'ar'},
  {icon: french, name: 'language.french', code: 'fr'},
  {
    icon: spanish,
    name: 'language.spanish',
    code: 'es',
  },
];

export type dataType = {
  icon: ImageSourcePropType;
  name: string;
  code: string;
};
