import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const name = 'compare';

export const initialState = {
  data: {
    homeFirst: '',
    necessityFirst: '',
    nurtureFirst: '',
    clothFirst: '',
    eatOutSecond: '',
    leisureSecond: '',
    pinMoneySecond: '',
    communicationThird: '',
    insuranceThird: '',
    gitfThird: '',
    savingThird: '',
  },
  loading: false,
};
// export const dummyCompare = {
//   compare: {
//     homeFirst: '12',
//     necessityFirst: '2',
//     nurtureFirst: '3',
//     clothFirst: '1',
//     eatOutSecond: '2',
//     leisureSecond: '3',
//     pinMoneySecond: '4',
//     communicationThird: '1',
//     insuranceThird: '2',
//     gitfThird: '3',
//     savingThird: '4',
//   },
//   loading: false,
// };

function delay() {
  return new Promise(resolve =>
    setTimeout(() => {
      console.log();
      resolve();
    }, 3000)
  );
}

export const asyncAddCompare = createAsyncThunk(
  `${name}/form`,
  async (data, thunkAPI) => {
    // const response = await thunkAPI.post(data)
    await delay();

    return data;
  }
);

export const asyncAddBasicCompare = createAsyncThunk(
  `${name}/basic`,
  async (data, thunkAPI) => {
    // const response = await thunkAPI.post(data)
    await delay();

    return data;
  }
);

export const compareSlice = createSlice({
  name,
  initialState,
  reducers: {
    addCompare: (state, action) => {
      console.log('완료');
      state = action.payload.compare;
    },
  },
  extraReducers: {
    [asyncAddBasicCompare.pending]: (state, action) => {
      console.log('시도 중');
      state.loading = true;
    },
    [asyncAddBasicCompare.fulfilled]: (state, action) => {
      console.log('성공');
      state.loading = false;
      state.compare = action.payload.compare;
    },
    [asyncAddBasicCompare.rejected]: (state, action) => {
      console.log('실패');
      state.loading = false;
      state.compare = initialState.compare;
    },

    [asyncAddCompare.pending]: (state, action) => {
      console.log('시도 중');
      state.loading = true;
    },
    [asyncAddCompare.fulfilled]: (state, action) => {
      console.log('성공');
      state.loading = false;
      state.compare = action.payload.compare;
    },
    [asyncAddCompare.rejected]: (state, action) => {
      console.log('실패');
      state.loading = false;
      state.compare = initialState.compare;
    },
  },
});

export const { addCompare } = compareSlice.actions;
export const compareSliceReducer = compareSlice.reducer;
