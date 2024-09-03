import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, FlatList, TouchableOpacity, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import appColors from '@src/theme/appColors';
import appFonts from '@src/theme/appFonts';
import { fontSizes } from '@src/theme/appConstant';
import {useValues} from '../../../App';
import { windowHeight } from '@src/theme/appConstant';

interface DataItem {
  label: string;
  value: string;
}

interface dropdownComponentInterface {
  data: DataItem[];
  value: string;
  setValue: (value: string) => void;
  label: string;
  error: string;
}

export default function SelectionDropdown({ data, value, setValue, label, error }: dropdownComponentInterface) {
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredData, setFilteredData] = useState<DataItem[]>(data);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  useEffect(()=>{
    setFilteredData(data)
  },[data])

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query) {
      const filtered = data.filter((item) =>
        item.label.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(data);
    }
  };

  const handleSelect = (item: DataItem) => {
    setValue(item.value);
    setSearchQuery('');
    setIsModalVisible(false);
    setFilteredData(data);
  };
  const {isDark} = useValues()

  return (
    <View style={[styles.container,{backgroundColor:isDark ? appColors.darkCardBg : appColors.white  }]}>
      {/* {label && (
        <Text style={[styles.label,  { color: 'black' }]}>
          {label}
        </Text>
      )} */}

      <TouchableOpacity onPress={() => setIsModalVisible(true)}>
        <View style={[pickerSelectStyles.inputContainer,{backgroundColor:isDark ? appColors.darkTheme : appColors.textInput  }]}>
          <Text style={value ? [styles.selectedTextStyle,{color: isDark ? appColors.white : appColors.darkText,}] : [styles.placeholderStyle,{color: isDark ? appColors.white : appColors.darkText,}]}>
            {value ? label+ ':   '+ data.find(item => item.value === value)?.label ?? '' : label}
          </Text>
          <Icon name="arrow-drop-down" size={24} color="gray" />
        </View>
      </TouchableOpacity>

      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={[styles.modalContainer,{backgroundColor:isDark ? appColors.darkCardBg : appColors.white  }]}>
          <View style={[styles.modalContent,,{backgroundColor:isDark ? appColors.darkCardBg : appColors.white  }]}>
            <TextInput
              style={[styles.inputSearchStyle,{color: isDark ? appColors.white : appColors.darkText,}]}
              placeholder="Search..."
              value={searchQuery}
              onChangeText={handleSearch}
            />
            <FlatList
              data={filteredData}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.item}
                  onPress={() => handleSelect(item)}
                >
                  <Text style={{color: isDark ? appColors.white : appColors.darkText,}}>{item.label}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>

      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

const pickerSelectStyles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: windowHeight(1),
     
  },
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 16,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: -8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
    color: 'gray',
  },
  placeholderStyle: {
    fontSize: 16,
    color: 'gray',
  },
  selectedTextStyle: {
    fontSize: 16,
    color: 'black',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    margin: 20,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 8,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 10,
    paddingHorizontal: 10,
    color: 'black',
  },
  item: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  error: {
    color: appColors.error,
    fontFamily: appFonts.NunitoSemiBold,
    fontSize: fontSizes.FONT4,
    marginTop: 0.7,
  },
});
