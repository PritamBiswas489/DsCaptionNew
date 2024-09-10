import { ScrollView } from 'react-native-virtualized-view';
import React, { useEffect, useState } from 'react';
import Header from '@commonComponents/header';
import { GlobalStyle } from '@style/styles';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from 'src/navigation/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { windowHeight, windowWidth } from '@theme/appConstant';
import appColors from '@theme/appColors';
import { useValues } from '../../../../../../App';
import { Alert, RefreshControl, StyleSheet, View } from 'react-native';
import { CountStatistics } from './countStatistics';
import ServiceBarCartAccountInformation from './barChart';
import ServiceCount from './serviceCount';
import { BookingReportList } from './historySection';
import YearAmountChart from './barChart';
type navigationProp = NativeStackNavigationProp<RootStackParamList>;
import BookingReportFilter from './bookingFilter';
import {   BookingFilterIcon } from '@utils/icons';
import CommonModal from '@src/commonComponents/commonModal';

interface Response {
  data: any;
  status: number;
  statusText: string;
  headers: any;
  config: any;
  request?: any;
}

// Booking Reports Page Panel
export function BookingReports() {
  const { navigate } = useNavigation<navigationProp>();
  const { isDark, t } = useValues();
  const [showSkeletonLoader, setSkeletonLoader] = useState(false)
  const [refreshing, setRefreshing] = React.useState(false);
  const [showModal, setShowModal] = useState<boolean>(false);

  const filterModalVisible = () => {
    setShowModal(true);
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  return (
    <>
    <ScrollView
      style={[
        GlobalStyle.mainView,
        { backgroundColor: isDark ? appColors.darkTheme : appColors.white, },
      ]}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      showsVerticalScrollIndicator={false}>
      <Header
        showBackArrow={true}
        trailIcon={
          <BookingFilterIcon
            color={isDark ? appColors.white : appColors.darkText}
          />
        }
        gotoScreen={() => setShowModal(true)}
        title={'newDeveloper.BookingReport'}
      />
      <CountStatistics />
      <View
        style={[
          styles.chartContainer,
          {
            backgroundColor: isDark ? appColors.darkTheme : appColors.white,
            borderColor: isDark ? appColors.darkBorder : appColors.border,
          },
        ]}>
        <YearAmountChart />
      </View>
      <BookingReportList />
    </ScrollView>
    {showModal && (
        <CommonModal
          modal={
            <BookingReportFilter
              setSearchModal={()=>{}}
              setShowModal={setShowModal}
              selectedCategory={[]}
              setSelectedCategory={()=>{}}
              setDatePicker={()=>{}}
              setIsStartDate={()=>{}}
              startDate={''}
              endDate={''}
            />
          }
          showModal={showModal}
          visibleModal={filterModalVisible}
        />
      )}
    </>
    
  );
}
export const styles = StyleSheet.create({
  chartContainer: {
    marginTop: 20,
    borderColor: appColors.border,
    borderWidth: 1,
    borderRadius: windowWidth(2),
    backgroundColor: appColors.white,
    width: windowWidth(95),
    marginHorizontal: windowWidth(2),
    marginVertical: 20,
    paddingTop:20
  },
  rowStyle: {
    marginHorizontal: windowWidth(3),
  },
})
