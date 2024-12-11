import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const EarningsCard = () => {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.amount}>₹ 0</Text>
        <Text style={styles.label}>Pending Withdraw</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.amount}>₹ 255</Text>
        <Text style={styles.label}>Already Withdrawn</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.amount}>₹ 1,364</Text>
        <Text style={styles.label}>Total Earning</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f8f8f8', // Background color for the screen
  },
  card: {
    backgroundColor: '#fff',
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
    color: '#4CAF50', // Green color
    fontWeight: 'bold',
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
});

export default EarningsCard;
