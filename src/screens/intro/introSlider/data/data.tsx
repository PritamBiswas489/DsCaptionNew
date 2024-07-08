import {arabic, english, french, hindi, spanish} from '@utils/images';
import {CountryDataItemType} from './types';

export const langues: CountryDataItemType[] = [
  {
    name: 'introSlider.english',
    country: english,
    code: 'en',
  },
  {
    name: 'language.arabic',
    country: arabic,
    code: 'ar',
  },
  {
    name: 'language.french',
    country: french,
    code: 'fr',
  },
  {
    name: 'language.spanish',
    country: spanish,
    code: 'es',
  },
];
