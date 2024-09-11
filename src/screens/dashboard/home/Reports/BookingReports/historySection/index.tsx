import { View, FlatList, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import React from 'react';
import { useState, useEffect } from 'react';
import { historyData } from './data';
import { styles } from './styles';
import { GlobalStyle } from '@style/styles';
import { HistoryRow } from './historyRow';
import { Arrow } from '@utils/icons';
import appColors from '@theme/appColors';
import { windowWidth } from '@theme/appConstant';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from 'src/navigation/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useValues } from '../../../../../../../App';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@src/store';
import { datetimeArr } from '@src/config/utility';
import { formatNumberWithAbbreviation } from '@src/config/utility';
import { bookingReportActions } from '@src/store/redux/booking-reports-redux';
import { loadBookingReportsService } from '@src/services/loading.booking.reports.service';
import { CountStatistics } from '../countStatistics';
import YearAmountChart from '../barChart';
import SkeletonLoader from '@src/commonComponents/SkeletonLoader';


export function BookingReportList() {
  const [clickLoadMore, setClickLoadMore] = useState(false)

  const {
    filtered_bookings: filteredBookings,
    limit: limitData,
    offset: offsetData,
    isFirstTimeLoading: firstTimeLoading,
    isNoMoreData: noMoreData
  } = useSelector(
    (state: RootState) => state['bookingReports']
  );
  const { isDark, t } = useValues();
  const dispatch = useDispatch()

  const handleScrollProcessing = () => {
    if (noMoreData) { return }
    setClickLoadMore(true)
    dispatch(bookingReportActions.setData({ field: 'offset', data: offsetData + 1 }))
  }

  const loadDataReports = async () => {
    const formData = new FormData()
    formData.append('limit', limitData) //limit
    formData.append('offset', offsetData) //offset
    await loadBookingReportsService(
      formData,
      dispatch
    )
    setClickLoadMore(false)
  }

  useEffect(() => {
    if (firstTimeLoading || clickLoadMore) {
      loadDataReports()
    }
  }, [
    firstTimeLoading,
    clickLoadMore
  ])

  return (
    <>
      {firstTimeLoading && <SkeletonLoader />}
      {!firstTimeLoading && <>
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
        <View style={{ marginBottom: 40 }}>
          <FlatList
            onEndReached={handleScrollProcessing}
            showsVerticalScrollIndicator={false}
            data={filteredBookings}
            renderItem={({ item, index }) => {
              const {
                day,
                month,
                year,
                hours,
                minutes,
                ampm
              } = datetimeArr(item.created_at)
              return (<View
                style={[
                  styles.container,
                  { borderColor: isDark ? appColors.darkBorder : appColors.border },
                ]}
              >
                <View style={styles.innerContainer}>
                  <Text style={styles.title}>{t('bookingStatus.bookingId')}</Text>
                  <Text style={styles.title}>{t('newDeveloper.CustomerName')}</Text>
                  <Text style={styles.title}>{t('commissionHistory.date')}</Text>
                </View>
                <View style={[styles.innerContainer, { marginTop: windowWidth(2) }]}>
                  <Text style={[styles.title, { color: appColors.primary }]}>
                    {'#' + item.readable_id}
                  </Text>
                  <Text
                    style={[
                      styles.title,
                      { color: isDark ? appColors.white : appColors.darkText },
                    ]}>
                    {`${item.customer?.first_name}`}
                  </Text>
                  <Text
                    style={[
                      styles.title,
                      { color: isDark ? appColors.white : appColors.darkText },
                    ]}>
                    {`${day} ${month}`}  {`${hours}:${minutes} ${ampm}`}
                  </Text>
                </View>
                <View
                  style={[
                    GlobalStyle.horizontalLine,
                    { borderColor: isDark ? appColors.darkBorder : appColors.border },
                  ]}
                />
                <View
                  style={[
                    styles.innerView,
                    {
                      backgroundColor: isDark
                        ? appColors.darkTheme
                        : appColors.boxBg,
                      borderColor: isDark ? appColors.darkBorder : appColors.border,
                    },
                  ]}>
                  <HistoryRow
                    title={t('newDeveloper.BookingAmount')}
                    price={formatNumberWithAbbreviation(item.total_booking_amount)}
                    priceStyle={{
                      // color: isDark ? appColors.lightText : appColors.darkText,
                      color: appColors.success,
                      fontSize: 20
                    }}
                  />
                  <HistoryRow
                    title={t('newDeveloper.ServiceDiscount')}
                    price={formatNumberWithAbbreviation(item.total_campaign_discount_amount)}
                    priceStyle={{ color: appColors.primary }}
                  />
                  <HistoryRow
                    title={t('newDeveloper.CouponDiscount')}
                    price={formatNumberWithAbbreviation(item.total_coupon_discount_amount)}
                    priceStyle={{ color: appColors.primary }}
                  />


                  <HistoryRow
                    title={t('newDeveloper.GSTtax')}
                    price={formatNumberWithAbbreviation(item.total_tax_amount)}
                    priceStyle={{ color: appColors.primary }}
                  />
                </View>

              </View>
              )
            }}
          />
          {clickLoadMore && <ActivityIndicator />}
        </View>
      </>}
    </>
  );
}
