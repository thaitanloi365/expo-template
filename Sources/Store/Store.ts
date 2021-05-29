import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import {reducers, rootReducer} from './Reducers';
import logger from 'redux-logger';

const devMode = __DEV__;

const middleware = [...getDefaultMiddleware()];
if (__DEV__) {
  middleware.push(logger);
}

const storeConfig = () => {
  const store = configureStore({
    reducer: rootReducer,
    devTools: devMode,
    middleware,
  });

  return store;
};

export type AppDispatch = typeof store.dispatch;

export interface AsyncThunkOptions {
  dispatch: AppDispatch;
  state: RootState;
  extra: {
    jwt: string;
  };
}

export type RootState = ReturnType<typeof reducers>;

export const store = storeConfig();
