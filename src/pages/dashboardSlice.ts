/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { ConfigPaginator, DistinctOptions, RequestValues } from 'interfaces';
import { SingleFilterEnum } from 'enums/singleFilter';
import { Licitacion } from 'interfaces/licitacion';
import _ from 'lodash';

interface LicitacionState {
  options?: DistinctOptions;
  requestValues?: RequestValues;
  licitaciones?: Array<Licitacion>;
  currentKey?: SingleFilterEnum | string;
  configPaginator: ConfigPaginator;
}

const initialState: LicitacionState = {
  options: {},
  requestValues: {},
  currentKey: '',
  configPaginator: {
    page: 0,
    limit: 50,
    totalResults: 0,
  },
};

export const counterSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setOptions: (state, action: PayloadAction<DistinctOptions>) => {
      state.options = action.payload;
    },
    setRequestValues: (state, action: PayloadAction<RequestValues>) => {
      state.requestValues = action.payload;
    },
    setCurrentKey: (state, action: PayloadAction<SingleFilterEnum | string>) => {
      state.currentKey = action.payload;
    },
    setLicitaciones: (state, action: PayloadAction<Array<Licitacion>>) => {
      state.licitaciones = action.payload;
    },
    setConfigPaginator: (state, action: PayloadAction<Partial<ConfigPaginator>>) => {
      _.merge(state.configPaginator, action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const { setOptions, setCurrentKey, setRequestValues, setLicitaciones, setConfigPaginator } =
  counterSlice.actions;

export const licitacionesReducer = counterSlice.reducer;
