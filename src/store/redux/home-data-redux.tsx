import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BookingListingInterface } from "@src/interfaces/bookingListingInterface";
import { ServiceMenInterface } from "@src/interfaces/serviceMenInteface";

interface HomeDataStateInterface {
    serviceMenData:ServiceMenInterface[];
    serviceMenLimit:number;
    bookingList:BookingListingInterface[];
    bookingListLimit:number;
}


interface SetDataPayload {
    field: keyof HomeDataStateInterface;
    data: string | boolean | any;
}

const initialState: HomeDataStateInterface = {
    serviceMenData: [],
    serviceMenLimit:5,
    bookingList:[],
    bookingListLimit:5
    
};

const homeDataSlice = createSlice({
    name: "homeDataState",
    initialState: initialState,
    reducers: {
        setData(state: any, action: PayloadAction<SetDataPayload>) {
            state[action.payload.field] = action.payload.data;
        },
        resetState(state: HomeDataStateInterface) {
            return initialState;
        },
    }

})


export const homeDataActions = homeDataSlice.actions;
export default homeDataSlice;