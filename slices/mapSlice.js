import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import React, { useState } from 'react';
const USER = 'user';
const ABILITY = 'ability';
const COMPARE = 'compare';
const MAP = 'map';

const url = 'http://localhost:3065/map';
axios.defaults.withCredentials = true;

export const initialState = {
  kakaoMap: null,
  clusterer: null,
  clickedMarker: null,
  markers: [],
  deleteMarkers: [],
  addKakaoMapLoading: false,
  addAbilityMarkerLoading: false,
  addMarkerLoading: false,
  addMarkerDetailInfoLoading: false,

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

export const asyncAddMarkerDetailInfo = createAsyncThunk(
  `POST map/detail`,
  async (data, thunkAPI) => {
    const response = await axios.post(`${url}/detail`, data);
    return response.data;
  }
);
export const asyncAddMarker = createAsyncThunk(
  `POST map/`,
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
  },
  {
    condition: (data, { getState, extra }) => {
      const { buyHomeAbility } = getState().map;

      // fetchStatus가 fulfilled이거나 fetchStatus가 loading이면 실행 취소
      if (!buyHomeAbility) {
        return false;
      }
    },
    // 만약, thunk가 취소되더라도 rejected 액션이 디스패치되길 원한다면
    // 옵션의 dispatchConditionRejection 속성을 true로 설정한다. (기본값은 false)
    // dispatchConditionRejection: true,
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

    [asyncAddMarkerDetailInfo.pending]: (state, action) => {
      console.log('시도 중');
      state.addMarkerDetailInfoLoading = true;
    },
    [asyncAddMarkerDetailInfo.fulfilled]: (state, action) => {
      console.log('성공');
      state.addMarkerDetailInfoLoading = false;
      state.clickedMarker = action.payload;
    },
    [asyncAddMarkerDetailInfo.rejected]: (state, action) => {
      console.log('실패');
      state.addMarkerDetailInfoLoading = false;
      state.clickedMarker = initialState.clickedMarker;
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
