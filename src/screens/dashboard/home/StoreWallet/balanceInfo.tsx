import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const BalanceInfo: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.amount}>₹ 0</Text>
        <Text style={styles.label}>Cash in Hand</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.amount}>₹ 1,109</Text>
        <Text style={styles.label}>Withdrawable Balance</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
  card: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
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
    fontSize: 24,
    color: '#4caf50',
    fontWeight: 'bold',
  },
  label: {
    fontSize: 16,
    color: '#888',
    marginTop: 8,
  },
});

export default BalanceInfo;
