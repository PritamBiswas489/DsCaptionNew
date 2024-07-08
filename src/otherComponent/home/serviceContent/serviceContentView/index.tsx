import {View, Text} from 'react-native';
import React from 'react';
import {styles} from './styles';
import {GlobalStyle} from '@style/styles';
import {Star} from '@utils/icons';
import appColors from '@theme/appColors';
import {useValues} from '../../../../../App';
import {windowWidth} from '@theme/appConstant';
import {ServiceDescription} from './description';

export default function ServiceContentView({
  isShowPrice,
}: {
  isShowPrice: boolean;
}) {
  const {currSymbol, currValue,t} = useValues();

  return (
    <View>
      <View style={styles.contentView}>
        <View style={styles.row}>
          <View style={styles.rowContainer}>
            <View style={styles.row}>
              <Text style={[GlobalStyle.title, styles.titleStyle]}>
                {t('serviceDetail.category')}
              </Text>
              <View style={styles.verticalLine}></View>
              <Star height={'18'} />
              <Text style={[GlobalStyle.content, styles.rating]}>3.0</Text>
            </View>
            {isShowPrice && (
              <Text
                style={[
                  GlobalStyle.title,
                  styles.titleStyle,
                  {color: appColors.primary},
                ]}>
                {' '}
                {currSymbol}
                {currValue * 15.26}
              </Text>
            )}
          </View>
        </View>
        <Text style={styles.content}>{t('home.acRepair')}</Text>
      </View>
      <View style={GlobalStyle.mainContainer}>
        <ServiceDescription />
        <View style={[styles.row, styles.containerStyle]}>
          <View
            style={[
              GlobalStyle.dot,
              {marginTop: windowWidth(3), marginHorizontal: windowWidth(2)},
            ]}></View>
          <Text style={styles.content}>{t('serviceDetail.detail')}</Text>
        </View>
      </View>
    </View>
  );
}
