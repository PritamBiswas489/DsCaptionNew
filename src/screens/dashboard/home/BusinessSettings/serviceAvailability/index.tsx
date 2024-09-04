import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native-virtualized-view';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Header from '@src/commonComponents/header';
import appColors from '@src/theme/appColors';
import { useValues } from '../../../../../../App';
import GradientBtn from '@commonComponents/gradientBtn';
import SwitchContainer from '@otherComponent/switchContainer';
import { EnableAvailability } from './enableAvailabilty';
import { AvailabilitySchedules } from './availabilitySchedules';
import { ClosedDayService } from './weekendList';
import TimepickerSelectTime from '@src/commonComponents/timepickerSelectTime';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@src/store';

interface Response {
	data: any;
	status: number;
	statusText: string;
	headers: any;
	config: any;
	request?: any;
}

// Service availability function
const ServiceAvailability = () => {
    const { isDark, t } = useValues()
    const availableSlotdata = useSelector((state: RootState)=>state['availableTimeSlot'])

    const [availability,setAvailability] = useState(availableSlotdata.service_availability===0 ? false :  true)
    const [sunday,setSunday] = useState(availableSlotdata.weekends.includes('sunday') ?  false : true)
    const [monday,setMonday]= useState(availableSlotdata.weekends.includes('monday') ?  false : true)
    const [tuesday,setTuesday] = useState(availableSlotdata.weekends.includes('tuesday') ?  false : true)
    const [wednesday,setWednesday] = useState(availableSlotdata.weekends.includes('wednesday') ?  false : true)
    const [thursday,setThursday] =  useState(availableSlotdata.weekends.includes('thursday') ?  false : true)
    const [friday,setFriday] =  useState(availableSlotdata.weekends.includes('friday') ?  false : true)
    const [saturday,setSaturday] =  useState(availableSlotdata.weekends.includes('saturday') ?  false : true)

    const [fromTimePicker,setFromTimePicker] =  useState(false)
    const [toTimePicker,setToTimePicker] =  useState(false)

    const [fromTime,setFromTime] = useState(availableSlotdata.time_schedule.start_time)
    const [toTime,setToTime] =  useState(availableSlotdata.time_schedule.end_time)
    
      
    return (
        <>
            <ScrollView contentContainerStyle={styles.contentContainer}>
                <View>
                    <EnableAvailability availability={availability} setAvailability={setAvailability}/>
                </View>
                <View>
                    <AvailabilitySchedules fromTime={fromTime} toTime={toTime} setFromTimePicker={setFromTimePicker} setToTimePicker={setToTimePicker}/>
                </View>
                <View style={{marginTop:20}}>
                    <ClosedDayService day={'Sunday'} value={sunday} setValue={setSunday}/>
                    <ClosedDayService day={'Monday'} value={monday} setValue={setMonday}/>
                    <ClosedDayService day={'Tuesday'} value={tuesday} setValue={setTuesday}/>
                    <ClosedDayService day={'Wednesday'} value={wednesday} setValue={setWednesday}/>
                    <ClosedDayService day={'Thursday'} value={thursday} setValue={setThursday}/>
                    <ClosedDayService day={'Friday'} value={friday} setValue={setFriday}/>
                    <ClosedDayService day={'Saturday'} value={saturday} setValue={setSaturday}/>
                </View>
            </ScrollView>
             <GradientBtn label="timeSlots.updateHours" onPress={() => Alert.alert('Update hours process')} />
            { fromTimePicker && <TimepickerSelectTime setDatePicker={setFromTimePicker} setScheduleDate={setFromTime}/> }
            { toTimePicker && <TimepickerSelectTime setDatePicker={setToTimePicker} setScheduleDate={setToTime}/> }
            
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
export default ServiceAvailability;
