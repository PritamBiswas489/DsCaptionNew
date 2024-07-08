import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FieldState {
    company_name:string;
    company_phone_country:string;
    company_phone_dial_code:string;
    company_phone:string;
    company_address:string;
    company_email:string;
    contact_person_name:string;
    contact_person_country:string;
    contact_person_dial_code:string;
    contact_person_phone:string;
    contact_person_email:string;
    
}

interface SetDataPayload {
  field: keyof FieldState;
  data: string | number | boolean;
}

const initialState: FieldState = {
    company_name: 'dev dev',
    company_phone_country : 'IN',
    company_phone_dial_code:'91',
    company_phone:'9830990065',
    company_address:'',
    company_email:'pritam@example.com',
    contact_person_name:'',
    contact_person_country : 'IN',
    contact_person_dial_code:'91',
    contact_person_phone:'',
    contact_person_email:'',
};

const registerFieldSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setData(state:any, action: PayloadAction<SetDataPayload>) {
      state[action.payload.field] = action.payload.data;
    },
    resetState(state: FieldState) {
      return initialState;
    },
  },
});

export const registerFieldActions = registerFieldSlice.actions;
export default registerFieldSlice;
