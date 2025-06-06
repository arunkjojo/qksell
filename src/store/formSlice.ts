import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Category, District, FormData, Language, State, SubCategoryData, OtpCredentials } from '@common/types';

const initialState: FormData = {
  otpVerification: {
    status: false
  }
};

export const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setState: (state, action: PayloadAction<State>) => {
      state.state = action.payload;
    },
    setDistrict: (state, action: PayloadAction<District>) => {
      state.district = action.payload;
    },
    setLanguage: (state, action: PayloadAction<Language>) => {
      state.language = action.payload;
    },
    setCategory: (state, action: PayloadAction<Category>) => {
      state.category = action.payload;
    },
    setSubCategories(state, action: PayloadAction<SubCategoryData>) {
      const { value, name } = action.payload;
      const updatedItems = state?.subCategories?.filter((selectedItem) => selectedItem?.name !== name) || [];
      state.subCategories = [...updatedItems, { name, value }];
    },
    setPostRate: (state, action: PayloadAction<number>) => {
      state.postRate = action.payload;
    },
    setPostDescription: (state, action: PayloadAction<string>) => {
      state.postDescription = action.payload;
    },
    setSellRent: (state, action: PayloadAction<{ id: number; name: string; icon: string; }>) => {
      state.sellRent = action.payload;
    },
    setOwnerAgent: (state, action: PayloadAction<{ id: number; name: string; icon: string; }>) => {
      state.ownerAgent = action.payload;
    },
    setCommission: (state, action: PayloadAction<string | number>) => {
      state.commission = action.payload;
    },
    setUserName: (state, action: PayloadAction<string>) => {
      state.userName = action.payload;
    },
    setUserNumber: (state, action: PayloadAction<number>) => {
      state.userMobile = action.payload;
    },
    setOtpCredentials: (state, action: PayloadAction<OtpCredentials>) => {
      state.otpVerification = action.payload;
    },
    resetForm: () => initialState,
  },
});

export const {
  setState,
  setDistrict,
  setLanguage,
  setCategory,
  setSubCategories,
  setPostRate,
  setPostDescription,
  setSellRent,
  setUserName,
  setUserNumber,
  resetForm,
  setOtpCredentials,
  setOwnerAgent,
  setCommission
} = formSlice.actions;
export default formSlice.reducer;