import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
const USER = 'user';
const ABILITY = 'ability';
const COMPARE = 'compare';

const url = 'http://localhost:3065/user';
axios.defaults.withCredentials = true;

export const initialState = {
  data: {
    id: null,
    email: '',
    nickname: '',
    snsId: '',
    provider: '',

    abilityWrite: false,
    compareWrite: false,
  },
  ability: {
    basic: {},
    data: {},
    result: {
      allowMoney: 0,
      allowLoan: 0,
      allowJeonse: 0,
      allow: 0,
    },
    loading: false,
    getAbilityLoading: false,
    addAbilityBasicInfoLoading: false,
    addAbilityBasicInfoLoading: false,
  },
  compare: {},
  loading: false,
};

function delay() {
  return new Promise(resolve =>
    setTimeout(() => {
      console.log();
      resolve();
    }, 1000)
  );
}

export const asyncLoadMyInfo = createAsyncThunk(
  'GET',
  async (data, thunkAPI) => {
    const response = await axios({
      method: 'get',
      url,
    });
    console.log(response.data);
    return response.data;
  }
);

const realUrl = 'http://localhost:3065';
export const asyncAddAbilityBasicInfo = createAsyncThunk(
  `POST basic/${ABILITY}`,
  async (data, thunkAPI) => {
    const response = await axios.post(`${realUrl}/basic/${ABILITY}`, data);

    // await delay();
    return response.data;
  }
);

export const asyncAddAbilityInfo = createAsyncThunk(
  `POST user/${ABILITY}/:userId`,
  async (data, thunkAPI) => {
    const { id } = data;
    const response = await axios.post(`${url}/${ABILITY}/${id}`, data);
    // await delay();
    return response.data;
  }
);

const userSlice = createSlice({
  name: USER,
  initialState,
  // initialState: dummyUser,
  reducers: {
    addUser: (state, action) => {
      console.log('완료');
      state.data = action.payload;
    },
  },
  extraReducers: {
    [asyncLoadMyInfo.pending]: (state, action) => {
      console.log('시도 중');
      state.loading = true;
    },
    [asyncLoadMyInfo.fulfilled]: (state, action) => {
      console.log('성공');
      state.loading = false;
      state.data = { ...state.data, ...(action.payload?.userData || null) };
      state.ability.result = { ...(action.payload?.abilityData || null) };
    },
    [asyncLoadMyInfo.rejected]: (state, action) => {
      console.log('실패');
      state.loading = false;
      state.data = initialState;
    },

    [asyncAddAbilityBasicInfo.pending]: (state, action) => {
      console.log('시도 중');
      state.ability.addAbilityBasicInfoLoading = true;
    },
    [asyncAddAbilityBasicInfo.fulfilled]: (state, action) => {
      console.log('성공');
      state.ability.addAbilityBasicInfoLoading = false;
      state.ability.basic = action.payload;
    },
    [asyncAddAbilityBasicInfo.rejected]: (state, action) => {
      console.log('실패');
      state.ability.addAbilityBasicInfoLoading = false;
      state.ability.basic = initialState.ability.basic;
    },

    [asyncAddAbilityInfo.pending]: (state, action) => {
      console.log('시도 중');
      state.ability.addAbilityInfoLoading = true;
    },
    [asyncAddAbilityInfo.fulfilled]: (state, action) => {
      console.log('성공');
      state.ability.addAbilityInfoLoading = false;
      state.ability.result = action.payload;
    },
    [asyncAddAbilityInfo.rejected]: (state, action) => {
      console.log('실패');
      state.ability.addAbilityInfoLoading = false;
      state.ability.result = initialState.ability.result;
    },
  },
});

export const { addUser } = userSlice.actions;
export const userSliceReducer = userSlice.reducer;
