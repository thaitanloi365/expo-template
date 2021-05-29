import {ILoginPhoneForm, ILoginResponse, IResendOTPResponse, IVerifyOTPEmailForm, IVerifyOTPForm} from '@Types';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {SLICE_NAME} from '@Utils/Constants';
import Api from '@Services/Api';
import {showToastError} from '@Utils/Toast';

export interface VerifyOTPState {
  loading: boolean;
}
const initialState: VerifyOTPState = {
  loading: false,
};

const verifyOTP = createAsyncThunk(`${SLICE_NAME.VERIFY_OTP}/verifyOTP`, async (form: IVerifyOTPForm, thunkApi) => {
  const response = await Api.VERIFY_OTP<ILoginResponse>(form);
  return response;
});

const resendOTP = createAsyncThunk(`${SLICE_NAME.VERIFY_OTP}/resendOTP`, async (form: ILoginPhoneForm, thunkApi) => {
  const response = await Api.RESEND_OTP<IResendOTPResponse>(form);
  return response;
});

const otpSlice = createSlice({
  name: SLICE_NAME.VERIFY_OTP,
  initialState: initialState,
  reducers: {
    reset: () => {
      return {...initialState};
    },
  },
  extraReducers: builder => {
    //Phone
    builder.addCase(verifyOTP.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(verifyOTP.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(verifyOTP.rejected, (state, action) => {
      state.loading = false;
      action.error.message && showToastError(action.error.message);
    });

    builder.addCase(resendOTP.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(resendOTP.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(resendOTP.rejected, (state, action) => {
      state.loading = false;
      action.error.message && showToastError(action.error.message);
    });
  },
});

export const otpActions = {...otpSlice.actions, verifyOTP, resendOTP};
export const otpReducer = otpSlice.reducer;
