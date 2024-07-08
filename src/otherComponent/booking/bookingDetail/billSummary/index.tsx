import React from 'react';
import {View, ImageBackground} from 'react-native';
import {styles} from './styles';
import {billBackground, darkbillBackground} from '@utils/images';
import {BillRow} from './billRow';
import appColors from '@theme/appColors';
import {GlobalStyle} from '@style/styles';
import {windowHeight, windowWidth} from '@theme/appConstant';
import BillTitle from './billTitle';
import {extraChargeType} from './types';
import {useValues} from '../../../../../App';
import appFonts from '@theme/appFonts';

export default function BillSummary(extraCharges: extraChargeType | any) {
  const {isDark} = useValues();
  return (
    <View>
      <BillTitle />
      <ImageBackground
        resizeMode={'stretch'}
        source={isDark ? darkbillBackground : billBackground}
        style={[
          styles.imageStyle,
          {
            height: extraCharges.extraCharges
              ? windowHeight(49)
              : windowHeight(38),
          },
        ]}>
        <BillRow title="billSummary.serviemenacharge" price={12} />
        <BillRow title="billSummary.totalServiceMan" price={24} />
        {extraCharges.extraCharges ? (
          <>
            <BillRow
              title={'addExtraCharges.extraServiceCharge'}
              price={extraCharges.extraCharges.amount}
              color={appColors.error}
            />
          </>
        ) : (
          <BillRow
            title="billSummary.discount"
            price={1.2}
            showMinus={true}
            color={appColors.error}
          />
        )}
        <BillRow
          title="billSummary.totalTax"
          price={15}
          color={appColors.success}
          showPlus={true}
        />
        <BillRow
          title="billSummary.platformFess"
          price={11}
          color={appColors.success}
          showPlus={true}
        />
        {!extraCharges.extraCharges && (
          <View
            style={[
              GlobalStyle.horizontalLine,
              {
                marginTop: windowWidth(1),
                marginBottom: windowWidth(6),
                borderColor: isDark ? appColors.darkBorder : appColors.border,
              },
            ]}
          />
        )}
        <BillRow
          title="billSummary.totalAmount"
          price={33.03}
          color={
            extraCharges.extraCharges ? appColors.lightText : appColors.primary
          }
          titleStyle={{
            color: isDark ? appColors.white : appColors.darkText,
            fontFamily: appFonts.NunitoSemiBold,
          }}
          priceStyle={styles.priceStyle}
        />
        {extraCharges.extraCharges && (
          <BillRow
            title="wallet.advancePaid"
            price={5.8}
            color={appColors.error}
            showMinus={true}
          />
        )}
        {extraCharges.extraCharges && (
          <>
            <View
              style={[
                GlobalStyle.horizontalLine,
                {marginTop: windowWidth(1), marginBottom: windowWidth(6)},
              ]}
            />
            <BillRow
              title="addExtraCharges.payableAmount"
              price={33.03}
              color={appColors.primary}
              titleStyle={styles.amountStyle}
              priceStyle={styles.amountStyle}
            />
          </>
        )}
      </ImageBackground>
    </View>
  );
}
