import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';

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
      {renderLabel()}
      <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: 'black' }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? label : '...'}
        searchPlaceholder="Search..."
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        
        onChange={(item: DataItem) => {
          setValue(item.value);
          setIsFocus(false);
        }}
         itemTextStyle={{color:'black'}}
        renderLeftIcon={() => (
          <AntDesign
            style={styles.icon}
            color={'black'}
            name="Safety"
            size={20}
          />
        )}
      />
    </View>
  );
};

 

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
