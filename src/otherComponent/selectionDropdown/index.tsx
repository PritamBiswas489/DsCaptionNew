import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/MaterialIcons';
interface DataItem {
  label: string;
  value: string;
}
 

interface dropdownComponentInterface {
    data:DataItem[];
    value:string;
    setValue:(value:string)=>void;
    label:string;
}

export default function SelectionDropdown ({data,value,setValue,label}:dropdownComponentInterface)  {
//   const [value, setValue] = useState<string | null>(null);
  const [isFocus, setIsFocus] = useState<boolean>(false);
  
  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text style={[styles.label, isFocus && { color: 'black' }]}>
          {label}
        </Text>
      );
    }
    return null;
  };

  return (
    <View style={styles.container}>
      <RNPickerSelect
        onValueChange={(value) => setValue(value)}
        items={data}
        style={pickerSelectStyles}
        useNativeAndroidPickerStyle={false}
        placeholder={{label}}
        value={value}
        Icon={() => {
          return <Icon  style={{marginTop:10,fontSize:30}} name="arrow-drop-down" size={24} color="gray" />;
        }}
      />
    </View>
  );
};

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    color: 'gray',
    backgroundColor: '#f0f1f2',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    color: 'gray',
    backgroundColor: '#f0f1f2',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  placeholder: {
    color: 'gray',
  },
}); 

const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
      padding: 16,
    },
    dropdown: {
      height: 50,
      borderColor: 'gray',
      borderWidth: 0.5,
      borderRadius: 8,
      paddingHorizontal: 8,
      backgroundColor:'#f0f1f2'
    },
    icon: {
      marginRight: 5,
    },
    label: {
      position: 'absolute',
      backgroundColor: 'white',
      left: 22,
      top: 8,
      zIndex: 999,
      paddingHorizontal: 8,
      fontSize: 14,
      tintColor: 'black',
    },
    placeholderStyle: {
      fontSize: 16,
      color: 'black',
    },
    selectedTextStyle: {
      fontSize: 16,
      color: 'black',
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
      color: 'black',
    },
    item: {
        paddingVertical: 10,
        paddingHorizontal: 20,
      },
     
  });
