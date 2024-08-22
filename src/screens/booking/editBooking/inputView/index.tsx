import { TouchableOpacity, View, Alert } from 'react-native';
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
  Plus

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
import { FormServiceMenList } from '@src/commonComponents/formServiceManList';
import { FormAddServicePanel } from '@src/commonComponents/formAddServicePanel';
import CartItemPanel from '@src/commonComponents/cartPanel';

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
  const [showServiceMenModal, setServiceMenModal] = useState<boolean>(false);
  const [showAddServiceModal, setShowAddServiceModal] = useState<boolean>(false);
   
  const { t } = useValues();
  return (
    <View style={{ flex: 1 }}>

      <DropdownWithIcon
        label="newDeveloper.changestatus"
        data={statusList}
        onSelect={setCategory}
        error={''}
        selectedValue={{ label: '', value: '' }}
      />
      <TouchableOpacity onPress={() => { setDatePicker(true) }}>
        <TextInputComponent
          placeholder={t('newDeveloper.changescheduledate')}
          value={''}
          editable={false}
          onChangeText={value => {
          }}
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => { setServiceMenModal(true) }}>
        <TextInputComponent
          placeholder={t('newDeveloper.addServiceMen')}
          value={''}
          editable={false}
          onChangeText={value => {
          }}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.addButton} onPress={() => setShowAddServiceModal(true) }>
        <Plus width={16} height={16} />   
        <Text style={styles.addButtonText}>Add Service</Text>
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

      <CommonModal
        modal={
          <FormServiceMenList setServiceMenModal={setServiceMenModal} />
        }
        showModal={showServiceMenModal}
        visibleModal={() => { }}
      />
       <CommonModal
        modal={
          <FormAddServicePanel setShowAddServiceModal={setShowAddServiceModal} />
        }
        showModal={showAddServiceModal}
        visibleModal={() => { }}
      />
      <CartItemPanel 
        imageUrl="https://unified.dorkarservice.com/storage/app/public/service/2023-12-24-6587de0544217.png" 
        serviceName="demo demo demo demo" 
        variantName="demo demo demo demo demo" 
        price="90.00"
        quantity={1}
        onIncrease={()=>{}}
        onDecrease={()=>{}}
        />
    </View>
  );
}
