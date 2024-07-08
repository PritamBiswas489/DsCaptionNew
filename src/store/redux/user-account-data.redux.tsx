import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  id: number;
  name: string;
  email: string;
  phone: string;
  phoneCountryCode: string;
  avatar: string;
  role: string;
  isPromoted: number;
  walletAmount: number;
  language: string;
  isLoggedIn: boolean;
}

interface SetDataPayload {
  field: keyof UserState;
  data: string | number | boolean;
}

const initialState: UserState = {
  id: 0,
  name: '',
  email: '',
  phone: '',
  phoneCountryCode: '',
  avatar: '',
  role: '',
  isPromoted: 0,
  walletAmount: 0.00,
  language: '',
  isLoggedIn: false,
};

const userAccountDataSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setData(state:any, action: PayloadAction<SetDataPayload>) {
      state[action.payload.field] = action.payload.data;
    },
    resetState(state: UserState) {
      return initialState;
    },
  },
});

export const userAccountDataActions = userAccountDataSlice.actions;
export default userAccountDataSlice;
