import i18n, {LanguageDetectorAsyncModule} from 'i18next';
import {NativeModules, Platform} from 'react-native';
import {initReactI18next} from 'react-i18next';
import {getLanguage} from './Translate';
import * as Localization from 'expo-localization';
import resources from '@Assets/Locales';
import {ILang} from '@Types';

const languageDetector: LanguageDetectorAsyncModule = {
  type: 'languageDetector',
  async: true, // flags below detection to be async
  detect: (callback: any) => {
    return Localization.getLocalizationAsync().then(({locale}) => {
      // const lang = <ILang>locale.split('-')[0];
      // callback(getLanguage(lang));
      callback(locale);
    });
  },
  init: () => {},
  cacheUserLanguage: () => {},
};
/**
 * Config i18n for app
 */
i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'es_US',

    resources: resources,

    // have a common namespace used around the full app
    ns: ['common'],
    defaultNS: 'common',
    debug: false,

    // cache: {
    //   enabled: true
    // },

    interpolation: {
      escapeValue: false, // not needed for react as it does escape per default to prevent xss!
    },
  });

export default i18n;
