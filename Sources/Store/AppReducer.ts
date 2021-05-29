import {TOKEN_KEY, APP_THEM_KEY, SLICE_NAME, CHAT_BADGE_COUNT, IS_FIRST_TIME} from '@Utils/Constants';
import {IAddDeviceForm, IAppBadgeCounts, IChatCounts, IConstants, ILoginResponse, ITrackUserForm, IUser} from '@Types';
import {createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit';
import {ThemeType} from '@Themes';
import {clearExcept, load, loadString, remove, save, saveString} from '@Utils/Storage';
import Api from '@Services/Api';
import {profileActions} from '@Screens/Authorization/User/Profile/Redux';

export interface AppState {
  internetState: boolean;

  profile: IUser | null;

  token: any | undefined | null;

  isFirstTime: boolean;

  loading: boolean;

  theme: ThemeType;

  constants: IConstants | null;

  chatCounts: IChatCounts;
}

export const initialAppState: AppState = {
  profile: null,
  token: null,
  isFirstTime: true,
  constants: null,
  chatCounts: {},
  internetState: true,
  loading: true,
  theme: 'default',
};

const loadApp = createAsyncThunk(`${SLICE_NAME.APP}/loadApp`, async (form, thunkApi) => {
  const [token = null, theme, isFirstTime = true] = await Promise.all([
    loadString(TOKEN_KEY),
    loadString(APP_THEM_KEY),
    load(IS_FIRST_TIME),
  ]);
  const t: ThemeType = theme === 'dark' ? 'dark' : 'default';
  return [token, t, isFirstTime === null ? true : isFirstTime];
});

const loadChatCounts = createAsyncThunk(`${SLICE_NAME.APP}/loadBadgeCounts`, async (form, thunkApi) => {
  const count = await loadString(CHAT_BADGE_COUNT);
  const chatCounts: IChatCounts = count ? JSON.parse(count) || {} : {};

  const resp: IAppBadgeCounts = {
    chatCounts: chatCounts,
  };
  return resp;
});

const getConstants = createAsyncThunk(`${SLICE_NAME.APP}/getConstants`, async (form, thunkApi) => {
  const data = await Api.GET_CONSTANTS<IConstants>(form);
  return data;
});

const trackUser = createAsyncThunk(`${SLICE_NAME.APP}/trackUser`, async (form: ITrackUserForm, thunkApi) => {
  const data = await Api.TRACK_USER<IUser>(form);
  return data;
});

const addDevice = createAsyncThunk(`${SLICE_NAME.APP}/addDevice`, async (form: IAddDeviceForm, thunkApi) => {
  const data = await Api.ADD_DEVICE(form);
  return data;
});

const logOutAppUser = createAsyncThunk(`${SLICE_NAME.USER_PROFILE}/logOutAppUser`, async thunkApi => {
  const data = await Api.LOGOUT_APP_USER();
  return data;
});

const appSlice = createSlice({
  name: SLICE_NAME.APP,
  initialState: initialAppState,
  reducers: {
    onSetInternet: (state, {payload}: PayloadAction<boolean>) => {
      state.internetState = payload;
    },
    onSetToken: (state, {payload}: PayloadAction<string | null>) => {
      state.token = payload;
      saveString(TOKEN_KEY, state.token);
    },
    onSetAppProfile: (state, {payload}: PayloadAction<any>) => {
      state.profile = payload;
    },
    onSetTokenAndProfile: (state, {payload}: PayloadAction<ILoginResponse>) => {
      state.token = payload.token;
      state.profile = payload.user;
      saveString(TOKEN_KEY, state.token);
    },
    onSetIsFirstTime: (state, {payload}: PayloadAction<boolean>) => {
      state.isFirstTime = payload;
      save(IS_FIRST_TIME, payload);
    },
    onSetAppTheme: (state, {payload}: PayloadAction<ThemeType>) => {
      state.theme = payload;
    },
    onLoadAppEnd: state => {
      state.loading = false;
    },
    onLogout: state => {
      state.loading = false;
      state.token = null;
      state.profile = null;
      clearExcept(IS_FIRST_TIME);
    },

    onIncreaseChatBadgeCount: (state, action: PayloadAction<string>) => {
      state.chatCounts[action.payload] = (state.chatCounts[action.payload] || 0) + 1;
      saveString(CHAT_BADGE_COUNT, JSON.stringify(state.chatCounts));
    },
    onDecreaseChatBadgeCount: (state, action: PayloadAction<string>) => {
      if (state.chatCounts[action.payload] > 0) {
        state.chatCounts[action.payload] = state.chatCounts[action.payload] - 1;
        saveString(CHAT_BADGE_COUNT, JSON.stringify(state.chatCounts));
      }
    },
    onClearChatBadgeCount: (state, action: PayloadAction<string>) => {
      state.chatCounts[action.payload] = 0;
      saveString(CHAT_BADGE_COUNT, JSON.stringify(state.chatCounts));
    },
    onClearAllChatBadgeCount: (state, action: PayloadAction<string>) => {
      state.chatCounts = {};
      remove(CHAT_BADGE_COUNT);
    },
  },
  extraReducers: builder => {
    builder.addCase(loadChatCounts.fulfilled, (state, action: PayloadAction<IAppBadgeCounts>) => {
      state.chatCounts = action.payload.chatCounts;
    });

    builder.addCase(getConstants.fulfilled, (state, action) => {
      state.constants = action.payload.data;
    });

    builder.addCase(trackUser.fulfilled, (state, action) => {
      state.profile = action.payload.data;
    });

    builder.addCase(profileActions.updateAvatar.fulfilled, (state, action) => {
      state.profile!.avatar = action.payload;
    });

    builder.addCase(profileActions.updateProfile.fulfilled, (state, action) => {
      state.profile = action.payload.data;
    });

    builder.addCase(profileActions.getMyProfile.fulfilled, (state, action) => {
      state.profile = action.payload.data;
    });

    builder.addCase(profileActions.updateLocation.fulfilled, (state, action) => {
      state.profile!.coordinate = action.payload.data;
    });

    builder.addCase(logOutAppUser.fulfilled, (state, action) => {
      state.token = null;
      state.profile = null;
      state.loading = false;
      clearExcept(IS_FIRST_TIME);
    });
  },
});

export const appActions = {
  ...appSlice.actions,
  getConstants,
  trackUser,
  addDevice,
  loadApp,
  logOutAppUser,
  loadChatCounts,
};

export const appReducer = appSlice.reducer;
