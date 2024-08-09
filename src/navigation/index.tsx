import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthNavigation from './authNavigation';
import {RootStack} from './RootStackNavigator';
import {BottomTab} from './tabNavigation';
import {
  AddNewAddress,
  AddNewService,
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
  AddressCurrentLocation

} from '../screens';
import {MultipleServiceMenList} from '@otherComponent/booking/bookingDetail/multipleServiceMenList';
import {AddExtraCharges} from '@otherComponent/booking/addExtraCharges';
import {ServiceProof} from '@otherComponent/booking/serviceProof';
import {ProviderInfo} from '@screens/dashboard/serviceMan/home';
import NoInternet from '@otherComponent/noInternet';
import NetInfo from '@react-native-community/netinfo';


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
            <RootStack.Screen name="BottomTab" component={BottomTab} />
            <RootStack.Screen name="Earnings" component={Earnings} />
            <RootStack.Screen name="History" component={History} />
            <RootStack.Screen
              name="EmptyNotification"
              component={EmptyNotification}
            />
             <RootStack.Screen name="Notification" component={Notification} />
            <RootStack.Screen name="ServiceList" component={ServiceList} />
            <RootStack.Screen name="ServiceDetail" component={ServiceDetail} />
            <RootStack.Screen name="LatestBlog" component={LatestBlog} />
            <RootStack.Screen name="BlogDetail" component={BlogDetail} />
            <RootStack.Screen
              name="ServiceMenDetail"
              component={ServiceMenDetail}
            />
            <RootStack.Screen name="Reviews" component={Reviews} />
            <RootStack.Screen name="AddNewService" component={AddNewService} />
            <RootStack.Screen
              name="AddNewServiceMen"
              component={AddNewServiceMen}
            />
            <RootStack.Screen
              name="EditServiceMen"
              component={EditServiceMen}
            />
            <RootStack.Screen name="AddNewAddress" component={AddNewAddress} />
            <RootStack.Screen name="Categories" component={Categories} />
            <RootStack.Screen
              name="ServiceMenList"
              component={ServiceMenList}
            />
            <RootStack.Screen
              name="PopularServiceView"
              component={PopularServiceView}
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

           



            
          </>
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
