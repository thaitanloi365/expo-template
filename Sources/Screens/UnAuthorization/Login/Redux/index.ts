import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {SLICE_NAME} from '@Utils/Constants';
import {ILoginEmailForm, ILoginPhoneForm, IResendOTPResponse} from '@Types';
import Api from '@Services/Api';
import {showToastError} from '@Utils/Toast';

export interface LoginState {
  loading: boolean;
  error?: string;
}
const initialState: LoginState = {
  loading: false,
  error: undefined,
};

const login = createAsyncThunk(`${SLICE_NAME.LOGIN}/login`, async (form: ILoginPhoneForm, thunkApi) => {
  const response = await Api.LOGIN_PHONE<IResendOTPResponse>(form);
  return response;
});

const loginEmail = createAsyncThunk(`${SLICE_NAME.LOGIN}/loginEmail`, async (form: ILoginEmailForm, thunkApi) => {
  const response = await Api.LOGIN_EMAIL<IResendOTPResponse>(form);
  return response;
});

const loginSlice = createSlice({
  name: SLICE_NAME.LOGIN,
  initialState: initialState,
  reducers: {
    reset: () => {
      return {...initialState};
    },
  },
  extraReducers: builder => {
    builder.addCase(login.pending, (state, action) => {
      state.error = undefined;
      state.loading = true;
    });

    builder.addCase(login.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
      state.error && showToastError(state.error);
    });

    builder.addCase(loginEmail.pending, (state, action) => {
      state.error = undefined;
      state.loading = true;
    });

    builder.addCase(loginEmail.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(loginEmail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
      state.error && showToastError(state.error);
    });
  },
});

export const loginActions = {...loginSlice.actions, login, loginEmail};

export const loginReducer = loginSlice.reducer;
