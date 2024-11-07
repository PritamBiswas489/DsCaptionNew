import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SubCategoriesInterface } from "@src/interfaces/subCategoriesInterface";


interface SubCategoryStoreInterface   {
    data:SubCategoriesInterface[];
    isFirstTimeLoading: boolean,
    isNoMoreData: boolean,
}


const initialState: SubCategoryStoreInterface = {
    data:[],
    isFirstTimeLoading: true,
    isNoMoreData: true,
}

interface SetDataPayload {
    field: keyof SubCategoryStoreInterface;
    data: any;
}

const vendorSubCategoriesSlice = createSlice({
    name: "vendorSubCategoryListing",
    initialState: initialState,
    reducers: {
      setData(state:any, action: PayloadAction<SetDataPayload>) {
        state[action.payload.field] = action.payload.data;
      },
      resetState(state: SubCategoryStoreInterface) {
        return initialState;
      },
    },
});

export const vendorSubCategoriesActions = vendorSubCategoriesSlice.actions;
export default vendorSubCategoriesSlice;
