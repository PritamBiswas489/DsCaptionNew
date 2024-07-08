import React from 'react';
import {RootStack} from './RootStackNavigator';
import {
  SplashScreen,
  IntroSlider,
  ForgotPassword,
  VerifyOtp,
  ResetPassword,
  Register,
  CompanyLocation,
  ProviderDetails,
  CompanyDetails,
  Login,
  FreeLancerDetails,
  LoaderScreen,
} from '../screens';

//import {SplashScreen} from '@screens/splash';

export default function AuthNavigation() {
  return (
    <RootStack.Navigator
      screenOptions={{
        headerShown: false,
        headerTransparent: true,
      }}>
      <RootStack.Screen name="SplashScreen" component={SplashScreen} />
      <RootStack.Screen name="IntroSlider" component={IntroSlider} />
      <RootStack.Screen name="Login" component={Login} />
      <RootStack.Screen name="ForgotPassword" component={ForgotPassword} />
      <RootStack.Screen name="VerifyOtp" component={VerifyOtp} />
      <RootStack.Screen name="ResetPassword" component={ResetPassword} />
      <RootStack.Screen name="Register" component={Register} />
      <RootStack.Screen name="CompanyLocation" component={CompanyLocation} />
      <RootStack.Screen name="ProviderDetails" component={ProviderDetails} />
      <RootStack.Screen name="FreelancerDetail" component={FreeLancerDetails} />
      <RootStack.Screen name="CompanyDetails" component={CompanyDetails} />
      <RootStack.Screen name="LoaderScreen" component={LoaderScreen} />
    </RootStack.Navigator>
  );
}
