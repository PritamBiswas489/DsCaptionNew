import React, {FC, ReactElement, useRef, useState} from 'react';
import {FlatList, Text, TouchableOpacity, Modal, View} from 'react-native';
import {Dropdown} from '@utils/icons';
import {styles} from './styles';
import {Props, DropdownItem} from './types';
import appColors from '@theme/appColors';
import {useValues} from '../../../App';

export const DropdownWithIcon: FC<Props> = ({
  label,
  data,
  onSelect,
  icon,
  dropdownStyle,
  overlayStyle,
  iconStyle,
  dropdownOptionStyle,
}) => {
  const DropdownButton = useRef<TouchableOpacity>(null);
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState<DropdownItem | undefined>(undefined);
  const [dropdownTop, setDropdownTop] = useState(0);
  const {isDark,t} = useValues();

  setTimeout(() => {
    DropdownButton.current != null && openDropdown();
  }, 100);

  const openDropdown = (): void => {
    DropdownButton.current?.measure((_fx, _fy, _w, h, _px, py) => {
      setDropdownTop(py + h);
    });
  };

  const onItemPress = (item: DropdownItem): void => {
    setSelected(item);
    onSelect(item);
    setVisible(false);
  };

  const renderItem = ({item}: {item: DropdownItem}): ReactElement<any, any> => (
    <TouchableOpacity
      activeOpacity={1}
      style={styles.item}
      onPress={() => onItemPress(item)}>
      <Text style={styles.label}>{t(item.label)}</Text>
    </TouchableOpacity>
  );

  const renderDropdown = (): ReactElement<any, any> | null => {
    return (
      <Modal visible={visible} transparent animationType="none">
        <TouchableOpacity
          activeOpacity={0.9}
          style={[styles.overlay, overlayStyle]}
          onPress={() => setVisible(false)}>
          <View
            style={[
              styles.dropdown,
              {top: dropdownTop},
              dropdownOptionStyle,
              {backgroundColor: isDark ? appColors.black : appColors.white},
            ]}>
            <FlatList
              data={data}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
              ItemSeparatorComponent={() => (
                <View
                  style={[
                    styles.separator,
                    {
                      borderColor: isDark
                        ? appColors.darkBorder
                        : appColors.border,
                    },
                  ]}
                />
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    );
  };

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      ref={DropdownButton}
      style={[
        styles.button,

        {backgroundColor: isDark ? appColors.darkTheme : appColors.boxBg},
        dropdownStyle,
      ]}
      onPress={() => setVisible(true)}>
      {renderDropdown()}
      <View style={styles.iconContainer}>{icon}</View>
      <Text style={styles.buttonText}>
        {(selected && t(selected.label)) || t(label)}
      </Text>
      <View style={iconStyle}>
        <Dropdown color={appColors.lightText} />
      </View>
    </TouchableOpacity>
  );
};
