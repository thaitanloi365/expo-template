import {
  IChatMessagePagination,
  IChatMessage,
  IRecords,
  IChatMessageWS,
  IUploadChatImageForm,
  IS3Signature,
  IMatching,
} from '@Types';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {SLICE_NAME} from '@Utils/Constants';
import Api from '@Services/Api';

export interface UserChatState {
  loading: boolean;
  matching: IMatching | null;
}

const initialState: UserChatState = {
  loading: false,
  matching: null,
};

const getMatchingDetails = createAsyncThunk(
  `${SLICE_NAME.USER_CHAT}/getMatchingDetails`,
  async (id: string, thunkApi) => {
    const data = await Api.GET_MATCHING_DETAILS<IMatching>({id});
    return data;
  },
);

const getChatMessages = createAsyncThunk(
  `${SLICE_NAME.USER_CHAT}/getChatMessages`,
  async (params: IChatMessagePagination, thunkApi) => {
    const data = await Api.LIST_CHAT_MESSAGE<IRecords<IChatMessage>>(params);
    return data;
  },
);

const sendChatMessage = createAsyncThunk(
  `${SLICE_NAME.USER_CHAT}/sendChatMessage`,
  async (params: IChatMessageWS, thunkApi) => {
    const data = await Api.SEND_CHAT_MESSAGE<IChatMessageWS>(params);
    return data;
  },
);

const updatePhotoMessage = createAsyncThunk(
  `${SLICE_NAME.USER_CHAT}/updatePhotoMessage`,
  async (params: IUploadChatImageForm, thunkApi) => {
    const {chatRoomID, ...form} = params;
    const s3Params = {
      content_type: form.type,
      prefix: `chat/${chatRoomID}`,
    };
    const {data, success} = await Api.GET_S3_SIGNATURE<IS3Signature>(s3Params);
    if (success) {
      const formData = new FormData();

      const {url, key, ...other} = data;

      // @ts-ignore
      Object.keys(other).forEach(k => formData.append(k, other[k]));
      formData.append('key', key);
      formData.append('file', form);

      try {
        const resp = await fetch(url, {
          method: 'POST',
          body: formData,
        });

        console.log('***** data', resp);
        const imageURL = `${url}/${key}`;
        return imageURL;
      } catch (err) {
        console.log('*** upload image error', err);
      }

      return '';
    }
  },
);

const userChatSlice = createSlice({
  name: SLICE_NAME.USER_CHAT,
  initialState: initialState,
  reducers: {
    reset: () => {
      return {...initialState};
    },
  },
  extraReducers: builder => {
    builder.addCase(getMatchingDetails.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(getMatchingDetails.fulfilled, (state, action) => {
      state.matching = action.payload.data;
    });

    builder.addCase(getMatchingDetails.rejected, (state, action) => {
      state.loading = false;
    });

    builder.addCase(getChatMessages.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(getChatMessages.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(getChatMessages.rejected, (state, action) => {
      state.loading = false;
    });
  },
});
export const userChatActions = {
  ...userChatSlice.actions,
  getMatchingDetails,
  getChatMessages,
  sendChatMessage,
  updatePhotoMessage,
};
export const userChatReducer = userChatSlice.reducer;
