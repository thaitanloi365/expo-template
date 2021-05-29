import * as Localization from 'expo-localization';
import Constants from 'expo-constants';
import * as Device from 'expo-device';

let localization: Localization.Localization | null = null;

export async function loadLocalizationAsync() {
  localization = await Localization.getLocalizationAsync();
  return localization;
}

export function getLocale() {
  return localization?.locale;
}

export function getLanguage() {
  return localization?.locale;
}

export const getTimezone = () => {
  return localization?.timezone || 'Asia/Ho_Chi_Minh';
};

export const getAppVersion = () => {
  const prefix = Constants?.manifest?.releaseChannel || 'dev';
  return `${prefix[0].toUpperCase()}${Constants.nativeAppVersion || ''}.${Constants.nativeBuildVersion || ''}`;
};

export const getExpoVersion = () => {
  const prefix = Constants?.manifest?.releaseChannel || 'dev';
  return `${prefix[0].toUpperCase()}.${Constants.manifest.releaseId || ''}.${Constants.manifest.revisionId || ''}`;
};

export const getExpoShortVersion = () => {
  const prefix = Constants?.manifest?.releaseChannel || 'dev';
  let releaseID = Constants?.manifest?.releaseId || '';
  if (releaseID.length > 10) {
    releaseID = releaseID.substring(0, 4) + releaseID.substring(releaseID.length - 4);
  }
  return `${prefix[0].toUpperCase()}.${releaseID}.${Constants.manifest.revisionId || ''}`;
};

export const isDevice = Device.isDevice;
export const getStatusBarHeight = () => Constants.statusBarHeight;
