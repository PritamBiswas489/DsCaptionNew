import {ScrollView, View} from 'react-native';
import React, {useState} from 'react';
import {GlobalStyle} from '@style/styles';
import Header from '@commonComponents/header';
import SliderContainer from '@otherComponent/sliderContainer';
import AddNewImageSection from './addNewImage';
import {windowHeight, windowWidth} from '@theme/appConstant';
import InputView from './inputView';
import StatusSection from './statusSection';
import GradientBtn from '@commonComponents/gradientBtn';
import {useValues} from '../../../../../App';
import appColors from '@theme/appColors';

export function AddNewService() {
  
  const [images, setSelectedImage] = useState<string[]>([]);
  const {isDark} = useValues();
  return (
    <ScrollView
      contentContainerStyle={{paddingBottom: windowHeight(3)}}
      showsVerticalScrollIndicator={false}
      style={[
        GlobalStyle.mainView,
        {backgroundColor: isDark ? appColors.darkCard : appColors.white},
      ]}>
      <Header showBackArrow={true} title={'addNewService.title'} />
      {images && <SliderContainer data={images} />}
      <AddNewImageSection setSelectedImage={setSelectedImage} />
      <View
        style={[
          GlobalStyle.horizontalLine,
          {
            marginTop: windowHeight(3),
            marginHorizontal: 20,
            borderColor: isDark ? appColors.darkBorder : appColors.border,
          },
        ]}
      />
      <InputView />
      <StatusSection />
      <GradientBtn
        label="addNewService.addService"
        onPress={() => {}}
        additionalStyle={{
          marginHorizontal: windowWidth(5),
          marginTop: windowHeight(3),
        }}
      />
    </ScrollView>
  );
}
