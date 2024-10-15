import React, {useState, createContext, useContext, useEffect} from 'react';
import Navigation from './src/navigation';
import {ThemeContextType} from './src/utils/types';
import {useTranslation} from 'react-i18next';

import {ScrollView, TouchableOpacity, View,Text} from 'react-native';

const initialContextVal = {
  currSymbol: '$',
  currValue: 1,
  isDark: true,
  setIsDark: () => {},
  notificationSound:true,
  setNotificationSound:()=>{},
  setCurrValue: () => {},
  setCurrSymbol: () => {},
  isServiceManLogin: false,
  setIsServiceManLogin: () => {},
  isFreelancerLogin: false,
  setIsFreeLancerLogin: () => {},
  loggedInUserType:'', //logged in user type
  setLoggedInUserType:()=>{}, 
  t: '',
};

export const ThemeContext = createContext<ThemeContextType>(initialContextVal);

const App: React.FC = () => {
  const [currSymbol, setCurrSymbol] = useState('₹');
  const [currValue, setCurrValue] = useState(1);
  const [isDark, setIsDark] = useState(initialContextVal.isDark);
  const [notificationSound, setNotificationSound] = useState(initialContextVal.notificationSound);
  const [isServiceManLogin, setIsServiceManLogin] = useState(initialContextVal.isServiceManLogin);
  const [isFreelancerLogin, setIsFreeLancerLogin] = useState(initialContextVal.isFreelancerLogin);
  const [loggedInUserType, setLoggedInUserType] = useState(initialContextVal.loggedInUserType);
  const {t} = useTranslation();
  const contextValue = {
    currSymbol,
    setCurrSymbol,
    currValue,
    setCurrValue,
    isDark,
    setIsDark,
    notificationSound,
    setNotificationSound,
    isServiceManLogin,
    setIsServiceManLogin,
    isFreelancerLogin,
    setIsFreeLancerLogin,
    t,
    loggedInUserType,
    setLoggedInUserType
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      <Navigation />
    </ThemeContext.Provider>
  );
};

export default App;

export const useValues = () => useContext(ThemeContext);
