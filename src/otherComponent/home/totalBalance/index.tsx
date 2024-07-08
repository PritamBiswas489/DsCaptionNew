import {
  View,
  Text,
  Image,
  TouchableOpacity,
  GestureResponderEvent,
} from 'react-native';
import React, {FormEvent} from 'react';
import {styles} from './styles';
import {balanceBackground} from '@utils/images';
import {useValues} from '../../../../App';

export function TotalBalance({
  onPress,
}: {
  onPress: (props: FormEvent<HTMLFormElement> | undefined) => void;
}) {
  const {currSymbol, currValue,t} = useValues();
  return (
    <View style={styles.container}>
      <View>
        <Image source={balanceBackground} style={styles.imageStyle} />
        <View style={styles.innerContainer}>
          <Text style={styles.textStyle}>{t('home.totalBalance')} :</Text>
          <Text style={styles.price}>
            {currSymbol}
            {currValue * 225236.23}
          </Text>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={
              onPress as unknown as (event: GestureResponderEvent) => void
            }
            style={styles.containerView}>
            <Text style={styles.text}>{t('home.withdraw')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
