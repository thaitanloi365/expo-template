import {ICoordinate, IUser} from '@Types';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {SLICE_NAME} from '@Utils/Constants';

interface IAvatarUpload {
  mine: string;
  uri: string;
}
export interface IUserUpdateStarted {
  avatar?: string | IAvatarUpload;
  name: string;
  coordinate: ICoordinate;
  is_first_login?: boolean;
  email?: string;
  language?: string;
}

export interface GetStartedState {
  loading: boolean;
}

const initialState: GetStartedState = {
  loading: false,
};

const getStartedSlice = createSlice({
  name: SLICE_NAME.GET_STARTED,
  initialState: initialState,
  reducers: {
    reset: () => {
      return {...initialState};
    },
  },
});

export const getStartedActions = {
  ...getStartedSlice.actions,
};
export const getStartedReducer = getStartedSlice.reducer;
