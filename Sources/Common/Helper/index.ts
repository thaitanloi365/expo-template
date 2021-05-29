import {StyleSheet} from 'react-native';

type TypesBase = 'bigint' | 'boolean' | 'function' | 'number' | 'object' | 'string' | 'symbol' | 'undefined';

export const enhance = (arrStyle: Array<any>) => {
  return StyleSheet.flatten(arrStyle);
};

export const checkKeyInObject = (T: any, key: string) => {
  return Object.keys(T).includes(key);
};

export const onShowErrorBase = (msg: string) => {
  // @ts-ignore
  alert(msg);
};
export const onCheckType = (source: any, type: TypesBase) => {
  return typeof source === type;
};
export function onCheckTS<T>(arg: any, propUnique: string, typeOfProps: TypesBase): arg is T {
  return arg && arg[propUnique] && typeof arg[propUnique] == typeOfProps;
}
