import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigation from './authNavigation';
import { RootStack } from './RootStackNavigator';
import { BottomTab } from './tabNavigation';
import {
  AddNewAddress,
  AddNewService,
  AddNewServiceSubCategory,
  AddNewServiceMen,
  EditServiceMen,
  BlogDetail,
  Categories,
  Earnings,
  EmptyNotification,
  History,
  LatestBlog,
  Notification,
  Reviews,
  ServiceDetail,
  ServiceList,
  MySubscriptions,
  ServiceMenList,
  PopularServiceView,
  ServiceMenDetail,
  PendingBooking,
  PendingApproval,
  MapView,
  Chat,
  AcceptedBooking,
  AssignedBooking,
  OngoingBooking,
  CompletedBooking,
  CancelledBooking,
  HoldBooking,
  AppSetting,
  ChangeCurrency,
  ChangeLanguage,
  ChangePassword,
  Subscription,
  SubscriptionPlan,
  CompanyDetail,
  CurrentLocation,
  AddNewArea,
  UserProfileSetting,
  BankDetails,
  IdVerification,
  DocumentPreview,
  CommissionHistory,
  Packages,
  AddPackage,
  PackageDetail,
  TimeSlots,
  BookingDetails,
  CommissionInfo,
  CommissionDetail,
  ChatHistory,
  Booking,
  EditBooking,
  AddressCurrentLocation,
  CoverLocationList,
  MoreMenus,
  Setting,


} from '../screens';
import { MultipleServiceMenList } from '@otherComponent/booking/bookingDetail/multipleServiceMenList';
import { AddExtraCharges } from '@otherComponent/booking/addExtraCharges';
import { ServiceProof } from '@otherComponent/booking/serviceProof';
import { ProviderInfo } from '@screens/dashboard/serviceMan/home';
import NoInternet from '@otherComponent/noInternet';
import NetInfo from '@react-native-community/netinfo';
import ContentPages from '@src/screens/dashboard/home/ContentPages';
import BusinessInformation from '@src/screens/dashboard/home/BusinessInformation';
import BusinessSettings from '@src/screens/dashboard/home/BusinessSettings';
import { ProfileAccountInformation } from '@src/screens/dashboard/home/AccountInformation';

export default function MyStack() {
  const [isConnected, setIsConnected] = useState<boolean | null>(true);

  useEffect(() => {
    NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });
  }, []);

  return (
    <NavigationContainer>
      <RootStack.Navigator
        screenOptions={{
          headerShown: false,
          headerTransparent: true,
        }}>
        {!isConnected ? (
          <RootStack.Screen name="NoInternet" component={NoInternet} />
        ) : (
          <>

            <RootStack.Screen
              name="AuthNavigation"
              component={AuthNavigation}
            />

            <RootStack.Screen name="Booking" component={Booking} />

            <RootStack.Screen name="EditBooking" component={EditBooking} />
            <RootStack.Screen name="BottomTab" component={BottomTab} />
            <RootStack.Screen name="Earnings" component={Earnings} />
            <RootStack.Screen name="History" component={History} />
            <RootStack.Screen
              name="EmptyNotification"
              component={EmptyNotification}
            />
            <RootStack.Screen name="Notification" component={Notification} />
            {/* Service list */}
            <RootStack.Screen name="ServiceList" component={ServiceList} />
            {/* Service details */}
            <RootStack.Screen name="ServiceDetail" component={ServiceDetail} />
            <RootStack.Screen name="LatestBlog" component={LatestBlog} />
            <RootStack.Screen name="BlogDetail" component={BlogDetail} />
            <RootStack.Screen
              name="ServiceMenDetail"
              component={ServiceMenDetail}
            />
            <RootStack.Screen name="Reviews" component={Reviews} />
            {/* Add new service */}
            <RootStack.Screen name="AddNewService" component={AddNewService} />
            {/* Add new Service SubCategory */}
            <RootStack.Screen name="AddNewServiceSubCategory" component={AddNewServiceSubCategory} />



            {/* Popular service view */}
            <RootStack.Screen
              name="PopularServiceView"
              component={PopularServiceView}
            />

            <RootStack.Screen
              name="MySubscriptions"
              component={MySubscriptions}
            />




            <RootStack.Screen
              name="AddNewServiceMen"
              component={AddNewServiceMen}
            />
            <RootStack.Screen
              name="EditServiceMen"
              component={EditServiceMen}
            />
            <RootStack.Screen name="AddNewAddress" component={AddNewAddress} />
            <RootStack.Screen name="CoverLocationList" component={CoverLocationList} />


            <RootStack.Screen name="Categories" component={Categories} />
            <RootStack.Screen
              name="ServiceMenList"
              component={ServiceMenList}
            />

            <RootStack.Screen
              name="AcceptedBooking"
              component={AcceptedBooking}
            />

            <RootStack.Screen
              name="OngoingBooking"
              component={OngoingBooking}
            />
            <RootStack.Screen
              name="PendingBooking"
              component={PendingBooking}
            />
            <RootStack.Screen
              name="PendingApproval"
              component={PendingApproval}
            />
            <RootStack.Screen name="MapView" component={MapView} />
            <RootStack.Screen name="Chat" component={Chat} />
            <RootStack.Screen name="ChatHistory" component={ChatHistory} />

            <RootStack.Screen
              name="CompletedBooking"
              component={CompletedBooking}
            />
            <RootStack.Screen
              name="AddExtraCharges"
              component={AddExtraCharges}
            />
            <RootStack.Screen name="ServiceProof" component={ServiceProof} />
            <RootStack.Screen
              name="CancelledBooking"
              component={CancelledBooking}
            />
            <RootStack.Screen name="HoldBooking" component={HoldBooking} />
            <RootStack.Screen
              name="AssignedBooking"
              component={AssignedBooking}
            />
            <RootStack.Screen name="AppSetting" component={AppSetting} />
            <RootStack.Screen
              name="ChangeCurrency"
              component={ChangeCurrency}
            />
            <RootStack.Screen
              name="ChangeLanguage"
              component={ChangeLanguage}
            />

            <RootStack.Screen
              name="SubscriptionPlan"
              component={SubscriptionPlan}
            />
            <RootStack.Screen name="Subscription" component={Subscription} />

            <RootStack.Screen
              name="MultipleServiceMenList"
              component={MultipleServiceMenList}
            />
            <RootStack.Screen
              name="ChangePassword"
              component={ChangePassword}
            />
            <RootStack.Screen
              name="UserProfileSetting"
              component={UserProfileSetting}
            />
            <RootStack.Screen name="BankDetails" component={BankDetails} />
            <RootStack.Screen
              name="IdVerification"
              component={IdVerification}
            />
            <RootStack.Screen
              name="DocumentPreview"
              component={DocumentPreview}
            />
            <RootStack.Screen name="Packages" component={Packages} />

            <RootStack.Screen name="TimeSlots" component={TimeSlots} />
            <RootStack.Screen
              name="CommissionHistory"
              component={CommissionHistory}
            />
            <RootStack.Screen name="PackageDetail" component={PackageDetail} />
            <RootStack.Screen name="AddPackage" component={AddPackage} />
            <RootStack.Screen
              name="BookingDetails"
              component={BookingDetails}
            />
            <RootStack.Screen name="CompanyDetail" component={CompanyDetail} />
            <RootStack.Screen name="AddNewArea" component={AddNewArea} />
            <RootStack.Screen
              name="CommissionInfo"
              component={CommissionInfo}
            />
            <RootStack.Screen
              name="CommissionDetail"
              component={CommissionDetail}
            />
            <RootStack.Screen
              name="AddressCurrentLocation"
              component={AddressCurrentLocation}
            />
            <RootStack.Screen name="ProviderInfo" component={ProviderInfo} />
            <RootStack.Screen
              name="CurrentLocation"
              component={CurrentLocation}
            />

            <RootStack.Screen
              name="MoreMenus"
              component={MoreMenus}
            />

            <RootStack.Screen
              name="ProfileSettings"
              component={Setting}
            />
            <RootStack.Screen
              name="ContentPages"
              component={ContentPages}
            />
            <RootStack.Screen
              name="BusinessInformation"
              component={BusinessInformation}
            />

            <RootStack.Screen
              name="BusinessSettings"
              component={BusinessSettings}
            />

            <RootStack.Screen
              name="ProfileAccountInformation"
              component={ProfileAccountInformation}
            />







          </>
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
