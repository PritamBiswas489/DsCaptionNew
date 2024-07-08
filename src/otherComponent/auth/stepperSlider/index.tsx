import React, {useEffect, useState} from 'react';
import {View, Text, Animated} from 'react-native';
import {styles} from './styles';
import ProgressBar from './progressBar';
import {progressIndicatorProps} from '../header/types';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from 'src/navigation/types';
import CompanyDetails from '@screens/auth/provider/register/companyDetails';
import CompanyLocation from '@screens/auth/provider/register/companyLocation';
import ProviderDetails from '@screens/auth/provider/register/providerDetails';
import {FreeLancerDetails} from '@screens/auth';
import {getValue} from '@utils/localstorage';
import BusinessInformation from '@src/screens/auth/provider/register/businessInformation';



export function ProgressStepsSlider({
  data,
  currentStep,
  handlePrevStep,
  stepCount,
  setCurrentStep,
  progress,
}: progressIndicatorProps) {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [isFreelancerLogin, setIsFreelancerLogin] = useState<boolean>();

  useEffect(() => {
    checkFreelancerLogin();
  }, []);

  const checkFreelancerLogin = async () => {
    const freelancerLogin = await getValue('freelancerLogin');
    freelancerLogin && setIsFreelancerLogin(true);
  };

  const handleNextStep = () => {
    if (currentStep < stepCount) {
      setCurrentStep(currentStep + 1);
      Animated.timing(progress, {
        toValue: currentStep / stepCount,
        duration: 200,
        useNativeDriver: false,
      }).start();
    } else if (currentStep === stepCount) {
      navigation.navigate('LoaderScreen');
    }
  };

  const renderProgressIndicator = () => {
    const indicators = [];
    for (let i = 1; i <= stepCount; i++) {
      const isCurrentStep = i <= currentStep;
      const indicatorStyle = isCurrentStep
        ? [styles.indicator, styles.currentIndicator]
        : styles.indicator;
      indicators.push(
        <View key={i} style={indicatorStyle}>
          <Text style={styles.indicatorText}>{i}</Text>
        </View>,
      );
    }
    return indicators;
  };
  const renderScreen = () => {
    switch (currentStep) {
      case 1:
        return isFreelancerLogin ? <FreeLancerDetails /> : <CompanyDetails />;
      case 2:
        return <BusinessInformation />;
      case 3:
        return isFreelancerLogin ? null : <ProviderDetails />;
      default:
        return null;
    }
    
  };
  return (
    <ProgressBar
      handleNextStep={handleNextStep}
      renderProgressIndicator={renderProgressIndicator}
      renderScreen={renderScreen}
      currentStep={currentStep}
      handlePrevStep= {handlePrevStep}
      stepCount={stepCount}
    />
    
    
  );
}
