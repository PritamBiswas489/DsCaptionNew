import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { StyleSheet } from 'react-native';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { useValues } from '../../../App';

interface CartItemProps {
  variantName: string;
  price: string;
  
  serviceId: string;
  onSelect: (selected: boolean) => void; // Function to handle checkbox selection
  isSelected: boolean; // Prop to determine if the checkbox is selected
  variantKey: string;
}

const ServiceItemVariantPanel = ({
  variantName,
  price,
  serviceId,
  onSelect,
  isSelected,
  variantKey
}: CartItemProps) => {
  const { currSymbol } = useValues();
  return (
    <View style={styles.cartItemContainer}>
      <View>
        <BouncyCheckbox
          size={25}
          fillColor="#4CAF50"
          unFillColor="#FFFFFF"
          isChecked={isSelected}
          iconStyle={{ borderColor: "#4CAF50" }}
          onPress={(checked: boolean) => onSelect(checked)}
          style={styles.checkbox}
        />
      </View>
      <View style={styles.cartItemDetails}>
        <Text style={styles.serviceName}>{variantName}</Text>
        <Text style={styles.price}>{currSymbol}{price}</Text>
      </View>
    </View>
  );
};

export default ServiceItemVariantPanel;

export const styles = StyleSheet.create({
  cartItemContainer: {
    flexDirection: 'row', // Align items in a row
    alignItems: 'center', // Vertically center items
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
    marginVertical: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    margin: 20,
  },
  checkbox: {
    marginRight: 15, // Space between checkbox and text
  },
  cartItemDetails: {
    flex: 1, // Ensure details take up remaining space
    flexDirection: 'column', // Stack text vertically
  },
  serviceName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  variantName: {
    fontSize: 14,
    color: '#000',
    marginVertical: 2,
  },
  price: {
    fontSize: 14,
    color: '#333',
  },
});
