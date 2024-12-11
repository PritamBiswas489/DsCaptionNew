import appColors from '@src/theme/appColors';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Ensure you have react-native-vector-icons installed

const StatusCard: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.statusContainer}>
        <Text style={styles.statusLabel}>Today</Text>
        <View style={{flexDirection:'row'}}>
        <Icon  name="event" size={18} color="#fff" />
        <Text style={styles.statusValue}>0</Text>

        </View>
        
      </View>
      <View style={styles.statusContainer}>
        <Text style={styles.statusLabel}>This Week</Text>
        <View style={{flexDirection:'row'}}>
        <Icon  name="event" size={18} color="#fff" />
        <Text style={styles.statusValue}>0</Text>

        </View>
      </View>
      <View style={styles.statusContainer}>
        <Text style={styles.statusLabel}>This Month</Text>
        <View style={{flexDirection:'row'}}>
        <Icon  name="event" size={18} color="#fff" />
        <Text style={styles.statusValue}>0</Text>

        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: appColors.primary,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusContainer: {
    alignItems: 'center',
  },
  statusLabel: {
    color: '#fff',
    marginBottom: 4,
    fontSize: 16,
  },
  statusValue: {
    color: '#fff',
    fontSize: 14,
    marginLeft:4, 
    fontWeight: 'bold',
  },
});

export default StatusCard;
