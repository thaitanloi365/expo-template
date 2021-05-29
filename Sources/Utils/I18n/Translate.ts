import {ILang} from '@Types';
import I18n from './I18n';

export function translate(key: string, option?: object) {
  return key ? I18n.t(key, option) : '';
}

export function getLanguage(lang: ILang) {
  switch (lang) {
    case 'vi':
      return 'vi_VN';
    default:
      return 'es_US';
  }
}

// export const changeLanguage = (lang: ILang) => I18n.changeLanguage(getLanguage(lang));

export const changeLanguage = (lang: ILang) => {
  return new Promise<ILang>((resolve, reject) => {
    I18n.changeLanguage(getLanguage(lang))
      .then(() => resolve(lang))
      .catch(err => reject(err));
  });
};
