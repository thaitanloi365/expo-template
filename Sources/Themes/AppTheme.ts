import {AppTheme} from '@Types';
import {ColorDark, ColorDefault} from './Colors';

const Default: AppTheme = {
  dark: false,
  colors: ColorDefault,
};

const Dark: AppTheme = {
  dark: true,
  colors: ColorDark,
};

export const MyAppTheme = {
  default: Default,
  dark: Dark,
};

export type ThemeType = keyof typeof MyAppTheme;
