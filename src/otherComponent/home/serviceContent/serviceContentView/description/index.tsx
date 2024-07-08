import {Text, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {styles} from './styles';
import {fontSizes} from '@theme/appConstant';
import { useValues } from '../../../../../../App';
export function ServiceDescription() {
  const [showReadMore, setReadMore] = useState(false);
  const {t} = useValues()
  return (
    <Text style={styles.content}>
      {t('serviceDetail.serviceContent')}
      <TouchableOpacity activeOpacity={0.9} onPress={() => setReadMore(true)}>
        {!showReadMore && (
          <Text
            style={[
              styles.content,
              {textDecorationLine: 'underline', fontSize: fontSizes.FONT4},
            ]}>
            {t('serviceDetail.readMore')}
          </Text>
        )}
      </TouchableOpacity>
      {showReadMore && (
        <Text style={styles.content}>
          {' '}
          {'\n'}
          {t('serviceDetail.serviceContent')}
        </Text>
      )}
    </Text>
  );
}
