import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const name = 'ability';

export const initialState = {
  ability: {
    yearMoney: '',
    savingRatioMoney: '',
    bitcoinMoney: '',
    savingMoney: '',
    insuranceMoney: '',
    severanceMoney: '',
    etcMoney: '',

    jeonDepositHome: '',
    jutaekPriceHome: '',

    jeonWolLoan: '',
    jutaekLoan: '',
    tenantLoan: '',
    creditLoan: '',
    businessLoan: '',
    schoolLoan: '',
    etcLoan: '',
  },
  loading: false,
};

// const dummyAbility = {
//   ability: {
//     yearMoney: '2000만',
//     savingRatioMoney: '20%',
//     stockMoney: '500만',
//     bitcoinMoney: '1만',
//     savingMoney: '50만',
//     insuranceMoney: '25만',
//     severanceMoney: '0원',
//     etcMoney: '0',

//     jeonDepositHome: '58',
//     jutaekPriceHome: '199',

//     jeonWolLoan: '12',
//     jutaekLoan: '23',
//     tenantLoan: '1',
//     creditLoan: '0',
//     businessLoan: '0',
//     schoolLoan: '0',
//     etcLoan: '0',
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

export const asyncAddAbility = createAsyncThunk(
  `${name}/form`,
  async (data, thunkAPI) => {
    // const response = await thunkAPI.post(data)
    await delay();

    return data;
  }
);

const abilitySlice = createSlice({
  name,
  initialState,
  reducers: {
    addAbility: (state, action) => {
      console.log('완료');
      state.ability = action.payload.ability;
    },
  },
  extraReducers: {
    [asyncAddAbility.pending]: (state, action) => {
      console.log('시도 중');
      state.loading = true;
    },
    [asyncAddAbility.fulfilled]: (state, action) => {
      console.log('성공');
      state.loading = false;
      state.ability = action.payload.ability;
    },
    [asyncAddAbility.rejected]: (state, action) => {
      console.log('실패');
      state.loading = false;
      state.ability = initialState.ability;
    },
  },
});

export const { addAbility } = abilitySlice.actions;
export const abilitySliceReducer = abilitySlice.reducer;
