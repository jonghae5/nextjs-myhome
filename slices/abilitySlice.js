import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const name = 'ability';
const url = 'http://localhost:3065';
axios.defaults.withCredentials = true;

export const initialState = {
  basic: {
    yearMoney: null,
    savingRatioMoney: null,
    mortgageLoan: null,
  },
  data: {
    stockMoney: null,
    bitcoinMoney: null,
    savingMoney: null,
    insuranceMoney: null,
    severanceMoney: null,
    etcMoney: null,

    jeonDepositHome: null,
    jutaekPriceHome: null,

    jeonWolLoan: null,
    jutaekLoan: null,
    tenantLoan: null,
    creditLoan: null,
    businessLoan: null,
    schoolLoan: null,
    etcLoan: null,
  },
  result: {
    allowMoney: null,
    allowJeonse: null,
    allowLoan: null,
    allow: null,
  },
  loading: false,
  getAbilityLoading: false,
};

const dummyAbility = {
  basic: {
    yearMoney: 80000000,
    savingRatioMoney: 65,
    mortgageLoan: 4.0,
  },
  data: {
    stockMoney: 30000000,
    bitcoinMoney: 0,
    savingMoney: 40000000,
    insuranceMoney: 0,
    severanceMoney: 5000000,
    etcMoney: 0,

    jeonDepositHome: 150000000,
    jutaekPriceHome: 0,

    jeonWolLoan: 0,
    jutaekLoan: 0,
    tenantLoan: 0,
    creditLoan: 0,
    businessLoan: 0,
    schoolLoan: 0,
    etcLoan: 0,
  },
  result: {
    allowMoney: 0,
    allowJeonse: 0,
    allowLoan: 0,
    allow: 0,
  },
  loading: false,
  addAbilityInfoLoading: false,
  getAbilityLoading: false,
  addAbilityBasicInfoLoading: false,
};

function delay() {
  return new Promise(resolve =>
    setTimeout(() => {
      console.log();
      resolve();
    }, 1000)
  );
}

export const asyncGetAbilityResult = createAsyncThunk(
  `POST ${name}/result/:userId`,
  async (id, thunkAPI) => {
    // console.log(finalData);
    const response = await axios.get(`${url}/${name}/result/${id}`);
    // await delay();
    return response.data;
  }
);

export const asyncAddAbilityInfo = createAsyncThunk(
  `POST ${name}/:userId`,
  async (data, thunkAPI) => {
    const { id, ...finalData } = data;
    // console.log(finalData);
    const response = await axios.post(`${url}/${name}/${id}`, finalData);
    // await delay();
    return response.data;
  }
);

export const asyncAddAbilityBasicInfo = createAsyncThunk(
  `POST basic/${name}`,
  async (data, thunkAPI) => {
    console.log(data);
    const response = await axios.post(`${url}/basic/${name}`, data);

    console.log(response.data);
    // await delay();
    return response.data;
  }
);

const abilitySlice = createSlice({
  name,
  initialState,
  // initialState: dummyAbility,
  reducers: {
    addAbility: (state, action) => {
      console.log('완료');
      state.data = action.payload;
    },
  },
  extraReducers: {
    [asyncAddAbilityBasicInfo.pending]: (state, action) => {
      console.log('시도 중');
      state.addAbilityBasicInfoLoading = true;
    },
    [asyncAddAbilityBasicInfo.fulfilled]: (state, action) => {
      console.log('성공');
      state.addAbilityBasicInfoLoading = false;
      state.basic = action.payload;
    },
    [asyncAddAbilityBasicInfo.rejected]: (state, action) => {
      console.log('실패');
      state.addAbilityBasicInfoLoading = false;
      state.basic = initialState.basic;
    },

    [asyncAddAbilityInfo.pending]: (state, action) => {
      console.log('시도 중');
      state.addAbilityInfoLoading = true;
    },
    [asyncAddAbilityInfo.fulfilled]: (state, action) => {
      console.log('성공');
      state.addAbilityInfoLoading = false;
      state.data = action.payload;
    },
    [asyncAddAbilityInfo.rejected]: (state, action) => {
      console.log('실패');
      state.addAbilityInfoLoading = false;
      state.data = initialState.data;
    },

    [asyncGetAbilityResult.pending]: (state, action) => {
      console.log('시도 중');
      state.getAbilityLoading = true;
    },
    [asyncGetAbilityResult.fulfilled]: (state, action) => {
      console.log('성공');
      state.getAbilityLoading = false;
      state.result = action.payload;
    },
    [asyncGetAbilityResult.rejected]: (state, action) => {
      console.log('실패');
      state.getAbilityLoading = false;
      state.result = initialState.result;
    },
  },
});

export const { addAbility } = abilitySlice.actions;
export const abilitySliceReducer = abilitySlice.reducer;
