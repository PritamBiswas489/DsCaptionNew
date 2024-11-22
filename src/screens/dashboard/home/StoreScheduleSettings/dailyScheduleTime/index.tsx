import appColors from '@src/theme/appColors';
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert
} from 'react-native';
import {  IconButton } from 'react-native-paper';
import ScheduleModal from './ScheduleModal';
import { useValues } from '../../../../../../App';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@src/store';
import { Schedule as ScheduleInterface } from '@src/interfaces/store/store.profile.interface';
import { compareTimes } from '@src/config/utility';
import { isTimeRangeWithin } from '@src/config/utility';
type FieldsState = {
  [day: string]: {openingTime:string,closingTime:string,scheduleId:number}[];
};

//Daily schedule time
const DailyScheduleTime: React.FC = () => {
  const {stores} = useSelector((state: RootState)=>state['storeProfileData'])
  const {schedules} = stores[0]
  //days of week
  const daysOfWeek: string[] = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDay,setSelectedDay] =  useState('')

  const {t} = useValues()

  const handleAddSchedule = (openTime: string, closeTime: string) => {
        
        const resCompareTime = compareTimes(openTime,closeTime) 
         
        if(resCompareTime <=0){ //checking selected
           Alert.alert(t('newDeveloper.invalidTimeRangeSelected'))
           return
        }else{
            //selected range fall into other range 
            const selectedrange = `${openTime}-${closeTime}`
            const ranges = fields[selectedDay].map((d:{openingTime:string,closingTime:string,scheduleId:number})=>`${d.openingTime.slice(0,-3)}-${d.closingTime.slice(0,-3)}`);  
            if(isTimeRangeWithin(selectedrange,ranges)){
              Alert.alert(t('newDeveloper.overlappedError'))
              return 
            }
        }
        Alert.alert('Let start saving process')
        const insertOpenTime = `${openTime}:00`
        const insertCloseTime = `${closeTime}:00`

        console.log(insertOpenTime,insertCloseTime)

 
      // request send here before add to list and then will add to list

       
     
    //  addField(selectedDay,`${openTime} - ${closeTime}`)
  };

  const [fields, setFields] = useState<FieldsState>(
    daysOfWeek.reduce((acc, day) => ({ ...acc, [day]: [] }), {})
  );

  const addField = (day: string,openingTime:string,closingTime:string,scheduleId:number): void => {
    setFields((prev) => ({
      ...prev,
      [day]: [...prev[day], {openingTime,closingTime,scheduleId}],
    }));
  };

  const removeField = (day: string, index: number): void => {
    // const updatedFields = fields[day].filter((_, i) => i !== index);
    // setFields((prev) => ({
    //   ...prev,
    //   [day]: updatedFields,
    // }));

      Alert.alert('Remove')
  };

   //handle add schedule time
  const handleAddScheduleTime = (selectedDay:string)=>{
      setSelectedDay(selectedDay)
      setModalVisible(true)
      
  }

  useEffect(()=>{
      if(schedules.length > 0){
        schedules.forEach((scDt:ScheduleInterface,scIndex:number)=>{
             const scheduleid = scDt.id
             const openingTime = scDt.opening_time
             const closingTime = scDt.closing_time
             const weekDay = scDt.day
             const checkIndex = fields[daysOfWeek[weekDay]].findIndex(ele=>ele.scheduleId === scheduleid)
             if(checkIndex === -1){
                addField(daysOfWeek[weekDay],openingTime,closingTime,scheduleid)
             } 
            //  console.log({scheduleid,openingTime,closingTime,weekDay:daysOfWeek[weekDay]})
        })
      }
    },[schedules]
  );

  return (
    <>
     <View style={styles.container}>
      {daysOfWeek.map((day) => (
        <View key={day} style={styles.dayContainer}>
          <Text style={styles.dayTitle}>{t(`newDeveloper.${day}`)}</Text>
          {fields[day].map((field, index) => (
            <View key={index} style={styles.fieldRow}>
              <TextInput
                style={styles.textInput}
                placeholder={`Select ${day}`}
                placeholderTextColor={'black'}
                value={`${field.openingTime.slice(0,-3)} - ${field.closingTime.slice(0,-3)}`}
                editable={false}
              />
              <IconButton
                            icon="close"
                            size={20}
                            iconColor="red"
                            onPress={() => removeField(day, index)}
               />
            </View>
          ))}
          <TouchableOpacity style={styles.addButton} onPress={() => handleAddScheduleTime(day)}>
            <Text style={styles.addText}>+ {t('newDeveloper.Add')}</Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
    <ScheduleModal
        visible={modalVisible} 
        onClose={() => setModalVisible(false)}
        onAdd={handleAddSchedule}
        day={selectedDay}
      />
    </>
   
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  dayContainer: {
    marginBottom: 20,
    backgroundColor: '#f9f9f9',
    padding: 10,
    borderRadius: 8,
    elevation: 2,
  },
  dayTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  fieldRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  textInput: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 10,
    backgroundColor: '#fff',
    color:appColors.primary
  },
  deleteButton: {
    backgroundColor: '#ff6b6b',
    borderRadius: 5,
    padding: 8,
  },
  deleteText: {
    color: '#fff',
    fontSize: 14,
  },
  addButton: {
    marginTop: 10,
    backgroundColor: appColors.primary,
    borderRadius: 5,
    paddingVertical: 10,
    alignItems: 'center',
  },
  addText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default DailyScheduleTime;
