import i18next from 'i18next';
import {initReactI18next} from 'react-i18next';
import en from './en.json';
import ar from './ar.json';
import fr from './fr.json';
import es from './es.json';

i18next.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  lng: 'en',
  resources: {
    en: en,
    ar: ar,
    fr: fr,
    es: es,
  },
});

export default i18next;
