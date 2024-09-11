import {View, Text, Alert} from 'react-native';
import { ScrollView } from 'react-native-virtualized-view';
import React, {useState} from 'react';
import {GlobalStyle} from '@style/styles';
import CancelHeader from '@commonComponents/cancelHeader';
import {styles} from './styles';
import {bookingFilterData} from './data/data';
import SelectDateSection from './selectDateSection';
import {windowHeight} from '@theme/appConstant';
import {AddCategory} from '@screens/setting/setting/packages/addPackage/addCategory';
import GradientBtn from '@commonComponents/gradientBtn';
import {filterType} from './selectDateSection/types';
import {useValues} from '../../../../../../../App';
import appColors from '@theme/appColors';
import {DropdownWithIcon} from '@commonComponents/dropdownWithIcon';

export default function BookingReportFilter({
    setShowModal,
  
}: {setShowModal: React.Dispatch<React.SetStateAction<boolean>>}) {
  const [showInvalidDateError, setInvalidDateError] = useState(false);
  const [bookingType, setBookingType] = useState<string | any>('');
  const {isDark,t} = useValues();

   
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={[
        GlobalStyle.modal,
        {
          borderTopLeftRadius: windowHeight(3),
          borderTopRightRadius: windowHeight(3),
          backgroundColor: isDark ? appColors.darkCard : appColors.white,
        },
      ]}>
      <CancelHeader
        title={'servicemen.filterBy'}
        leftTitle={'filterModal.clearAll'}
        gotoScreen={() => setShowModal(false)}
        onButtonClick={() => setShowModal(false)}
      />
       
      
      <View
        style={[
          GlobalStyle.horizontalLine,
          {
            marginBottom: 0,
            borderColor: isDark ? appColors.darkBorder : appColors.border,
          },
        ]}
      />
      
       
      <View
        style={[
          GlobalStyle.horizontalLine,
          {
            marginTop: windowHeight(3),
            borderColor: isDark ? appColors.darkBorder : appColors.border,
          },
        ]}
      />
     
       
      <GradientBtn
        additionalStyle={styles.additionalStyle}
        label="filterModal.apply"
        onPress={() => { Alert.alert('Hello Hello Hello Hello') }}
      />
    </ScrollView>
  );
}
