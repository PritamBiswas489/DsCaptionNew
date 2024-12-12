import appColors from '@src/theme/appColors';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useValues } from '../../../../../App';

const EarningsCard = () => {
  const { isDark, t } = useValues();
  return (
    <View style={styles.container}>
      <View style={[styles.card,{backgroundColor:isDark ? appColors.darkCardBg : appColors.white  }]}>
        <Text style={styles.amount}>₹ 0</Text>
        <Text style={[styles.label,{color: isDark ? appColors.white : appColors.darkText,}]}>Pending Withdraw</Text>
      </View>
      <View style={[styles.card,{backgroundColor:isDark ? appColors.darkCardBg : appColors.white  }]}>
        <Text style={styles.amount}>₹ 255</Text>
        <Text style={[styles.label,{color: isDark ? appColors.white : appColors.darkText,}]}>Already Withdrawn</Text>
      </View>
      <View style={[styles.card,{backgroundColor:isDark ? appColors.darkCardBg : appColors.white  }]}>
        <Text style={styles.amount}>₹ 1,364</Text>
        <Text style={[styles.label,{color: isDark ? appColors.white : appColors.darkText,}]}>Total Earning</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  card: {

    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    elevation: 2, // For shadow on Android
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4, // For shadow on iOS
  },
  amount: {
    fontSize: 20,
    color: appColors.primary, // Green color
    fontWeight: 'bold',
  },
  label: {
    fontSize: 14,
    marginTop: 4,
  },
});

export default EarningsCard;
