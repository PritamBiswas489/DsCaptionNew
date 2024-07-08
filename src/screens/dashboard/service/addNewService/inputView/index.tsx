import {View} from 'react-native';
import React, {useState} from 'react';
import {styles} from './styles';
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
import {windowHeight, windowWidth} from '@theme/appConstant';
import {categoryData, locationData} from '../data/data';
import CommissionSection from './commissionSection';
import {serviceTimeData} from '../data/data';
import RadioButton from '@otherComponent/radioButton';
import {taxData} from '../data/data';
import {DropdownWithIcon} from '@commonComponents/dropdownWithIcon';
import {dropDownType} from './types';
import {GlobalStyle} from '@style/styles';
import {useValues} from '../../../../../../App';
export default function InputView() {
  const [serviceName, setServiceName] = useState('');
  const [category, setCategory] = useState<dropDownType | undefined>();
  const [subCategory, setSubCategory] = useState<dropDownType | undefined>();
  const [description, setDescription] = useState('');
  const [experience, setExperience] = useState('');
  const [serviceTime, setServiceTime] = useState<dropDownType | undefined>();
  const [amount, setAmount] = useState('');
  const [discount, setDiscount] = useState('');
  const [tax, setTax] = useState<dropDownType | undefined>();
  const [featuredPoints, setFeaturePoints] = useState('');
  const [key, setKey] = useState(0);
  const [serviceMen, setServiceMen] = useState('');
  const [location, setLocation] = useState<dropDownType | undefined>();
  const {t} = useValues();
  return (
    <View style={{flex: 1}}>
      <TextInputComponent
        placeholder={t('auth.companyName')}
        Icon={<ServiceName />}
        value={serviceName}
        onChangeText={value => {
          setServiceName(value);
        }}
      />
      <DropdownWithIcon
        icon={<HomeIcon height={'18'} width={'18'} />}
        label="addNewService.selectCategory"
        data={categoryData}
        onSelect={setCategory}
      />

      <DropdownWithIcon
        icon={<SubCategory />}
        label="addNewService.subCategory"
        data={categoryData}
        onSelect={setSubCategory}
      />
      <CommissionSection />
      <TextInputComponent
        placeholder={t('addNewService.description')}
        Icon={<Notes />}
        value={description}
        onChangeText={value => {
          setDescription(value);
        }}
        containerStyle={{marginBottom: windowHeight(0)}}
        multiline={true}
        inputStyle={styles.inputStyle}
      />

      <View style={styles.row}>
        <TextInputComponent
          inputStyle={styles.containerView}
          placeholder={t('addNewService.serviceTime')}
          Icon={<Experience />}
          value={experience}
          onChangeText={value => {
            setExperience(value);
          }}
          textContainerStyle={styles.textContainerStyle}
          containerStyle={{marginTop: windowWidth(2)}}
        />

        <DropdownWithIcon
          icon={<Location />}
          data={serviceTimeData}
          label={'addNewService.hour'}
          onSelect={setServiceTime}
          dropdownStyle={[GlobalStyle.dropdown, {paddingLeft: windowWidth(3)}]}
          overlayStyle={GlobalStyle.overlayStyle}
          iconStyle={GlobalStyle.iconStyle}
          dropdownOptionStyle={GlobalStyle.dropdownOptionStyle}
        />
      </View>
      <DropdownWithIcon
        icon={<Location />}
        label="addNewService.availableLocation"
        data={locationData}
        onSelect={setLocation}
      />
      <TextInputComponent
        placeholder={t('addNewService.numberServicemen')}
        Icon={<ServiceMen />}
        value={serviceMen}
        onChangeText={value => {
          setServiceMen(value);
        }}
      />
      <View style={styles.container}>
        <RadioButton
          title={'addNewService.onlyPrice'}
          setKey={setKey}
          selectCategory={0}
          currentKey={key}
        />
        <RadioButton
          title={'addNewService.priceDiscount'}
          setKey={setKey}
          selectCategory={1}
          currentKey={key}
        />
      </View>
      <View style={styles.row}>
        <TextInputComponent
          inputStyle={styles.inputContainer}
          placeholder={t('addNewService.amount')}
          Icon={<Amount />}
          value={amount}
          onChangeText={value => {
            setAmount(value);
          }}
          textContainerStyle={styles.textInput}
        />
        {key == 1 && (
          <TextInputComponent
            containerStyle={{marginHorizontal: windowWidth(0)}}
            inputStyle={styles.inputContainer}
            placeholder={t('addNewService.addDiscount')}
            Icon={<Discount />}
            value={discount}
            onChangeText={value => {
              setDiscount(value);
            }}
            textContainerStyle={styles.textInput}
          />
        )}
      </View>
      <DropdownWithIcon
        icon={<ReceiptDiscount />}
        label="addNewService.selectTaxType"
        data={taxData}
        onSelect={setTax}
      />

      <TextInputComponent
        placeholder={t('addNewService.featuredPoints')}
        Icon={<Notes />}
        value={featuredPoints}
        onChangeText={value => {
          setFeaturePoints(value);
        }}
        containerStyle={{
          marginBottom: windowHeight(0),
          marginTop: windowHeight(3),
        }}
        multiline={true}
        inputStyle={styles.inputView}
      />
    </View>
  );
}
