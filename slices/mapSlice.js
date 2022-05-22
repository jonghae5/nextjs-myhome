import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
const USER = 'user';
const ABILITY = 'ability';
const COMPARE = 'compare';
const MAP = 'map';

const url = 'http://localhost:3065/map';
axios.defaults.withCredentials = true;

export const initialState = {
  kakaoMap: null,
  clusterer: null,
  markers: [],
  deleteMarkers: [],
  addKakaoMapLoading: false,
  addAbilityMarkerLoading: false,
  addMarkerLoading: false,

  buyHomeAbility: false,
};

function delay() {
  return new Promise(resolve =>
    setTimeout(() => {
      console.log();
      resolve();
    }, 500)
  );
}

export const asyncAddMarker = createAsyncThunk(
  `GET map/`,
  async (data, thunkAPI) => {
    const response = await axios.post(`${url}/`, data);
    return response.data;
  }
);

export const asyncAddAbilityMarker = createAsyncThunk(
  `GET map/ability/:userId`,
  async (data, thunkAPI) => {
    const { id } = data;
    const response = await axios.post(`${url}/ability/${id}`, data);
    return response.data;
  }
);
const mapSlice = createSlice({
  name: MAP,
  initialState,
  // initialState: dummyUser,
  reducers: {
    setBuyHomeAbility: (state, action) => {
      state.buyHomeAbility = action.payload;
    },
    setKakaoMap: (state, action) => {
      state.kakaoMap = action.payload.kakaoMap;
    },
    setClusterer: (state, action) => {
      state.clusterer = action.payload.clusterer;
    },
    setDeleteMarkers: (state, action) => {
      state.deleteMarkers = action.payload;
    },
  },
  extraReducers: {
    [asyncAddAbilityMarker.pending]: (state, action) => {
      console.log('시도 중');
      state.addAbilityMarkerLoading = true;
    },
    [asyncAddAbilityMarker.fulfilled]: (state, action) => {
      console.log('성공');
      state.addAbilityMarkerLoading = false;
      state.markers = action.payload;
    },
    [asyncAddAbilityMarker.rejected]: (state, action) => {
      console.log('실패');
      state.addAbilityMarkerLoading = false;
      state.markers = initialState.markers;
    },

    [asyncAddMarker.pending]: (state, action) => {
      console.log('시도 중');
      state.addMarkerLoading = true;
    },
    [asyncAddMarker.fulfilled]: (state, action) => {
      console.log('성공');
      state.addMarkerLoading = false;
      state.markers = action.payload;
    },
    [asyncAddMarker.rejected]: (state, action) => {
      console.log('실패');
      state.addMarkerLoading = false;
      state.markers = initialState.markers;
    },
  },
});

export const {
  setBuyHomeAbility,
  setKakaoMap,
  setClusterer,
  setDeleteMarkers,
} = mapSlice.actions;
export const mapSliceReducer = mapSlice.reducer;
