import appColors from '@src/theme/appColors';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useValues } from '../../../../../App';

const BalanceInfo: React.FC = () => {
  const { isDark, t } = useValues();
  return (
    <View style={styles.container}>
      <View style={[styles.card,{backgroundColor:isDark ? appColors.darkCardBg : appColors.white  }]}>
        <Text style={styles.amount}>₹ 0</Text>
        <Text style={[styles.label,{color: isDark ? appColors.white : appColors.darkText}]}>Cash in Hand</Text>
      </View>
      <View style={[styles.card,{backgroundColor:isDark ? appColors.darkCardBg : appColors.white  }]}>
        <Text style={styles.amount}>₹ 1,109</Text>
        <Text style={[styles.label,{color: isDark ? appColors.white : appColors.darkText}]}>Withdrawable Balance</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 4,
  },
  card: {
    flex: 1,
    padding: 8,
    margin: 8,
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  amount: {
    fontSize: 18,
    color: appColors.primary,
    fontWeight: 'bold',
  },
  label: {
    fontSize: 14,
    marginTop: 8,
  },
});

export default BalanceInfo;
