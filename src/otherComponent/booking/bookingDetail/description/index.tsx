import {View} from 'react-native';
import React from 'react';
import StatusView from './statusView';
import {windowWidth} from '@theme/appConstant';
import {styles} from './styles';
import {GlobalStyle} from '@style/styles';
import BillSummary from '../billSummary';
import {ServiceContent} from '@otherComponent/home';
import {descriptionType} from './data/types';
import ChargesDetail from '@otherComponent/booking/chargesDetail';
import {ReviewsSection} from './reviewsSection';
import {ServiceMenDetail} from './serviceMenDetail';
import {CustomerDetail} from './customerDetail';
import {ProviderDetail} from './providerDetail';
import {PaymentSummary} from './paymentSummary';
import ServiceProofDetails from '../serviceProofDetails';
import {useValues} from '../../../../../App';
import appColors from '@theme/appColors';

export function Description({
  item,
  setBookingStatus,
  bookingStatus,
  contactOptions,
  extraCharges,
  showChargesDetail,
  serviceProof,
}: descriptionType) {
  const {isDark, isServiceManLogin} = useValues();

  return (
    <View>
      <View style={styles.container}>
        <StatusView setBookingStatus={setBookingStatus} />
        <ServiceContent bookingStatus={bookingStatus} />
        <View
          style={[
            GlobalStyle.horizontalLine,
            {
              marginTop: 0,
              bottom: windowWidth(2),
              borderColor: isDark ? appColors.darkBorder : appColors.border,
            },
          ]}
        />
        {!isServiceManLogin && bookingStatus === 'completedBooking' && (
          <ProviderDetail />
        )}

        {item?.customers || extraCharges ? (
          <CustomerDetail item={item} contactOptions={contactOptions} />
        ) : null}

        {!isServiceManLogin &&
          (item?.serviceMans || extraCharges ? (
            <ServiceMenDetail item={item} contactOptions={contactOptions} />
          ) : null)}
      </View>
      <BillSummary extraCharges={extraCharges} />
      {extraCharges && showChargesDetail && (
        <ChargesDetail extraCharges={extraCharges} />
      )}
      {bookingStatus === 'completedBooking' && <PaymentSummary />}
      {serviceProof && <ServiceProofDetails serviceProof={serviceProof} />}
      <ReviewsSection />
    </View>
  );
}
