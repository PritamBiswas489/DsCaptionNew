import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StoreItemInterface } from "@src/interfaces/store/store.item.interface";

interface ItemsInterface {
    data: StoreItemInterface[];
    offset: number;
    limit: number;
    isFirstTimeLoading: boolean;
    isNoMoreData: boolean;
}


interface SetDataPayload {
    field: keyof ItemsInterface;
    data: string|number|any;
}


const initialState: ItemsInterface = {
    data: [],
    offset: 1,
    limit: 5,
    isFirstTimeLoading: true,
    isNoMoreData: false,
}

const storeItemSlice = createSlice({
    name: "storeItemListing",
    initialState: initialState,
    reducers: {
        setData(state: any, action: PayloadAction<SetDataPayload>) {
            state[action.payload.field] = action.payload.data;
        },
        resetState(state: ItemsInterface) {
            return initialState;
        },
        addItemArr(state, action: PayloadAction<StoreItemInterface[]>) {
            state.data.push(...action.payload);
        },
        addItem(state, action: PayloadAction<StoreItemInterface>) {
            state.data.push(action.payload);
        },
        deleteItemById(state, action: PayloadAction<number>) {
            state.data = state.data.filter( (item: StoreItemInterface) => item.id !== action.payload);
        },
    }
     
})

export const storeItemsActions = storeItemSlice.actions;
export default storeItemSlice;

