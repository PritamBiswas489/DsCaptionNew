import appColors from '@src/theme/appColors';
import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';// Importing FontAwesome

const StoreStatus: React.FC = () => {
  const [isStoreClosed, setIsStoreClosed] = useState(false);

  const toggleSwitch = () => setIsStoreClosed(previousState => !previousState);

  return (
    <View style={styles.container}>
      <View style={styles.statusContainer}>
        <Text style={styles.statusText}>Store Temporarily Closed</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isStoreClosed ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isStoreClosed}
        />
      </View>

      <View style={styles.card}>
        <View style={styles.walletContainer}>
        <Icon name="account-balance-wallet" size={60} color="#fff" />
          <Text style={styles.walletText}>Today</Text>
          <Text style={styles.walletAmount}>₹ 0</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.balanceContainer}>
          <View style={styles.balanceColumn}>
            <Text style={styles.balanceText}>This Week</Text>
            <Text style={styles.balanceAmount}>₹ 0</Text>
          </View>
          <View style={styles.balanceColumn}>
            <Text style={styles.balanceText}>This Month</Text>
            <Text style={styles.balanceAmount}>₹ 400</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  statusText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: appColors.primary,
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  walletContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  walletIcon: {
    marginBottom: 8,
  },
  walletText: {
    color: '#fff',
    fontSize: 16,
  },
  walletAmount: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: '#fff',
    marginBottom: 16,
  },
  balanceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  balanceColumn: {
    alignItems: 'center',
  },
  balanceText: {
    color: '#fff',
    fontSize: 16,
  },
  balanceAmount: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default StoreStatus;
