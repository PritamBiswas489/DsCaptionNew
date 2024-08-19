import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BookingDetailsInterface } from "@src/interfaces/bookingDetailsInterface";


interface BookingDetailsState {
    data: {id:string,details:BookingDetailsInterface}[]
}

interface SetDataPayload {
    field: keyof BookingDetailsState;
    data: string | boolean | any;
}

const initialState: BookingDetailsState = {
    data: [],
};

const bookingDetailsSlice = createSlice({
    name: "bookingServiceDetails",
    initialState: initialState,
    reducers: {
        setData(state: any, action: PayloadAction<SetDataPayload>) {
            state[action.payload.field] = action.payload.data;
        },
        resetState(state: BookingDetailsState) {
            return initialState;
        },
        addBookingDetailsArr(state, action: PayloadAction<BookingDetailsInterface>) {
            state.data.push({id:action.payload.id,details:action.payload});
        },
    }
});

export const bookingDetailsAction = bookingDetailsSlice.actions;
export default bookingDetailsSlice;