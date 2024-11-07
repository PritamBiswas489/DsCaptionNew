// Notifications data
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NotificationInterface } from "@src/interfaces/store/notifications.interface";

//notification data interface
interface notificationDataInterface {
    data: NotificationInterface[],
    offsetPageUrl: string;
    limit: number;
    isFirstTimeLoading: boolean;
    isNoMoreData: boolean;
}
//initial state
const initialState: notificationDataInterface = {
    data: [],
    limit :10,
    offsetPageUrl: '?offset=1',
    isFirstTimeLoading: true,
    isNoMoreData: true,
};
interface SetDataPayload {
    field: keyof notificationDataInterface;
    data: string | boolean | any;
}
//notification list slice
const vendorNotificationListSlice = createSlice({
    name: "vendorNotificationList",
    initialState: initialState,
    reducers: {
        //set data
        setData(state: any, action: PayloadAction<SetDataPayload>) {
            state[action.payload.field] = action.payload.data;
        },
        //reset state
        resetState(state: notificationDataInterface) {
            return initialState;
        },  
        addNotificationsArr(state, action: PayloadAction<NotificationInterface[]>) {
            state.data.push(...action.payload);
        },
    },
})

export const vendorNotificationsActions = vendorNotificationListSlice.actions;
export default vendorNotificationListSlice