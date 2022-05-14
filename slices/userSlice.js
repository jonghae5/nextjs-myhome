import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
const name = 'user';
const url = 'http://localhost:3065';
axios.defaults.withCredentials = true;

export const initialState = {
  data: {
    id: null,
    email: '',
    nickname: '',
    snsId: '',
    provider: '',
  },
  loading: false,
};

const dummyUser = {
  data: {
    id: 1,
    email: 'dhwhdgo2368@gmail.com',
    // password: 'dhwhdgo',
    nickname: 'John',
    snsId: '12345123',
    provider: 'kakao',
  },
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
  'GET /',
  async (data, thunkAPI) => {
    const response = await axios({
      method: 'get',
      url: `${url}/user/`,
    });
    console.log(response);
    return response.data;
  }
);

const userSlice = createSlice({
  name,
  //   initialState,
  initialState: dummyUser,
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
      state.data = { ...state.data, ...action.payload };
    },
    [asyncLoadMyInfo.rejected]: (state, action) => {
      console.log('실패');
      state.loading = false;
      state.data = initialState;
    },
  },
});

export const { addUser } = userSlice.actions;
export const userSliceReducer = userSlice.reducer;
