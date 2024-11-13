import appColors from '@src/theme/appColors';
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { RadioButton, Checkbox, IconButton } from 'react-native-paper';

interface Option {
  name: string;
  price: string;
}

//Food variation
export const FoodVariation = () => {
  const [name, setName] = useState('');
  const [isRequired, setIsRequired] = useState(false);
  const [type, setType] = useState('single');
  const [options, setOptions] = useState<Option[]>([{ name: '', price: '' }]);

  const addOption = () => {
    setOptions([...options, { name: '', price: '' }]);
  };

  const removeOption = (index: number) => {
    setOptions(options.filter((_, i) => i !== index));
  };

  const handleOptionChange = (index: number, field: keyof Option, value: string) => {
    const newOptions = [...options];
    newOptions[index][field] = value;
    setOptions(newOptions);
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />
        <Checkbox
          status={isRequired ? 'checked' : 'unchecked'}
          onPress={() => setIsRequired(!isRequired)}
        />
        <Text style={styles.label}>Required</Text>
      </View>

      <View style={styles.row}>
        <RadioButton.Group onValueChange={newValue => setType(newValue)} value={type}>
        <View style={styles.radioContainer}>
          <View style={styles.radioButton}>
            <RadioButton value="single" />
            <Text style={styles.label}>Single</Text>
          </View>
          <View style={styles.radioButton}>
            <RadioButton value="multiple" />
            <Text style={styles.label}>Multiple</Text>
          </View>
          </View>
        </RadioButton.Group>
      </View>

    
        <View style={styles.panel}>
          
          {options.map((option, index) => (
            <View key={index} style={styles.optionRow}>
              <TextInput
                style={styles.optionInput}
                placeholder="Option Name"
                value={option.name}
                onChangeText={text => handleOptionChange(index, 'name', text)}
              />
              <TextInput
                style={styles.optionInput}
                placeholder="Price"
                value={option.price}
                onChangeText={text => handleOptionChange(index, 'price', text)}
                keyboardType="numeric"
              />
              <IconButton
                icon="delete"
                size={20}
                onPress={() => removeOption(index)}
              />
            </View>
          ))}
          <TouchableOpacity style={styles.addButton} onPress={addOption}>
            <Text style={styles.addButtonText}>Add Option</Text>
          </TouchableOpacity>
        </View>
       
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderWidth:1,
    borderColor:appColors.primary
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    flex: 1,
    marginRight: 10,
  },
  label: {
    marginLeft: 5,
  },
  panel: {
    marginTop: 20,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  optionInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    flex: 1,
    marginRight: 10,
  },
  addButton: {
    borderWidth: 1,
    borderColor: appColors.primary,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: 'transparent',
  },
  addButtonText: {
    color: appColors.primary,
  },
});

 
