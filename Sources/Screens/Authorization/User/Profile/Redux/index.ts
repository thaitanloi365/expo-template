import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {uploadImage} from '@Services/Api/s3';
import {ICoordinate, IPagination, IS3Signature, IUpdateAvatarForm, IUser} from '@Types';
import {SLICE_NAME} from '@Utils/Constants';
import Api from '@Services/Api';
import {showToastError} from '@Utils/Toast';

export interface ProfileState {
  loading: boolean;
}

const initialAppState = {
  loading: false,
};

const updateAvatar = createAsyncThunk(
  `${SLICE_NAME.USER_PROFILE}/updateAvatar`,
  async (form: IUpdateAvatarForm, thunkApi) => {
    const s3Params = {
      content_type: form.type,
      prefix: 'avatar',
    };
    const {data, success} = await Api.GET_S3_SIGNATURE<IS3Signature>(s3Params);
    if (success) {
      const formData = new FormData();

      const {url, key, ...other} = data;

      // @ts-ignore
      Object.keys(other).forEach(k => formData.append(k, other[k]));
      formData.append('key', key);
      // @ts-ignore
      formData.append('file', form);

      try {
        await uploadImage(url, key, formData);
      } catch (err) {
        console.log('*** upload image error', err);
      }

      if (success) {
        return `${url}/${key}`;
      }
    }
    return '';
  },
);

const updateProfile = createAsyncThunk(`${SLICE_NAME.USER_PROFILE}/updateProfile`, async (form: IUser, thunkApi) => {
  const data = await Api.UPDATE_MY_PROFILE<IUser>(form);
  return data;
});

const updateLocation = createAsyncThunk(
  `${SLICE_NAME.USER_PROFILE}/updateLocation`,
  async (form: ICoordinate, thunkApi) => {
    const data = await Api.UPDATE_MY_LOCATION<ICoordinate>(form);
    return data;
  },
);

const getMyProfile = createAsyncThunk(`${SLICE_NAME.USER_PROFILE}/getMyProfile`, async (form, thunkApi) => {
  const data = await Api.GET_MY_PROFILE<IUser>(form);
  return data;
});

const profileSlice = createSlice({
  name: SLICE_NAME.USER_PROFILE,
  initialState: initialAppState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(updateAvatar.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(updateAvatar.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(updateProfile.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(updateProfile.fulfilled, (state, action) => {
      state.loading = true;
    });

    builder.addCase(updateProfile.rejected, (state, action) => {
      state.loading = false;
      action.error?.message && showToastError(action.error?.message);
    });
  },
});

export const profileActions = {
  ...profileSlice.actions,
  updateAvatar,
  updateProfile,
  getMyProfile,
  updateLocation,
};

export const profileReducer = profileSlice.reducer;
