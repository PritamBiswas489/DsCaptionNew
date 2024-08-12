import React, {useState, createContext, useContext, useEffect} from 'react';
import Navigation from './src/navigation';
import {ThemeContextType} from './src/utils/types';
import {useTranslation} from 'react-i18next';

import {ScrollView, TouchableOpacity, View,Text} from 'react-native';

const initialContextVal = {
  currSymbol: '$',
  currValue: 1,
  isDark: false,
  setIsDark: () => {},
  setCurrValue: () => {},
  setCurrSymbol: () => {},
  isServiceManLogin: false,
  setIsServiceManLogin: () => {},
  isFreelancerLogin: false,
  setIsFreeLancerLogin: () => {},
  t: '',
};

export const ThemeContext = createContext<ThemeContextType>(initialContextVal);

const App: React.FC = () => {
  const [currSymbol, setCurrSymbol] = useState('₹');
  const [currValue, setCurrValue] = useState(1);
  const [isDark, setIsDark] = useState(false);
  const [isServiceManLogin, setIsServiceManLogin] = useState(false);
  const [isFreelancerLogin, setIsFreeLancerLogin] = useState(false);
  const {t} = useTranslation();
  const contextValue = {
    currSymbol,
    setCurrSymbol,
    currValue,
    setCurrValue,
    isDark,
    setIsDark,
    isServiceManLogin,
    setIsServiceManLogin,
    isFreelancerLogin,
    setIsFreeLancerLogin,
    t,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      <Navigation />
      {/* <View>
        <Text>ddddd</Text>
      </View> */}
    </ThemeContext.Provider>
  );
};

export default App;

export const useValues = () => useContext(ThemeContext);
