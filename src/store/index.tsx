import { configureStore } from "@reduxjs/toolkit";
import serviceProviderAccountDataSlice from "./redux/service-provider-account-data.redux";
import registerFieldSlice from "./redux/register-field-redux";
import zoneDataSlice from "./redux/zone-list-redux";
import registerFieldErrorSlice from "./redux/register-error-redux";
import profileUpdateFieldSlice from "./redux/profile-field-redux";
import mapFieldSlice from "./redux/map-address-redux";
import profileUpdateErrorFieldSlice from "./redux/profile-error-redux";
import addServiceManFieldSlice from "./redux/add-service-man-redux";
import addServiceManErrorFieldSlice from "./redux/add-service-man-error-redux";
import bankDetailsSlice from "./redux/bank-details-redux";
import reviewsDataSlice from "./redux/reviews-list-redux";
import serviceMenDataSlice from "./redux/servicemen-list";
import ServiceMenSearchFieldSlice from "./redux/servicemen-search-field";
import serviceMenDetailsSlice from "./redux/servicemen-details-redux";

const store = configureStore({
    reducer: { 
      serviceProviderAccountData:serviceProviderAccountDataSlice.reducer,
      registerProviderField:registerFieldSlice.reducer,
      registerProviderErrorField:registerFieldErrorSlice.reducer,
      zoneList:zoneDataSlice.reducer,
      profileProviderUpdateField:profileUpdateFieldSlice.reducer,
      mapField:mapFieldSlice.reducer,
      profileUpdateErrorField:profileUpdateErrorFieldSlice.reducer,
      addServiceManField:addServiceManFieldSlice.reducer,
      addServiceManErrorField:addServiceManErrorFieldSlice.reducer,
      bankDetailsField:bankDetailsSlice.reducer,
      reviewsDataField:reviewsDataSlice.reducer,
      serviceMenDataField:serviceMenDataSlice.reducer,
      serviceMenSearchField:ServiceMenSearchFieldSlice.reducer,
      serviceMenDetailsField:serviceMenDetailsSlice.reducer
    },
  });
  
export default store;

export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
  