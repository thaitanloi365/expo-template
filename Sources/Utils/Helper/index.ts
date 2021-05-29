import moment from 'moment';
import {Dimensions} from 'react-native';
import {verticalScale} from '@Common/Scale';

const mailRegex =
  /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/;

const {width: windowWidth, height: windowHeight} = Dimensions.get('window');

export function valueAt<T = string | number>(array: Array<T>, index: number, fallback: T): T {
  if (Array.isArray(array) && array.length > 0) {
    return array[index];
  }

  return fallback;
}

export function getImageSize(scale = 1) {
  return {
    width: windowWidth * scale,
    height: (windowWidth * 16 * scale) / 9,
  };
}
export function cmToInch(value: number | string) {
  const v = typeof value === 'string' ? parseInt(value) : value;
  const inch = v / 2.54;
  return Math.round((inch * 100) / 100);
}

export function inchToCm(value: number | string) {
  const v = typeof value === 'string' ? parseInt(value) : value;
  const cm = v * 2.54;
  return Math.round((cm * 100) / 100);
}

export function calcTimeLeftInSeconds(unixAt?: number, from = new Date()) {
  if (!unixAt) {
    return 0;
  }
  const timeLeftInSeconds = 24 * 60 * 60 - moment(from).diff(moment.unix(unixAt), 'seconds');
  return timeLeftInSeconds;
}

export function secondsToMinutes(seconds: number) {
  const value = seconds / 60;
  return Math.round((value * 100) / 100);
}

export function isValidEmail(email: string): boolean {
  return mailRegex.test(email);
}

export function isValidPhone(phone: string): boolean {
  return phone != '';
}

export function generateMessageID() {
  // generates uuid.
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    let r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export function trimPhoneCode(phone?: string, code?: string) {
  if (!phone) {
    return '';
  }

  const countryCode = `+${code}`;
  const index = phone?.indexOf(countryCode);
  if (index === -1) {
    return phone;
  }

  return phone?.slice(index + countryCode.length);
}

export function formatPhoneCode(phone?: string, code?: string) {
  if (!phone) {
    return '';
  }
  const countryCode = `+${code}`;
  const index = phone?.indexOf(countryCode);
  if (index !== -1) {
    return phone;
  }

  return `${countryCode}${phone}`;
}

export const formatCurrency = (value?: string | number) => {
  // return currency(value, { symbol: '', separator: ',', decimal: '.' }).format();
  return value ? `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',') : '';

  // return value?.toString()?.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');
};

export const parseCurrency = (value: string | number) => {
  return `${value}`.replace(/\₫\s?|(,*)/g, '');
};

export const diffIn24h = (unixAt?: number) => {
  let countdown = 0;
  if (unixAt) {
    countdown = 24 * 60 * 60 - moment().diff(moment.unix(unixAt), 'seconds');
  } else {
    countdown = 24 * 60 * 60 - moment().diff(moment(), 'seconds');
  }

  let countdownText = '00:00';

  if (countdown > 0) {
    const totalMinutes = secondsToMinutes(countdown);

    const hour = Math.floor(totalMinutes / 60);
    const minute = totalMinutes % 60;
    const hourText = hour < 10 ? `0${hour}` : `${hour}`;
    const minuteText = minute < 10 ? `0${minute}` : `${minute}`;

    countdownText = `${hourText}:${minuteText}`;

    return countdownText;
  } else {
    countdownText = '00:00';
  }

  return countdownText;
};

export const getSizesImage = (offset?: number, numberEachRow = 2) => {
  const newOffset = offset || verticalScale(20);
  const width = (windowWidth - newOffset) / numberEachRow - newOffset;
  const height = (width * 17) / 10;
  return {width, height};
};

export const removeNullFromObject = (obj: object) => Object.entries(Object.entries(obj).filter(([_, v]) => v != null));
