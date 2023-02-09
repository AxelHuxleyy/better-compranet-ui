import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import {
  ConfigPaginator,
  Contract,
  DistinctOptions,
  RequestValues,
  SingleFilterInterface,
} from 'interfaces';
import { SingleFilterEnum } from 'enums/singleFilter';
import _ from 'lodash';

interface LicitacionState {
  options?: DistinctOptions;
  requestValues?: RequestValues;
  contracts?: Array<Contract>;
  currentKey?: SingleFilterEnum | string;
  configPaginator: ConfigPaginator;
  singleFilter?: SingleFilterInterface;
  groupFilter?: DistinctOptions;
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
    setContracts: (state, action: PayloadAction<Array<Contract>>) => {
      state.contracts = action.payload;
    },
    setConfigPaginator: (state, action: PayloadAction<Partial<ConfigPaginator>>) => {
      _.merge(state.configPaginator, action.payload);
    },
    setSingleFilter: (state, action: PayloadAction<SingleFilterInterface>) => {
      state.singleFilter = action.payload;
    },
    setGroupFilter: (state, action: PayloadAction<DistinctOptions>) => {
      state.groupFilter = action.payload;
    },
  },
});

export const {
  setOptions,
  setCurrentKey,
  setRequestValues,
  setContracts,
  setConfigPaginator,
  setSingleFilter,
  setGroupFilter,
} = counterSlice.actions;

export const licitacionesReducer = counterSlice.reducer;
