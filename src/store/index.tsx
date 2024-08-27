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
import serviceCategoriesDataSlice from "./redux/service-category-redux";
import serviceSubCategoriesSlice from "./redux/service-sub-category-redux";
import servicesSlice from "./redux/service-redux";
import serviceDetailsSlice from "./redux/service-details-redux";
import mySubscriptionsSlice from "./redux/my-subscriptions-redux";
import bookingSearchFieldSlice from "./redux/booking-search-field";
import allListingSlice from "./redux/all-listing-redux";
import pendingListingSlice from "./redux/pending-listing-redux";
import acceptedListingSlice from "./redux/accepted.listing-redux";
import ongoingListingSlice from "./redux/ongoing-listing-redux";
import completedListingSlice from "./redux/completed-listing-redux";
import canceledListingSlice from "./redux/canceled-listing-redux";
import bookingDetailsSlice from "./redux/booking-details-redux";
import servicesFormSlice from "./redux/service-form-redux";
import configAppSlice from "./redux/config-redux";
import homeDataSlice from "./redux/home-data-redux";


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
      serviceMenDetailsField:serviceMenDetailsSlice.reducer,
      serviceCategories : serviceCategoriesDataSlice.reducer,
      serviceSubCategories : serviceSubCategoriesSlice.reducer,
      servicesData : servicesSlice.reducer,
      serviceDetailsData:serviceDetailsSlice.reducer,
      mysubscriptionsData:mySubscriptionsSlice.reducer,  
      bookingSearchField:bookingSearchFieldSlice.reducer,
      allListingSearch: allListingSlice.reducer,
      pendingListingSearch:pendingListingSlice.reducer,
      acceptedListingSearch:acceptedListingSlice.reducer,
      ongoingListingSearch:ongoingListingSlice.reducer,
      completedListingSearch:completedListingSlice.reducer,
      cancelListingSearch:canceledListingSlice.reducer,
      bookingDetails:bookingDetailsSlice.reducer,
      servicesFormData:servicesFormSlice.reducer,
      providerAppConfig:configAppSlice.reducer,
      homeData:homeDataSlice.reducer,
    },
  });
  
export default store;

export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
  