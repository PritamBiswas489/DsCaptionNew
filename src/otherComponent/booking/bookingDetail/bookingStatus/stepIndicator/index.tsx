import React, {useState} from 'react';
import {View, Text} from 'react-native';
import StepIndicator from 'react-native-step-indicator';
import {orderTrackerData} from './data';
import {labels} from './data';
import {styles} from './styles';
import appColors from '@theme/appColors';
import appFonts from '@theme/appFonts';
import {useValues} from '../../../../../../App';

export default function StepIndicatorComponent() {
  const [currentPage, setCurrentPage] = useState(0);
  const icons = [''];
  const {isDark,t} = useValues();
  return (
    <View>
      <View style={styles.container}>
        <View>
          <StepIndicator
            customStyles={stepIndicatorStyles}
            stepCount={5}
            direction="vertical"
            currentPosition={currentPage}
            labels={labels}
            renderStepIndicator={({position}) => icons[position]}
            renderLabel={({position}) => {
              const isActive = position === currentPage;
              const labelColor = isActive
                ? isDark
                  ? appColors.white
                  : appColors.darkText
                : appColors.lightText;

              return (
                <View style={styles.labelContainer}>
                  <Text
                    style={[
                      styles.labelText,
                      {
                        color: labelColor,
                        fontFamily: isActive
                          ? appFonts.NunitoMedium
                          : appFonts.NunitoRegular,
                      },
                    ]}>
                    {t(orderTrackerData[position].label)}
                  </Text>
                  <Text
                    style={[
                      styles.status,
                      {
                        color: isDark ? appColors.white : labelColor,
                        fontFamily: isActive
                          ? appFonts.NunitoMedium
                          : appFonts.NunitoRegular,
                      },
                    ]}>
                    {t(orderTrackerData[position].status)}
                  </Text>
                </View>
              );
            }}
          />
        </View>
      </View>
    </View>
  );
}

const stepIndicatorStyles = {
  stepIndicatorSize: 10,
  currentStepIndicatorSize: 10,
  separatorStrokeWidth: 1.08,
  currentStepStrokeWidth: 5,
  stepStrokeCurrentColor: appColors.primary,
  stepStrokeWidth: 5,
  stepStrokeUnFinishedColor: appColors.border,
  separatorStrokeColor: appColors.border,
  separatorUnFinishedColor: appColors.border,
};
