import {IPagination, IDress, IPaginationQuery} from '@Types';
import {createAsyncThunk, createEntityAdapter, createSlice, EntityState} from '@reduxjs/toolkit';
import {SLICE_NAME} from '@Utils/Constants';
import Api from '@Services/Api';

const homeDressesAdapter = createEntityAdapter<IDress>({
  selectId: dress => dress.id,
  sortComparer: (a, b) => (b.updated_at! > a.updated_at! ? 1 : -1),
});

export interface HomeState {
  loading: boolean;
  homeDressesPagination: IPagination<IDress> | null;
  homeDressesEntity: EntityState<IDress>;
  homeDresses: IDress[];

  loadingDressesInWardrobe: boolean;
  listDressesInWardrobePagination: IPagination<IDress> | null;
  listDressesInWardrobe: IDress[];
}

const initialState: HomeState = {
  loading: false,
  homeDressesPagination: null,
  homeDressesEntity: homeDressesAdapter.getInitialState(),
  homeDresses: [],

  loadingDressesInWardrobe: false,
  listDressesInWardrobePagination: null,
  listDressesInWardrobe: [],
};

const getHomeDress = createAsyncThunk(`${SLICE_NAME.HOME}/getHomeDress`, async (query: IPaginationQuery, thunkApi) => {
  const data = await Api.LIST_OTHER_DRESSES<IPagination<IDress>>(query);
  return data;
});

const getListDressesInWardrobe = createAsyncThunk(
  `${SLICE_NAME.HOME}/getListDressesInWardrobe`,
  async (query: IQueryDressesInWardrobe, thunkAPI) => {
    const data = await Api.LIST_OTHER_DRESSES<IPagination<IDress>>(query);
    return data;
  },
);

const userHomeSlice = createSlice({
  name: SLICE_NAME.HOME,
  initialState: initialState,
  reducers: {
    reset: () => {
      return {...initialState};
    },
  },
  extraReducers: builder => {
    builder.addCase(getHomeDress.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(getHomeDress.fulfilled, (state, action) => {
      state.loading = false;
      if (!state.homeDressesPagination || action.payload?.data.current_page === 1) {
        state.homeDressesPagination = action.payload.data;
        state.homeDressesEntity = homeDressesAdapter.setAll(state.homeDressesEntity, action.payload.data.records || []);
      }

      if (
        state.homeDressesPagination !== null &&
        action.payload != null &&
        action.payload?.data.current_page > state.homeDressesPagination?.current_page
      ) {
        state.homeDressesPagination = action.payload.data;
        state.homeDressesEntity = homeDressesAdapter.addMany(state.homeDressesEntity, action.payload.data.records);
      }

      state.homeDresses = homeDressesAdapter.getSelectors().selectAll(state.homeDressesEntity);
    });

    builder.addCase(getHomeDress.rejected, (state, action) => {
      state.loading = false;
    });
  },
});
export const userHomeActions = {
  ...userHomeSlice.actions,
  getHomeDress,
  getListDressesInWardrobe,
};
export const userHomeReducer = userHomeSlice.reducer;
