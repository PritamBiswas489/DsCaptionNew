import {View} from 'react-native';
import React, {useState, useEffect} from 'react';
import {GlobalStyle} from '@style/styles';
import Header from '@commonComponents/header';
import {GridIcon, Listviewicon, Search} from '@utils/icons';
import ItemsList from './itemsList';
import {useValues} from '../../../../../App';
import appColors from '@theme/appColors';
import {styles} from './styles';
 
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@src/store';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from 'src/navigation/types';
 import { authAuthorizeRedirect } from '@src/utils/functions';
 import { getVendorSubCategories } from '@src/services/store/category.service';
 import { vendorSubCategoriesActions } from '@src/store/redux/store/subcategories-redux';

interface Response {
  data: any;
  status: number;
  statusText: string;
  headers: any;
  config: any;
  request?: any;
}
type ItemsProps = NativeStackNavigationProp<RootStackParamList>;

export function SubCategories({ route }: any) {
  const [isGrid, setIsGrid] = useState(false);
  const {isDark} = useValues();
  const [showSearchBar, setSearchBar] = useState<boolean>();
  const navigation = useNavigation<ItemsProps>();
  const dispatch = useDispatch()
  const {
    isFirstTimeLoading: selectedFirstTimeLoading,
  } = useSelector(
    (state: RootState) => state['vendorSubCategories']
  );

  const categoryId = route?.params?.id;
  const serviceTitle = route?.params?.categoryname

  const loadCategories = async () =>{
    const response: Response = await getVendorSubCategories(categoryId);
    if (response?.data?.errors) {
      await authAuthorizeRedirect(response,navigation)
    }
    dispatch(vendorSubCategoriesActions.setData({field:'data',data:response?.data}))
    dispatch(vendorSubCategoriesActions.setData({field:'isFirstTimeLoading',data:false}))
  }

  useEffect(()=>{
       loadCategories()
  },[categoryId])

  return (
    <View
      style={[
        GlobalStyle.mainView,
        {backgroundColor: isDark ? appColors.darkTheme : appColors.white},
      ]}>
      <Header
        showBackArrow={true}
        title={serviceTitle}
        searchContainerStyle={styles.searchContainer}
      />
      <ItemsList isGrid={isGrid} />
    </View>
  );
}
