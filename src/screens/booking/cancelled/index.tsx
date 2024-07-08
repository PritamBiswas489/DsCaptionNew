import {View, ScrollView} from 'react-native';
import React, {useState} from 'react';
import {GlobalStyle} from '@style/styles';
import {BookingDetail, BookingStatus, Description} from '@otherComponent/index';
import {styles} from './styles';
import CommonModal from '@commonComponents/commonModal';
import {StatusView} from '../pendingApproval/statusView';
import {useValues} from '../../../../App';
import appColors from '@theme/appColors';

export function CancelledBooking({route}: any) {
  const [bookStatusModal, setBookStatusModal] = useState(false);
  const {isDark} = useValues();
  return (
    <>
      <ScrollView
        contentContainerStyle={styles.contentContainerStyle}
        style={[
          GlobalStyle.mainView,
          {backgroundColor: isDark ? appColors.darkTheme : appColors.white},
        ]}
        showsVerticalScrollIndicator={false}>
        <BookingDetail title="booking.cancelledBooking" />
        <View
          style={[
            styles.mainContainer,
            {
              backgroundColor: isDark ? appColors.darkCardBg : appColors.boxBg,
              borderBottomColor: isDark
                ? appColors.darkBorder
                : appColors.border,
              borderBottomWidth: isDark ? 0.1 : 1,
            },
          ]}>
          <View
            style={[
              styles.innerContainer,
              {borderColor: isDark ? appColors.darkBorder : appColors.border},
            ]}>
            <Description
              contactOptions={true}
              setBookingStatus={setBookStatusModal}
              item={route?.params?.bookingData}
            />
          </View>
        </View>
        <CommonModal
          modal={<BookingStatus setShowModal={setBookStatusModal} />}
          showModal={bookStatusModal}
          visibleModal={() => setBookStatusModal(true)}
        />
      </ScrollView>
      <StatusView status={'booking.reason'} statusNote="booking.canceledNote" />
    </>
  );
}
