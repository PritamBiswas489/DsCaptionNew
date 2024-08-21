import { TouchableOpacity, View,Alert } from 'react-native';
import React, { useState } from 'react';
import { styles } from './styles';
import TextInputComponent from '@otherComponent/auth/textInput';
import {
  ServiceName,
  HomeIcon,
  SubCategory,
  Notes,
  Location,
  Experience,
  ServiceMen,
  Amount,
  Discount,
  ReceiptDiscount,
  
} from '@utils/icons';
import { windowHeight, windowWidth } from '@theme/appConstant';
import { categoryData, locationData } from '../data/data';
import CommissionSection from './commissionSection';
import { serviceTimeData } from '../data/data';
import RadioButton from '@otherComponent/radioButton';
import { taxData } from '../data/data';
import { DropdownWithIcon } from '@commonComponents/dropdownWithIcon';
import { dropDownType } from './types';
import { GlobalStyle } from '@style/styles';
import { useValues } from '../../../../../App';
import { searchStatusArray } from '@src/config/utility';
import { DropdownItem } from '@src/commonComponents/dropdownWithIcon/types';
import CommonModal from '@commonComponents/commonModal';
import { CalenderModal } from '@otherComponent/calenderModal';
import { Text } from 'react-native';

export default function InputView() {
  const [category, setCategory] = useState<dropDownType | undefined>();
  const statusArr = searchStatusArray()
  const statusList: DropdownItem[] = statusArr.map((statusdet: any, statusindex: number) => {
    if (statusdet.value !== 'pending' && statusdet.value !== 'all') {
      return { label: statusdet.label, value: statusdet.value };
    }
    return undefined;
  })
    .filter((item): item is DropdownItem => item !== undefined);

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isStartDate, setIsStartDate] = useState(true);
  const [showDatePicker, setDatePicker] = useState<boolean>(false);
  const [showModal, setShowDatepickerModal] = useState<boolean>(false);
  const [showServiceMenModal, setServiceMenModal] = useState<boolean>(true);
  const { t } = useValues();
  return (
    <View style={{ flex: 1 }}>

      <DropdownWithIcon
        label="addNewService.selectCategory"
        data={statusList}
        onSelect={setCategory}
        error={''}
        selectedValue={{ label: '', value: '' }}
      />
      <TouchableOpacity onPress={()=>{ setDatePicker(true) }}>
      <TextInputComponent
        placeholder={t('Change schedule date')}
        value={''}
        editable={false}
        onChangeText={value => {
        }}
      />
      </TouchableOpacity>
      <CommonModal
        modal={
          <CalenderModal
            setDatePicker={setDatePicker}
            setShowModal={setShowDatepickerModal}
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
            isStartDate={isStartDate}
          />
        }
        showModal={showDatePicker}
        visibleModal={() => setDatePicker(true)}
      />

{/* <CommonModal
        modal={
          
        }
        showModal={showServiceMenModal}
        visibleModal={() => {} }
      /> */}

      <View style={styles.row}>
      </View>
    </View>
  );
}
