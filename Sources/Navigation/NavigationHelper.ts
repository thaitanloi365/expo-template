import {navigate} from './NavigationService';
import {APP_SCREEN} from './ScreenTypes';

export function navigateToHome() {
  navigate(APP_SCREEN.AUTHORIZE);
}

export function navigateToLogin() {
  navigate(APP_SCREEN.UN_AUTHORIZE);
}

export function navigateToSplash() {
  navigate(APP_SCREEN.SPLASH);
}
