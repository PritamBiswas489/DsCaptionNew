import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DropdownItem } from "@src/commonComponents/dropdownWithIcon/types";

interface FieldState {
      company_name:string;
      company_phone:string;
      company_address:string;
      company_email:string;
      contact_person_name:string;
      contact_person_phone:string;
      contact_person_email:string;
      zone_id : string;
      password:string;
      logo:string;
      latitude:number;
      longitude:number;
}

interface SetDataPayload {
    field: keyof FieldState;
    data: string | number | boolean| DropdownItem;
}

const initialState: FieldState = {
    company_name: '',
    company_phone:'',
    company_address:'',
    company_email:'',
    contact_person_name:'',
    contact_person_phone:'',
    contact_person_email:'',
    zone_id:'',
    password:'',
    logo:'',
    latitude:0,
    longitude:0
}

const profileUpdateErrorFieldSlice = createSlice({
    name: "userProfileErrorField",
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
  
  export const profileUpdateErrorFieldActions = profileUpdateErrorFieldSlice.actions;
  export default profileUpdateErrorFieldSlice;
