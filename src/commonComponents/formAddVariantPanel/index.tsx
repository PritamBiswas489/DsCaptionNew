import { Text, View, Alert, ActivityIndicator, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-virtualized-view';
import React, { useEffect, useState } from 'react';
import { GlobalStyle } from '@style/styles';
import CancelHeader from '@commonComponents/cancelHeader';
import { styles } from './styles';
import appColors from '@theme/appColors';
import ServiceItemVariantPanel from './itemVariantPanel';
import { useValues } from '../../../App';
import { ServiceInterface, ServiceVariantInterface } from '@src/interfaces/serviceInterface';
import GradientBtn from '@commonComponents/gradientBtn';
import { windowHeight, windowWidth } from '@theme/appConstant';

export function FormAddVariantPanel({ 
    selectedServiceVariants, 
    setShowAddServiceVariantModal, 
    setSelectedServiceVariants 
}:
     {
        selectedServiceVariants:ServiceInterface, 
        setShowAddServiceVariantModal: (value: boolean) => void, 
        setSelectedServiceVariants:(value:ServiceInterface)=>void 
    }) {
    const { isDark, t } = useValues();
    return (
        <>
          <ScrollView
            style={[
              GlobalStyle.mainView,
              { backgroundColor: isDark ? appColors.darkCard : appColors.white },
            ]}>
              <View style={{ paddingTop: 20 }}>
                  <CancelHeader
                    title={selectedServiceVariants.name}
                    gotoScreen={() => {
                      setShowAddServiceVariantModal(false);
                      setSelectedServiceVariants({
                        id: '',
                        name: '',
                        short_description: '',
                        description: '',
                        cover_image: '',
                        thumbnail: '',
                        order_count: '',
                        avg_rating: 0,
                        min_bidding_price: 0,
                        category: '',
                        variants:[]
                      })
                    }}
              />
            </View>
            <View style={styles.blankView} />
            {selectedServiceVariants.variants.map((variantDet:ServiceVariantInterface,index:number)=>{
                return (<ServiceItemVariantPanel
                    variantName={variantDet.variant}
                    price={variantDet.price.toFixed(2)}
                    serviceId={variantDet.service_id}
                    onSelect={()=>{}} // Function to handle checkbox selection
                    isSelected={true} // Prop to determine if the checkbox is selected
                    variantKey={variantDet.variant_key}
                    />)
            })}         
          </ScrollView>
          <GradientBtn
          label="newDeveloper.AddServiceInCart"
          onPress={() => { Alert.alert('Add service to cart panel') }}
          additionalStyle={{
            marginHorizontal: windowWidth(5),
            marginTop: windowHeight(3),
          }}
        />
        </>
    )


}