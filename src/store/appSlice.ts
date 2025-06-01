import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Category, CommonData, District, Product } from '@common/types';
import { APP_PATH } from '@common/constants';

const initialState: CommonData = {
  activeScreen: APP_PATH.STATE,
  smsToken: '',
  completeStep: [],
  categories: [],
  products: [],
  districts: []
};

export const appSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    setActiveScreen: (state, action: PayloadAction<string>) => {
      state.activeScreen = action.payload;
    },
    setSmsAuthToken: (state, action: PayloadAction<string>) => {
      state.smsToken = action.payload;
    },
    setCompleteStep: (state, action: PayloadAction<string>) => {
      if (!state.completeStep.includes(action.payload)) {
        state.completeStep.push(action.payload); // Only add the step if it doesn't exist
      }
    },
    setCategoryList: (state, action: PayloadAction<Category[]>) => {
      state.categories = action.payload;
    },
    setProductList: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
    },
    setDistrictList: (state, action: PayloadAction<District[]>) => {
      state.districts = action.payload;
    },
    resetApplication: () => initialState,
  },
});

export const {
  setActiveScreen,
  setSmsAuthToken,
  setCompleteStep,
  setCategoryList,
  setProductList,
  setDistrictList,
  resetApplication
} = appSlice.actions;
export default appSlice.reducer;