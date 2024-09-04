import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native-virtualized-view';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Header from '@src/commonComponents/header';
import appColors from '@src/theme/appColors';
import { useValues } from '../../../../../../App';
import GradientBtn from '@commonComponents/gradientBtn';
import { BookingSettings } from './bookingSettings';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@src/store';

// Business booking settings function
const BusinessBookingSettings = () => {
    const { isDark, t } = useValues()
    const [servicemanCanEditBooking, setServicemanCanEditBooking] = useState(false)
    const [servicemanCanCancelBooking, setServicemanCancelBooking] = useState(false)
    const businessSetting = useSelector((state: RootState) => state['businessSetting'])


    useEffect(() => {
        const checkOne = businessSetting.data.find(ele => ele.key_name === 'provider_serviceman_can_edit_booking')
        const checktwo = businessSetting.data.find(ele => ele.key_name === 'provider_serviceman_can_cancel_booking')

        if (checkOne?.mode === 'live') {
            setServicemanCanEditBooking(checkOne?.live_values && parseInt(checkOne?.live_values) === 1 ? true : false)
        } else {
            setServicemanCanEditBooking(checkOne?.test_values && parseInt(checkOne?.test_values) === 1 ? true : false)
        }

        if (checktwo?.mode === 'test') {
            setServicemanCancelBooking(checktwo?.live_values && parseInt(checktwo?.live_values) === 1 ? true : false)
        } else {
            setServicemanCancelBooking(checktwo?.test_values && parseInt(checktwo?.test_values) === 1 ? true : false)
        }



    }, [businessSetting])

    return (
        <>
            <ScrollView contentContainerStyle={styles.contentContainer}>
                <BookingSettings
                    servicemanCanEditBooking={servicemanCanEditBooking}
                    setServicemanCanEditBooking={setServicemanCanEditBooking}
                    servicemanCanCancelBooking={servicemanCanCancelBooking}
                    setServicemanCancelBooking={setServicemanCancelBooking}
                />
            </ScrollView>
            <GradientBtn label="newDeveloper.updateSettings" onPress={() => Alert.alert('Update settings')} />
        </>
    );
};

const styles = StyleSheet.create({

    contentText: {
        fontSize: 18,
        color: '#333',
        marginBottom: 10,
    },
    contentContainer: {
        padding: 20,
    },
});
export default BusinessBookingSettings;
