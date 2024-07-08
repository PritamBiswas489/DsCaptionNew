import {View, FlatList, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {styles} from './styles';
import ItemView from './itemView';
import LocationView from './locationView';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from 'src/navigation/types';
import {BookingListTypes} from '@screens/booking/data/types';
import {MoreArrow, UpArrow} from '@utils/icons';
import {DashLine} from '@commonComponents/dashLIne';
import {
  NoteContainer,
  CustomerItems,
  ServiceManItems,
  ServiceItems,
} from '@otherComponent/index';
import {useValues} from '../../../../../App';
import appColors from '@theme/appColors';

type routeProps = NativeStackNavigationProp<RootStackParamList>;

export default function BookingList({
  data,
  containerStyle,
  setCancelBookingModal,
  setAcceptBookingModal,
}: BookingListTypes) {
  const {navigate} = useNavigation<routeProps>();
  const [showMoreServiceMans, setShowMoreServiceMans] =
    useState<boolean>(false);

  const icon = showMoreServiceMans ? <UpArrow /> : <MoreArrow />;

  const {isDark} = useValues();

  const toggleShowMoreServiceMans = () => {
    setShowMoreServiceMans(!showMoreServiceMans);
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <FlatList
        data={data}
        renderItem={({item}) => (
          <View>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => navigate(item.gotoScreen, {bookingData: item})}
              style={[
                styles.cardContainer,
                {
                  backgroundColor: isDark
                    ? appColors.darkTheme
                    : appColors.white,
                  borderColor: isDark ? appColors.darkBorder : appColors.border,
                },
              ]}>
              <View style={styles.serviceContainer}>
                <ServiceItems
                  imageStyle={styles.imageStyle}
                  item={item}
                  priceStyle={{
                    ...styles.priceStyle,
                    color: isDark ? appColors.primary : appColors.darkText,
                  }}
                  textStyle={styles.textStyle}
                />
                <ItemView item={item} />
                {item.location && (
                  <>
                    <LocationView item={item} />
                    <View
                      style={[
                        styles.lineView,
                        {
                          borderColor: isDark
                            ? appColors.darkBorder
                            : appColors.border,
                        },
                      ]}
                    />
                  </>
                )}
                <View style={styles.innerContainer}>
                  {item.customers &&
                    item.customers.map(customer => (
                      <CustomerItems item={customer} />
                    ))}

                  {item.serviceMans &&
                    item.serviceMans.map((serviceMan, index) => (
                      <>
                        <DashLine />
                        <ServiceManItems
                          index={index}
                          item={serviceMan}
                          length={item.serviceMans?.length}
                          showMore={showMoreServiceMans}
                        />
                      </>
                    ))}
                </View>
                {item.isAssigned === true && (
                  <NoteContainer
                    setAcceptBookingModal={setAcceptBookingModal}
                    setCancelBookingModal={setCancelBookingModal}
                    isAssigned={item.isAssigned}
                  />
                )}
                {item.isAssigned === false && (
                  <NoteContainer isAssigned={item.isAssigned} />
                )}
              </View>
            </TouchableOpacity>
            {item.serviceMans && item.serviceMans.length > 1 && (
              <View style={styles.center}>
                <TouchableOpacity
                  onPress={toggleShowMoreServiceMans}
                  activeOpacity={0.9}
                  style={[
                    styles.iconView,
                    {
                      backgroundColor: isDark
                        ? appColors.darkTheme
                        : appColors.white,
                      borderWidth: isDark ? 0.4 : 1,
                    },
                  ]}>
                  {icon}
                </TouchableOpacity>
              </View>
            )}
          </View>
        )}
        ItemSeparatorComponent={() => <View style={styles.separator}></View>}
      />
    </View>
  );
}
