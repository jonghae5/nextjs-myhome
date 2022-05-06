import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const name = 'ability';

export const initialState = {
  data: {
    yearMoney: 0,
    savingRatioMoney: 0,
    mortgageLoan: 0,

    stockMoney: 0,
    bitcoinMoney: 0,
    savingMoney: 0,
    insuranceMoney: 0,
    severanceMoney: 0,
    etcMoney: 0,

    jeonDepositHome: 0,
    jutaekPriceHome: 0,

    jeonWolLoan: 0,
    jutaekLoan: 0,
    tenantLoan: 0,
    creditLoan: 0,
    businessLoan: 0,
    schoolLoan: 0,
    etcLoan: 0,
  },
  loading: false,
};

const dummyAbility = {
  data: {
    yearMoney: 80000000,
    savingRatioMoney: 65,
    mortgageLoan: 4.0,

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

export const asyncAddAbilityInfo = createAsyncThunk(
  `${name}/form`,
  async (data, thunkAPI) => {
    // const response = await thunkAPI.post(data)
    await delay();

    return data;
  }
);

export const asyncAddAbilityBasicInfo = createAsyncThunk(
  `${name}/basic`,
  async (data, thunkAPI) => {
    // const response = await thunkAPI.post(data)
    await delay();
    return data;
  }
);

const abilitySlice = createSlice({
  name,
  //   initialState,
  initialState: dummyAbility,
  reducers: {
    addAbility: (state, action) => {
      console.log('완료');
      state.data = action.payload;
    },
  },
  extraReducers: {
    [asyncAddAbilityBasicInfo.pending]: (state, action) => {
      console.log('시도 중');
      state.loading = true;
    },
    [asyncAddAbilityBasicInfo.fulfilled]: (state, action) => {
      console.log('성공');
      state.loading = false;
      state.data.mortgageLoan = action.payload.mortgageLoan;
      state.data.savingRatioMoney = action.payload.savingRatioMoney;
      state.data.yearMoney = action.payload.yearMoney;
    },
    [asyncAddAbilityBasicInfo.rejected]: (state, action) => {
      console.log('실패');
      state.loading = false;
      state = initialState;
    },

    [asyncAddAbilityInfo.pending]: (state, action) => {
      console.log('시도 중');
      state.loading = true;
    },
    [asyncAddAbilityInfo.fulfilled]: (state, action) => {
      console.log('성공');
      state.loading = false;
      state.data = { ...state.data, ...action.payload };
    },
    [asyncAddAbilityInfo.rejected]: (state, action) => {
      console.log('실패');
      state.loading = false;
      state.data = initialState;
    },
  },
});

export const { addAbility } = abilitySlice.actions;
export const abilitySliceReducer = abilitySlice.reducer;
